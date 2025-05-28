import React, { useCallback } from 'react'
import { Hymn, Category, Playlist } from '@/types/hymnsTypes'
import { Track } from 'react-native-track-player'
import { create } from 'zustand'
import * as msgpack from '@msgpack/msgpack'
import { useShallow } from 'zustand/react/shallow'
import { useRealm } from '@/hooks/useRealm'
import { usePlaylist } from '@/hooks/usePlaylist'

interface LibraryState {
  hymns: Hymn[]
  categories: Category[]
  favorites: Hymn[]
  lyrics: Hymn | null
  clickPlay: number
  playlists: Playlist[]
  setHymns: (hymns: Hymn[]) => void
  setCategories: (categories: Category[]) => void
  setFavorites: (favorites: Hymn[]) => void
  addToPlayList: (hymn: Track | Hymn, playlistName: string) => void
  setLyrics: (lyrics: Hymn | null) => void
  setClickPlay: (clickPlay: number) => void
  setPlaylists: (playlists: Playlist[]) => void
}

export const useLibraryStore = create<LibraryState>()(set => ({
  hymns: [],
  categories: [],
  favorites: [],
  isFavorite: false,
  lyrics: null,
  clickPlay: 0,
  playlists: [],
  setLyrics: (lyrics: Hymn | null) => set({ lyrics: lyrics }),
  setHymns: hymns => set({ hymns }),
  setCategories: categories => set({ categories }),
  setFavorites: favorites => set({ favorites }),
  addToPlayList: () => {},
  setClickPlay: clickPlay =>
    set({ clickPlay: clickPlay === 2 ? 1 : clickPlay + 1 }),
  setPlaylists: playlists => {
    set({ playlists })
  },
}))

export const useInitLibrary = () => {
  const setHymns = useLibraryStore(state => state.setHymns)
  const setFavorites = useLibraryStore(state => state.setFavorites)
  const setCategories = useLibraryStore(state => state.setCategories)
  const { getAllHymns, getAllCategories, getFavoriteHymns } = useRealm()
  React.useEffect(() => {
    getAllHymns().then(realmHymns => {
      if (realmHymns.length > 0) {
        const hymns = msgpack.decode(msgpack.encode(realmHymns)) as Hymn[]
        setHymns(hymns)
      }
    })
  }, [getAllHymns, setHymns])

  React.useEffect(() => {
    getFavoriteHymns().then(hymns => {
      if (hymns) {
        setFavorites(hymns)
      }
    })
  }, [getFavoriteHymns, setFavorites])

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

export const usePlaylists = () => {
  const playlists = useLibraryStore(useShallow(state => state.playlists))
  const setPlaylists = useLibraryStore(useShallow(state => state.setPlaylists))
  const { getAllPlaylists } = usePlaylist()

  React.useEffect(() => {
    const loadPlaylists = async () => {
      const playlists = await getAllPlaylists()
      setPlaylists(playlists)
    }
    loadPlaylists()
  }, [getAllPlaylists, setPlaylists])

  return { playlists, setPlaylists }
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
