import React from 'react'
import { Hymn, Category } from '@/types/hymnsTypes'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'
import * as msgpack from '@msgpack/msgpack'
import { useShallow } from 'zustand/react/shallow'
import { useRealm } from '@/hooks/useRealm'

interface LibraryState {
  hymns: Hymn[]
  categories: Category[]
  favorites: Hymn[]
  setHymns: (hymns: Hymn[]) => void
  setCategories: (categories: Category[]) => void
  setFavorites: (favorites: Hymn[]) => void
  addToPlayList: (hymn: Track | Hymn, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()(set => ({
  hymns: [],
  categories: [],
  favorites: [],
  setHymns: hymns => set({ hymns }),
  setCategories: categories => set({ categories }),
  setFavorites: favorites => set({ favorites }),
  addToPlayList: () => {},
}))

export const useHymns = () => useLibraryStore(useShallow(state => state.hymns))

export const useCategories = () =>
  useLibraryStore(useShallow(state => state.categories))

export const useInitLibrary = () => {
  const setHymns = useLibraryStore(state => state.setHymns)
  const setCategories = useLibraryStore(state => state.setCategories)
  const { getAllHymns, getAllCategories } = useRealm()
  React.useEffect(() => {
    getAllHymns().then(realmHymns => {
      if (realmHymns.length > 0) {
        const hymns = msgpack.decode(msgpack.encode(realmHymns)) as Hymn[]
        setHymns(hymns)
      }
    })
  }, [getAllHymns, setHymns])

  React.useEffect(() => {
    getAllCategories().then(realmCategories => {
      if (realmCategories) {
        const categories = msgpack.decode(
          msgpack.encode(realmCategories)
        ) as Category[]
        setCategories(categories)
      }
    })
  }, [getAllCategories, setCategories])
}

export const useFavorites = () => {
  const favorites = useLibraryStore(useShallow(state => state.favorites))
  const setFavorites = useLibraryStore(state => state.setFavorites)
  const { toggleFavorite, isFavorite, getFavoriteHymns } = useRealm()

  const toggleFavoriteAndUpdate = async (hymnId: number) => {
    // Update in Realm database
    await toggleFavorite(hymnId)
    // Refresh favorites in store
    const updatedFavorites = await getFavoriteHymns()
    if (updatedFavorites) {
      const favorites = msgpack.decode(
        msgpack.encode(updatedFavorites)
      ) as Hymn[]
      setFavorites(favorites)
    }
  }

  const checkIsFavorite = async (hymnId: number) => {
    return await isFavorite(hymnId)
  }

  const loadFavorites = async () => {
    const realmFavorites = await getFavoriteHymns()
    if (realmFavorites) {
      const favorites = msgpack.decode(msgpack.encode(realmFavorites)) as Hymn[]
      setFavorites(favorites)
      return favorites
    }
    return []
  }

  React.useEffect(() => {
    loadFavorites()
  }, [])

  return {
    favorites,
    toggleFavorite: toggleFavoriteAndUpdate,
    isFavorite: checkIsFavorite,
    loadFavorites,
  }
}
