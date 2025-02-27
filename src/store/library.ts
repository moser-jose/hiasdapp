import React from 'react'
import { Hymn, Category } from '@/types/hymnsTypes'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'
import * as msgpack from '@msgpack/msgpack'
import { useShallow } from 'zustand/react/shallow'
import { useCategory } from '@/hooks/useCategory'
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

export const useInitLibrary = () => {
  const setHymns = useLibraryStore(state => state.setHymns)
  const setCategories = useLibraryStore(state => state.setCategories)
  const { getAllHymns, getAllCategories } = useRealm()
  React.useEffect(() => {
    getAllHymns().then(realmHymns => {
      if (realmHymns.length > 0) {
        //console.log(JSON.stringify(realmHymns[0], null, 2))
        const hymns = msgpack.decode(msgpack.encode(realmHymns)) as Hymn[]
        setHymns(hymns.slice(0, 1))
      }
    })

    getAllCategories().then(realmCategories => {
      if (realmCategories) {
        const categories = msgpack.decode(
          msgpack.encode(realmCategories)
        ) as Category[]
        setCategories(categories)
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
