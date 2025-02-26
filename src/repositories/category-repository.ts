import { Category } from '@/types/hymnsTypes'
export interface CategoryRepository {
  create(categories: Category[]): Promise<void>
  getAllCategories(): Promise<Category[]>
  findById(id: number): Promise<Category | null>
  getAll(): Promise<Category[]>
}
