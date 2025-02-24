import Realm from 'realm'
import { createRealmContext } from '@realm/react'
import {
  Hymn,
  Author,
  Category,
  SubCategory,
  Verse,
  Chorus,
  Lyrics,
} from '../models/Hymnal'
import {
  Hymn as HymnType,
  Verse as VerseType,
  Chorus as ChorusType,
  Author as AuthorType,
} from '@/types/hymnsTypes'

const realmConfig: Realm.Configuration = {
  schema: [
    Hymn.schema,
    Author.schema,
    Category.schema,
    SubCategory.schema,
    Verse.schema,
    Chorus.schema,
    Lyrics.schema,
  ],
  schemaVersion: 2,
  migration: (oldRealm: Realm, newRealm: Realm) => {
    if (oldRealm.schemaVersion < 2) {
      const oldHymns = oldRealm.objects('Hymn')
      const newHymns = newRealm.objects('Hymn')
      const oldAuthors = oldRealm.objects('Author')
      const newAuthors = newRealm.objects('Author')

      // Migrar Authors
      for (let i = 0; i < oldAuthors.length; i++) {
        const oldAuthor = oldAuthors[i]
        newAuthors[i].name = oldAuthor.name || ''
      }

      // Migrar Hymns
      for (let i = 0; i < oldHymns.length; i++) {
        const oldHymn = oldHymns[i]
        const newHymn = newHymns[i]

        // Migrar campos opcionais
        newHymn.biblicalText = oldHymn.biblicalText || null
        newHymn.url = oldHymn.url || null
        newHymn.urlOld = oldHymn.urlOld || null
        newHymn.artwork = oldHymn.artwork || null
        newHymn.artist = oldHymn.artist || null
      }
    }
  },
  deleteRealmIfMigrationNeeded: __DEV__,
}

// Criar o contexto do Realm
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

  async importHymnalData(data: HymnType[]): Promise<void> {
    const realm = await this.initialize()

    try {
      realm.write(() => {
        realm.deleteAll()

        data.forEach((hymnData: HymnType) => {
          const subCategory = realm.create('SubCategory', {
            id: hymnData.category?.subCategory?.id ?? 1,
            name: hymnData.category?.subCategory?.name ?? '',
          })

          const category = realm.create('Category', {
            id: hymnData.category?.id ?? 1,
            name: hymnData.category?.name ?? '',
            subCategory,
          })

          const verses =
            hymnData.lyrics?.verses?.map((verseData: VerseType) =>
              realm.create('Verse', {
                id: verseData.id,
                number: verseData.number,
                verse: verseData.verse,
              })
            ) ?? []

          const chorus =
            hymnData.lyrics?.chorus?.map((chorusData: ChorusType) =>
              realm.create('Chorus', {
                id: chorusData.id,
                name: chorusData.name,
                choir: chorusData.choir,
              })
            ) ?? []

          const lyrics = realm.create('Lyrics', {
            verses,
            chorus,
          })

          const authors = hymnData.authors.map((authorData: AuthorType) =>
            realm.create('Author', {
              id: authorData.id,
              name: authorData.name,
            })
          )

          realm.create('Hymn', {
            id: hymnData.id,
            title: hymnData.title,
            englishTitle: hymnData.englishTitle,
            number: hymnData.number,
            numberView: hymnData.numberView,
            biblicalText: hymnData.biblicalText,
            url: hymnData.url,
            urlOld: hymnData.urlOld,
            artwork: hymnData.artwork,
            artist: hymnData.artist,
            category,
            lyrics,
            authors,
          })
        })
      })
    } catch (error) {
      console.error('Error importing hymnal data:', error)
      throw error
    }
  }

  async getAllHymns() {
    const realm = await this.initialize()
    return realm.objects<HymnType>('Hymn').sorted('number')
  }

  async getHymnById(id: number) {
    const realm = await this.initialize()
    return realm.objectForPrimaryKey<HymnType>('Hymn', id)
  }

  async getHymnsByCategory(categoryId: number) {
    const realm = await this.initialize()
    return realm
      .objects<HymnType>('Hymn')
      .filtered('category.id == $0', categoryId)
  }

  async close() {
    if (this.realm && !this.realm.isClosed) {
      this.realm.close()
      this.realm = null
    }
  }
}

export const realmService = new RealmService()
