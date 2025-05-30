import { create } from 'zustand'

export interface StateStore {
  viewLyric: boolean
  viewPlaylist: boolean
  isLyricsScreenOpen: boolean
  changeHymns: boolean

  setViewLyric: () => void
  setViewPlaylist: () => void
  setLyricsScreenOpen: (isOpen: boolean) => void
  setChangeHymns: (change: boolean) => void
}

export const useStateStore = create<StateStore>(set => ({
  viewLyric: false,
  viewPlaylist: false,
  isLyricsScreenOpen: false,
  changeHymns: false,
  setViewLyric: () =>
    set(state => ({ viewLyric: !state.viewLyric, viewPlaylist: false })),
  setViewPlaylist: () =>
    set(state => ({ viewPlaylist: !state.viewPlaylist, viewLyric: false })),
  setLyricsScreenOpen: isOpen => set({ isLyricsScreenOpen: isOpen }),
  setChangeHymns: change => set({ changeHymns: change }),
}))
