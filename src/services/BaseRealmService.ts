import { Chorus, Hymn, Lyrics, Verse } from '@/models/Hymnal'
import Realm from 'realm'

import { createRealmContext } from '@realm/react'
import { Author } from '@/models/Hymnal'
import { CategoryHymn, Category, SubCategory } from '@/models/Category'

const realmConfig: Realm.Configuration = {
  schema: [
    Hymn.schema,
    Lyrics.schema,
    Author.schema,
    Verse.schema,
    Chorus.schema,
    CategoryHymn.schema,
    Category.schema,
    SubCategory.schema,
  ],
  schemaVersion: 7,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 7) {
      const oldCategories = oldRealm.objects('Category')

      // Clear existing data since we have a schema mismatch
      newRealm.deleteAll()
    }
  },
  // This will delete the realm if migration isn't possible
  deleteRealmIfMigrationNeeded: true,
}
export const { RealmProvider, useRealm, useObject, useQuery } =
  createRealmContext(realmConfig)

export abstract class BaseRealmService {
  protected realm: Realm | null = null
  protected realmConfig: Realm.Configuration

  constructor() {
    this.realmConfig = realmConfig
  }

  async initialize(): Promise<Realm> {
    if (!this.realm) {
      try {
        this.realm = await Realm.open(this.realmConfig)
      } catch (error) {
        console.error('Failed to initialize Realm:', error)
        throw error
      }
    }
    return this.realm
  }

  async close(): Promise<void> {
    if (this.realm && !this.realm.isClosed) {
      this.realm.close()
      this.realm = null
    }
  }
}
