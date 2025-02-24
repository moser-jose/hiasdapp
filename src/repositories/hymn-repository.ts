import { Hymn } from '@/models/Hymnal'
export interface HymnRepository {
  findById(id: string): Promise<Hymn | null>
  getAll(): Promise<Hymn[]>
}
