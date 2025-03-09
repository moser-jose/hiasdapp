import { create } from 'zustand'

// Em stateStore.ts, adicione:
export interface StateStore {
  // Estado existente
  viewLyric: boolean
  viewPlaylist: boolean
  isLyricsScreenOpen: boolean // Nova propriedade

  // Funções existentes
  setViewLyric: () => void
  setViewPlaylist: () => void
  setLyricsScreenOpen: (isOpen: boolean) => void // Nova função
}

export const useStateStore = create<StateStore>(set => ({
  // Estado e funções existentes
  viewLyric: false,
  viewPlaylist: false,
  isLyricsScreenOpen: false,

  setViewLyric: () =>
    set(state => ({ viewLyric: !state.viewLyric, viewPlaylist: false })),
  setViewPlaylist: () =>
    set(state => ({ viewPlaylist: !state.viewPlaylist, viewLyric: false })),
  setLyricsScreenOpen: isOpen => set({ isLyricsScreenOpen: isOpen }),
}))
