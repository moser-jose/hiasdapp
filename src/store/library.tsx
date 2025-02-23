import React from 'react'
import { Hymn, Category, ListCategoriesProps } from '@/types/hymnsTypes'
import { HymnWithPlayList } from '@/types/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'
import * as msgpack from '@msgpack/msgpack'
import hinos from '@/api/hiasd-old.json'
interface LibraryState {
  hymns: HymnWithPlayList[]
  categories: ListCategoriesProps['categories']
  loadData: () => void
  toogleHymnFavorite: (hymn: Track | Hymn) => void
  addToPlayList: (hymn: Track | Hymn, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()(set => ({
  hymns: [],
  categories: hinos.categories,
  loadData: () => {
    const packedHymns = msgpack.encode(hinos.hymns) // Compacta o JSON
    const decodedHymns = msgpack.decode(packedHymns) as HymnWithPlayList[]

    const packedCategories = msgpack.encode(hinos.categories)
    const decodedCategories = msgpack.decode(
      packedCategories
    ) as ListCategoriesProps['categories']
    set({ hymns: decodedHymns, categories: decodedCategories })
  },

  toogleHymnFavorite: () => {},
  addToPlayList: () => {},
}))

export const useHymns = () => useLibraryStore(state => state.hymns)
export const useCategories = () => useLibraryStore(state => state.categories)

export const useInitLibrary = () => {
  const loadData = useLibraryStore(state => state.loadData)
  React.useEffect(() => {
    loadData()
  }, [loadData])
}

export const useFavorites = () => {
  const favorites = useLibraryStore(state =>
    state.hymns.filter(hymn => hymn.id === 1)
  )

  const toogleHymnFavorite = useLibraryStore(state => state.toogleHymnFavorite)
  return { favorites, toogleHymnFavorite }
}
