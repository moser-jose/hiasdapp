import { Hymn } from '@/types/hymnsTypes'

export interface HymnRepository {
  create(hymns: Hymn[]): Promise<void>
  findById(id: number): Promise<Hymn | null>
  getAll(): Promise<Hymn[] | []>
  toggleFavorite(id: number): Promise<void>
  getFavoriteHymns(): Promise<Hymn[] | []>
  findHymnsByCategoryId(id: number): Promise<Hymn[] | []>
  isFavorite(id: number): Promise<boolean>
}
