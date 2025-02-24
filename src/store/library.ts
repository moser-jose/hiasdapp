import React from 'react'
import { Hymn, Category, ListCategoriesProps } from '@/types/hymnsTypes'
import { HymnWithPlayList } from '@/types/types'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'
import * as msgpack from '@msgpack/msgpack'
import hinos from '@/api/hiasd-old.json'
import { useShallow } from 'zustand/react/shallow'
import { useRealm } from '@/hooks/useRealm'

interface LibraryState {
  hymns: HymnWithPlayList[]
  categories: ListCategoriesProps['categories']
  //loadData: () => Promise<void>
  setHymns: (hymns: HymnWithPlayList[]) => void
  toogleHymnFavorite: (hymn: Track | Hymn) => void
  addToPlayList: (hymn: Track | Hymn, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()(set => ({
  hymns: [],
  categories: hinos.categories,
  setHymns: hymns => set({ hymns }),
  /* loadData: async () => {
    // Carrega dados do JSON primeiro
    const packedHymns = msgpack.encode(hinos.hymns)
    const decodedHymns = msgpack.decode(packedHymns) as HymnWithPlayList[]

    const packedCategories = msgpack.encode(hinos.categories)
    const decodedCategories = msgpack.decode(
      packedCategories
    ) as ListCategoriesProps['categories']

    set({ hymns: decodedHymns, categories: decodedCategories })
  }, */

  toogleHymnFavorite: () => {},
  addToPlayList: () => {},
}))

export const useHymns = () => useLibraryStore(useShallow(state => state.hymns))
export const useCategories = () =>
  useLibraryStore(useShallow(state => state.categories))

export const useInitLibrary = () => {
  const setHymns = useLibraryStore(state => state.setHymns)
  const { getAllHymns } = useRealm()
  React.useEffect(() => {
    getAllHymns().then(realmHymns => {
      if (realmHymns.length > 0) {
        setHymns(realmHymns as HymnWithPlayList[])
      }
    })
  }, [getAllHymns, setHymns])
}

export const useFavorites = () => {
  const favorites = useLibraryStore(state =>
    state.hymns.filter(hymn => hymn.id === 1)
  )

  const toogleHymnFavorite = useLibraryStore(state => state.toogleHymnFavorite)
  return { favorites, toogleHymnFavorite }
}
