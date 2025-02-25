import React from 'react'
import { Hymn, Category } from '@/types/hymnsTypes'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'
import * as msgpack from '@msgpack/msgpack'
import hinos from '@/api/hiasd-old.json'
import { useShallow } from 'zustand/react/shallow'
import { useRealm } from '@/hooks/useRealm'

interface LibraryState {
  hymns: Hymn[]
  categories: Category[]
  //loadData: () => Promise<void>
  setHymns: (hymns: Hymn[]) => void
  setCategories: (categories: Category[]) => void
  toogleHymnFavorite: (hymn: Track | Hymn) => void
  addToPlayList: (hymn: Track | Hymn, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()(set => ({
  hymns: [],
  categories: [] /* hinos.categories */,
  setHymns: hymns => set({ hymns }),
  setCategories: categories => set({ categories }),
  /* loadData: async () => {
    // Carrega dados do JSON primeiro
    const packedHymns = msgpack.encode(hinos.hymns)
    const decodedHymns = msgpack.decode(packedHymns) as Hymn[]

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
  const setCategories = useLibraryStore(state => state.setCategories)
  const { getAllHymns, getAllCategories } = useRealm()
  React.useEffect(() => {
    getAllHymns().then(realmHymns => {
      if (realmHymns.length > 0) {
        const hymns = msgpack.decode(msgpack.encode(hinos.hymns)) as Hymn[]
        setHymns(hymns)
      }
    })

    getAllCategories().then(categories => {
      if (categories) {
        setCategories(categories as Category[])
      }
    })
  }, [getAllCategories, getAllHymns, setCategories, setHymns])
}

export const useFavorites = () => {
  const favorites = useLibraryStore(state =>
    state.hymns.filter(hymn => hymn.id === 1)
  )

  const toogleHymnFavorite = useLibraryStore(state => state.toogleHymnFavorite)
  return { favorites, toogleHymnFavorite }
}
