import { useCallback, useEffect } from 'react'

import { Hymn } from '@/types/hymnsTypes'
import { useRealm } from '@/hooks/useRealm'
import { useLibraryStore } from '@/store/library'
import { useShallow } from 'zustand/react/shallow'

export const useFavorites = () => {
  const favorites = useLibraryStore(useShallow(state => state.favorites))
  const setFavorites = useLibraryStore(state => state.setFavorites)
  const { toggleFavorite, isFavorite, getFavoriteHymns } = useRealm()

  const toggleFavoriteAndUpdate = useCallback(
    async (hymnId: number) => {
      // Update in Realm database
      await toggleFavorite(hymnId)
      // Refresh favorites in store
      const updatedFavorites = await getFavoriteHymns()
      if (updatedFavorites) {
        const favorites = updatedFavorites as Hymn[]
        setFavorites(favorites)
      }
    },
    [toggleFavorite, getFavoriteHymns, setFavorites]
  )

  const checkIsFavorite = useCallback(
    async (hymnId: number) => {
      return await isFavorite(hymnId)
    },
    [isFavorite]
  )

  const loadFavorites = useCallback(async () => {
    const realmFavorites = await getFavoriteHymns()
    if (realmFavorites) {
      const favorites = realmFavorites as Hymn[]
      setFavorites(favorites)
      return favorites
    }
    return []
  }, [getFavoriteHymns, setFavorites])

  useEffect(() => {
    loadFavorites()
  }, [])

  return {
    favorites,
    toggleFavorite: toggleFavoriteAndUpdate,
    isFavorite: checkIsFavorite,
    loadFavorites,
  }
}
