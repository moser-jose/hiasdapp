import { useState } from 'react'
import { hymnService } from '../services/HymnService'
import { Hymn } from '@/types/hymnsTypes'

export function useHymn() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [realm, setRealm] = useState<Realm | null>(null)

  const createHymns = async (data: Hymn[]) => {
    try {
      setIsLoading(true)
      await hymnService.create(data)
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

  const getFavoriteHymns = async () => {
    try {
      return await hymnService.getFavoriteHymns()
    } catch (err) {
      setError(err as Error)
    }
  }

  const checkIfDatabaseEmpty = async () => {
    try {
      setIsLoading(true)
      const hymns = await hymnService.getAll()
      return hymns.length === 0
    } catch (err) {
      setError(err as Error)
      return true
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createHymns,
    getAllHymns,
    getHymnById,
    isLoading,
    toggleFavorite,
    getFavoriteHymns,
    error,
    isRealmReady: realm !== null,
    checkIfDatabaseEmpty,
  }
}
