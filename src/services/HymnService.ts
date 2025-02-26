import { Hymn as HymnType } from '@/types/hymnsTypes'
import { HymnRepository } from '@/repositories/hymn-repository'
import { BaseRealmService } from './BaseRealmService'

class HymnService extends BaseRealmService implements HymnRepository {
  constructor() {
    super()
  }
  async create(hymns: HymnType[]): Promise<void> {
    const realm = await this.initialize()

    try {
      realm.write(() => {
        const existingHymns = realm.objects('Hymn')
        realm.delete(existingHymns)

        hymns.forEach(hymn => {
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
            category: hymn.category,
          })
        })
      })
    } catch (error) {
      console.error('Error creating hymn:', error)
      throw error
    }
  }

  async getAll(): Promise<HymnType[]> {
    const realm = await this.initialize()
    return Array.from(realm.objects<HymnType>('Hymn').sorted('number'))
  }

  async findById(id: number): Promise<HymnType | null> {
    const realm = await this.initialize()
    return realm.objectForPrimaryKey<HymnType>('Hymn', id)
  }

  async findHymnsByCategoryId(id: number): Promise<HymnType[] | []> {
    const realm = await this.initialize()
    return Array.from(
      realm.objects<HymnType>('Hymn').filtered('category.id == $0', id)
    )
  }

  async toggleFavorite(id: number): Promise<void> {
    const realm = await this.initialize()
    const hymn = realm.objectForPrimaryKey<HymnType>('Hymn', id)

    if (hymn) {
      try {
        realm.write(() => {
          hymn.isFavorite = !hymn.isFavorite
        })
      } catch (error) {
        console.error('Error toggling favorite:', error)
        throw error
      }
    }
  }

  async getFavoriteHymns(): Promise<HymnType[]> {
    const realm = await this.initialize()
    return Array.from(
      realm
        .objects<HymnType>('Hymn')
        .filtered('isFavorite == true')
        .sorted('number')
    )
  }

  async isFavorite(hymnId: number): Promise<boolean> {
    const realm = await this.initialize()
    const hymn = realm.objectForPrimaryKey<HymnType>('Hymn', hymnId)
    return hymn?.isFavorite ?? false
  }
}

export const hymnService = new HymnService()
