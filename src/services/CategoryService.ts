import { Category as CategoryType } from '@/types/hymnsTypes'
import { CategoryRepository } from '@/repositories/category-repository'
import { BaseRealmService } from './BaseRealmService'

class CategoryService extends BaseRealmService implements CategoryRepository {
  constructor() {
    super()
  }

  async create(categories: CategoryType[]): Promise<void> {
    const realm = await this.initialize()

    try {
      realm.write(() => {
        const existingCategories = realm.objects('Category')
        realm.delete(existingCategories)
        categories.forEach((category: CategoryType) => {
          realm.create('Category', {
            id: category.id,
            name: category.name,
            subCategories: category.subCategories,
          })
        })
        //this.close()
      })
    } catch (error) {
      console.error('Error importing categories:', error)
      throw error
    }
  }

  async getAllCategories(): Promise<CategoryType[]> {
    const realm = await this.initialize()
    return Array.from(realm.objects<CategoryType>('Category'))
  }

  async findById(id: number): Promise<CategoryType | null> {
    const realm = await this.initialize()
    return realm.objectForPrimaryKey<CategoryType>('Category', id)
  }

  async getAll(): Promise<CategoryType[]> {
    return this.getAllCategories()
  }
}

export const categoryService = new CategoryService()
