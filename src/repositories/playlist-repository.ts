import { Hymn, Playlist } from '@/types/hymnsTypes'

export interface PlaylistRepository {
  create(playlist: Playlist): Promise<void>
  findById(id: number): Promise<Playlist | null>
  getAll(): Promise<Playlist[] | []>
  addHymnToPlaylist(id: number, hymn: number): Promise<boolean>
  removeHymnFromPlaylist(id: number, hymn: number): Promise<boolean>
  updatePlaylist(id: number, hymn: number): Promise<boolean>
  deletePlaylist(id: number): Promise<boolean>
}
