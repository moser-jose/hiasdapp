import React, { useCallback } from 'react'
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
  lyrics: Hymn | null
  clickPlay: number
  setHymns: (hymns: Hymn[]) => void
  setCategories: (categories: Category[]) => void
  setFavorites: (favorites: Hymn[]) => void
  addToPlayList: (hymn: Track | Hymn, playlistName: string) => void
  setLyrics: (lyrics: Hymn | null) => void
  setClickPlay: (clickPlay: number) => void
}

export const useLibraryStore = create<LibraryState>()(set => ({
  hymns: [],
  categories: [],
  favorites: [],
  lyrics: null,
  clickPlay: 0,
  setLyrics: (lyrics: Hymn | null) => set({ lyrics: lyrics }),
  setHymns: hymns => set({ hymns }),
  setCategories: categories => set({ categories }),
  setFavorites: favorites => set({ favorites }),
  addToPlayList: () => {},
  setClickPlay: clickPlay =>
    set({ clickPlay: clickPlay === 2 ? 1 : clickPlay + 1 }),
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

export const useLyrics = (hymnId: number | null) => {
  const hymns = useLibraryStore(useShallow(state => state.hymns))
  const setLyrics = useLibraryStore(useShallow(state => state.setLyrics))
  const lyrics = useLibraryStore(useShallow(state => state.lyrics))

  React.useEffect(() => {
    if (hymnId) {
      const foundLyrics = hymns.find(hymn => hymn.id === hymnId)
      setLyrics(foundLyrics as Hymn)
    } else {
      setLyrics(null)
    }
  }, [hymnId, hymns, setLyrics])

  return lyrics
}

export const useClickPlay = () => {
  const clickPlay = useLibraryStore(useShallow(state => state.clickPlay))
  const setClickPlay = useLibraryStore(useShallow(state => state.setClickPlay))

  const incrementClickPlay = useCallback(() => {
    setClickPlay(clickPlay === 2 ? 1 : clickPlay + 1)
  }, [clickPlay, setClickPlay])

  return incrementClickPlay
}

export const countFavorites = (hymns: Hymn[]) => {
  return hymns.filter(hymn => hymn.isFavorite).length
}
