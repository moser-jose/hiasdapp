import { Hymn as HymnType, Playlist } from '@/types/hymnsTypes'
import { PlaylistRepository } from '@/repositories/playlist-repository'
import { BaseRealmService } from './BaseRealmService'

class PlaylistService extends BaseRealmService implements PlaylistRepository {
  constructor() {
    super()
  }

  async create(playlist: Playlist): Promise<void> {
    const realm = await this.initialize()

    try {
      console.log(realm)
      realm.write(() => {
        realm.create('Playlist', playlist)
      })
    } catch (error) {
      console.error('Error creating playlist:', error)
      throw error
    } /* finally {
      realm.close()
    } */
  }

  async findById(id: number): Promise<Playlist | null> {
    const realm = await this.initialize()
    try {
      const playlist = realm.objectForPrimaryKey('Playlist', id)
      if (!playlist) return null
      return {
        id: playlist.id as number,
        name: playlist.name as string,
        description: playlist.description as string,
        hymns: playlist.hymns as number[],
      }
    } catch (error) {
      console.error('Error finding playlist by id:', error)
      throw error
    } /* finally {
      realm.close()
    } */
  }

  async getAll(): Promise<Playlist[]> {
    const realm = await this.initialize()
    try {
      const playlists = realm.objects('Playlist')
      return [...playlists].map(playlist => ({
        id: playlist.id as number,
        name: playlist.name as string,
        description: playlist.description as string,
        hymns: playlist.hymns as number[],
      }))
    } catch (error) {
      console.error('Error getting all playlists:', error)
      throw error
    }/*  finally {
      realm.close()
    } */
  }

  async addHymnToPlaylist(id: number, hymn: number): Promise<boolean> {
    const realm = await this.initialize()
    try {
      const playlist = realm.objectForPrimaryKey('Playlist', id)
      if (!playlist) {
        throw new Error(`Playlist with id ${id} not found`)
      }
      realm.write(() => {
        ;(playlist.hymns as number[]).push(hymn)
      })

      return true
    } catch (error) {
      console.error('Error adding hymn to playlist:', error)
      throw error
    } finally {
      realm.close()
    }
  }

  async removeHymnFromPlaylist(id: number, hymnId: number): Promise<boolean> {
    const realm = await this.initialize()
    try {
      const playlist = realm.objectForPrimaryKey('Playlist', id)
      if (!playlist) {
        throw new Error(`Playlist with id ${id} not found`)
      }

      realm.write(() => {
        const hymnIndex = (playlist.hymns as number[]).findIndex(
          hymn => hymn === Number(hymnId)
        )
        if (hymnIndex >= 0) {
          ;(playlist.hymns as number[]).splice(hymnIndex, 1)
        }
      })

      return true
    } catch (error) {
      console.error('Error removing hymn from playlist:', error)
      throw error
    } finally {
      realm.close()
    }
  }

  async updatePlaylist(id: number, hymn: number): Promise<boolean> {
    const realm = await this.initialize()
    try {
      const existingPlaylist = realm.objectForPrimaryKey('Playlist', id)
      if (!existingPlaylist) {
        throw new Error(`Playlist with id ${id} not found`)
      }
      realm.write(() => {
        existingPlaylist.hymns = [...(existingPlaylist.hymns as number[]), hymn]
      })

      return true
    } catch (error) {
      console.error('Error updating playlist:', error)
      throw error
    } finally {
      realm.close()
    }
  }

  async deletePlaylist(id: number): Promise<boolean> {
    const realm = await this.initialize()
    try {
      const playlist = realm.objectForPrimaryKey('Playlist', id)
      if (!playlist) {
        throw new Error(`Playlist with id ${id} not found`)
      }

      realm.write(() => {
        realm.delete(playlist)
      })
      return true
    } catch (error) {
      console.error('Error deleting playlist:', error)
      throw error
    } finally {
      realm.close()
    }
  }
}

export const playlistService = new PlaylistService()
