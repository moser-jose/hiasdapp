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
  setHymns: (hymns: Hymn[]) => void
  setCategories: (categories: Category[]) => void
  toogleHymnFavorite: (hymn: Track | Hymn) => void
  addToPlayList: (hymn: Track | Hymn, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()(set => ({
  hymns: [],
  categories: [],
  setHymns: hymns => set({ hymns }),
  setCategories: categories => set({ categories }),
  toogleHymnFavorite: () => {},
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
  const favorites = useLibraryStore(state =>
    state.hymns.filter(hymn => hymn.id === 1)
  )

  const toogleHymnFavorite = useLibraryStore(state => state.toogleHymnFavorite)
  return { favorites, toogleHymnFavorite }
}
