import { useState, useEffect } from 'react'
import { realmService } from '../services/RealmService'
import { Hymn } from '@/types/hymnsTypes'

export function useRealm() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [realm, setRealm] = useState<Realm | null>(null)

  const importData = async (data: Hymn[]) => {
    try {
      setIsLoading(true)
      await realmService.importHymnalData(data)
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

  return {
    importData,
    getAllHymns,
    getHymnById,
    isLoading,
    error,
    isRealmReady: realm !== null,
  }
}
