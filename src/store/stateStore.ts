import { create } from 'zustand'
export interface StateStore {
  viewLyric: boolean
  viewPlaylist: boolean
  shuffle: boolean
  setViewLyric: () => void
  setViewPlaylist: () => void
  setShuffle: () => void
}

export const useStateStore = create<StateStore>(set => ({
  viewLyric: false,
  viewPlaylist: false,
  shuffle: false,
  setViewLyric: () =>
    set(state => ({ viewLyric: !state.viewLyric, viewPlaylist: false })),
  setViewPlaylist: () =>
    set(state => ({ viewPlaylist: !state.viewPlaylist, viewLyric: false })),
  setShuffle: () => set(state => ({ shuffle: !state.shuffle })),
}))
