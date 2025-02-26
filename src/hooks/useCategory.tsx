import { useState } from 'react'
import { categoryService } from '../services/CategoryService'
import { Category } from '@/types/hymnsTypes'

export function useCategory() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [realm, setRealm] = useState<Realm | null>(null)

  const createCategory = async (data: Category[]) => {
    try {
      setIsLoading(true)
      await categoryService.create(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const getAllCategories = async () => {
    try {
      setIsLoading(true)
      return await categoryService.getAll()
    } catch (err) {
      setError(err as Error)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const getCategoryById = async (id: number) => {
    try {
      return await categoryService.findById(id)
    } catch (err) {
      setError(err as Error)
      return null
    }
  }

  return {
    createCategory,
    getAllCategories,
    getCategoryById,
    isLoading,
    error,
    isRealmReady: realm !== null,
  }
}
