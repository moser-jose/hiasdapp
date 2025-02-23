import { create } from 'zustand'

export interface StateStore {
  viewLyric: boolean
  viewPlaylist: boolean

  setViewLyric: () => void
  setViewPlaylist: () => void
}

export const useStateStore = create<StateStore>(set => ({
  viewLyric: false,
  viewPlaylist: false,

  setViewLyric: () =>
    set(state => ({ viewLyric: !state.viewLyric, viewPlaylist: false })),
  setViewPlaylist: () =>
    set(state => ({ viewPlaylist: !state.viewPlaylist, viewLyric: false })),
}))
