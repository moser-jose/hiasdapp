import { useCallback, useMemo, useState } from 'react'
import { hymnService } from '../services/HymnService'
import { categoryService } from '../services/CategoryService'
import { Category } from '@/types/hymnsTypes'
import { Hymn } from '@/types/hymnsTypes'

type RealmData = {
  categories: Category[]
  hymns: Hymn[]
}

export function useRealm() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const create = (data: RealmData) => {
    try {
      setIsLoading(true)
      categoryService.create(data.categories)
      hymnService.create(data.hymns)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const getAllHymns = async () => {
    try {
      setIsLoading(true)
      return await hymnService.getAll()
    } catch (err) {
      setError(err as Error)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const getHymnById = async (id: number) => {
    try {
      return await hymnService.findById(id)
    } catch (err) {
      setError(err as Error)
      return null
    }
  }

  const toggleFavorite = async (hymnId: number) => {
    try {
      return await hymnService.toggleFavorite(hymnId)
    } catch (err) {
      setError(err as Error)
    }
  }

  const isFavorite = async (hymnId: number) => {
    try {
      return await hymnService.isFavorite(hymnId)
    } catch (err) {
      setError(err as Error)
    }
  }

  const getFavoriteHymns = async () => {
    try {
      return await hymnService.getFavoriteHymns()
    } catch (err) {
      setError(err as Error)
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

  const checkIfDatabaseEmpty = async () => {
    try {
      setIsLoading(true)
      const [hymns, category] = await Promise.all([
        hymnService.getAll(),
        categoryService.getAll(),
      ])

      return hymns.length === 0 && category.length === 0
    } catch (err) {
      setError(err as Error)
      return true
    } finally {
      setIsLoading(false)
    }
  }

  const closeRealm = async () => {
    Promise.all([hymnService.close(), categoryService.close()])
  }

  return {
    create,
    getAllHymns,
    getHymnById,
    isLoading,
    isFavorite,
    toggleFavorite,
    getFavoriteHymns,
    getAllCategories,
    getCategoryById,
    error,
    closeRealm,
    //isRealmReady: realm !== null,
    checkIfDatabaseEmpty,
  }
}
