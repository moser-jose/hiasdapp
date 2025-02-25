import { useState, useEffect } from 'react'
import { realmService } from '../services/RealmService'
import { Category, Hymn } from '@/types/hymnsTypes'

export function useRealm() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [realm, setRealm] = useState<Realm | null>(null)

  interface Data {
    hymns: Hymn[]
    categories: Category[]
  }

  const importData = async (data: Data) => {
    try {
      setIsLoading(true)
      await realmService.importalData(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const getAllHymns = async () => {
    try {
      setIsLoading(true)
      return await realmService.getAllHymns()
    } catch (err) {
      setError(err as Error)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  const getHymnById = async (id: number) => {
    try {
      return await realmService.getHymnById(id)
    } catch (err) {
      setError(err as Error)
      return null
    }
  }

  const getAllCategories = async () => {
    try {
      return await realmService.getAllCategories()
    } catch (err) {
      setError(err as Error)
      return null
    }
  }

  const checkIfDatabaseEmpty = async () => {
    try {
      setIsLoading(true)
      const hymns = await realmService.getAllHymns()
      return hymns.length === 0
    } catch (err) {
      setError(err as Error)
      return true
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getAllCategories,
    importData,
    getAllHymns,
    getHymnById,
    isLoading,
    error,
    isRealmReady: realm !== null,
    checkIfDatabaseEmpty,
  }
}
