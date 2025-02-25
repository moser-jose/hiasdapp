import Realm from 'realm'
import { createRealmContext } from '@realm/react'
import {
  Hymn,
  Category,
  SubCategory,
  Author,
  Lyrics,
  Chorus,
  Verse,
} from '../models/Hymnal'
import {
  Hymn as HymnType,
  Author as AuthorType,
  Lyrics as LyricsType,
  Category as CategoryType,
  SubCategory as SubCategoryType,
} from '@/types/hymnsTypes'
interface Data {
  hymns: HymnType[]
  categories: CategoryType[]
}
const realmConfig: Realm.Configuration = {
  schema: [
    Hymn.schema,
    Lyrics.schema,
    Author.schema,
    Verse.schema,
    Chorus.schema,
    Category.schema,
    SubCategory.schema,
  ],
  schemaVersion: 2,
}

export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig)

class RealmService {
  private realm: Realm | null = null

  async initialize(): Promise<Realm> {
    if (!this.realm) {
      try {
        this.realm = await Realm.open(realmConfig)
      } catch (error) {
        console.error('Failed to initialize Realm:', error)
        throw error
      }
    }
    return this.realm
  }

  async importalData(data: Data): Promise<void> {
    const realm = await this.initialize()

    try {
      realm.write(() => {
        realm.deleteAll()

        // Create categories first
        data.categories?.forEach((category: CategoryType) => {
          const subCategories =
            category.subCategories?.map((subCategory: SubCategoryType) => ({
              id: subCategory.id,
              name: subCategory.name,
              hymns: subCategory.hymns,
            })) || []

          realm.create('Category', {
            id: category.id,
            name: category.name,
            subCategories,
          })
        })

        // Then create hymns
        data.hymns.forEach((hymn: HymnType) => {
          const categoryObj = realm.objectForPrimaryKey(
            'Category',
            hymn.category?.id
          )

          realm.create('Hymn', {
            id: hymn.id,
            title: hymn.title,
            englishTitle: hymn.englishTitle,
            number: hymn.number,
            numberView: hymn.numberView,
            biblicalText: hymn.biblicalText,
            url: hymn.url,
            urlOld: hymn.urlOld,
            artwork: hymn.artwork,
            artist: hymn.artist,
            authors: hymn.authors,
            lyrics: hymn.lyrics,
            category: categoryObj,
          })
        })
      })
    } catch (error) {
      console.error('Error importing hymnal data:', error)
      throw error
    }
  }

  async getAllHymns(): Promise<HymnType[]> {
    const realm = await this.initialize()
    return Array.from(realm.objects<HymnType>('Hymn').sorted('number'))
  }

  async getAllCategories(): Promise<CategoryType[]> {
    const realm = await this.initialize()
    return Array.from(realm.objects<CategoryType>('Category'))
  }

  async getHymnById(id: number): Promise<HymnType | null> {
    const realm = await this.initialize()
    return realm.objectForPrimaryKey<HymnType>('Hymn', id)
  }

  async getHymnsByCategory(categoryId: number): Promise<HymnType[]> {
    const realm = await this.initialize()
    return Array.from(
      realm.objects<HymnType>('Hymn').filtered('category.id == $0', categoryId)
    )
  }

  async close() {
    if (this.realm && !this.realm.isClosed) {
      this.realm.close()
      this.realm = null
    }
  }
}

export const realmService = new RealmService()
