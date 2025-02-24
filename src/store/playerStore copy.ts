import { create } from 'zustand'
//import { Track } from '@/types/hymnsTypes'
import TrackPlayer, { State, Track } from 'react-native-track-player'

interface PlayerState {
  activeTrack: Track | null
  lastActiveTrack: Track | null
  isPlaying: boolean
  playerState: State | null
  // Actions
  setActiveTrack: (track: Track | null) => void
  setLastActiveTrack: (track: Track | null) => void
  setIsPlaying: (playing: boolean) => void
  setPlayerState: (state: State) => void
  // Player controls
  play: (track?: Track) => Promise<void>
  pause: () => Promise<void>
  skipToNext: () => Promise<void>
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  activeTrack: null,
  lastActiveTrack: null,
  isPlaying: false,
  playerState: null,

  setActiveTrack: track => set({ activeTrack: track }),
  setLastActiveTrack: track => set({ lastActiveTrack: track }),
  setIsPlaying: playing => set({ isPlaying: playing }),
  setPlayerState: state => set({ playerState: state }),

  play: async (track?) => {
    if (track) {
      await TrackPlayer.reset()
      await TrackPlayer.add(track)
      get().setActiveTrack(track)
    }
    await TrackPlayer.play()
    set({ isPlaying: true })
  },

  pause: async () => {
    await TrackPlayer.pause()
    set({ isPlaying: false })
  },

  skipToNext: async () => {
    await TrackPlayer.skipToNext()
  },
}))

// Seletores otimizados
export const selectActiveTrack = (state: PlayerState) => state.activeTrack
export const selectLastActiveTrack = (state: PlayerState) =>
  state.lastActiveTrack
export const selectIsPlaying = (state: PlayerState) => state.isPlaying
