import { create } from 'zustand'
//import { Track } from '@/types/hymnsTypes'
import TrackPlayer, {
  State,
  Track,
  useActiveTrack,
  Event,
  RepeatMode,
} from 'react-native-track-player'
import React from 'react'
import { Hymn } from '@/types/hymnsTypes'

interface PlayerState {
  activeHymn: Track | Hymn | null
  lastActiveHymn: Track | Hymn | null
  isPlaying: boolean
  playerState: State | null
  // Actions
  setupPlayer: () => Promise<void>
  setActiveHymn: (track: Track | Hymn | null) => void
  setLastActiveHymn: (track: Track | Hymn | null) => void
  setIsPlaying: (playing: boolean) => void
  setPlayerState: (state: State) => void
  // Player controls
  play: (track?: Track) => Promise<void>
  pause: () => Promise<void>
  skipToNext: () => Promise<void>
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  activeHymn: null,
  lastActiveHymn: null,
  isPlaying: false,
  playerState: null,

  setupPlayer: async () => {
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 10,
    })

    await TrackPlayer.setVolume(0.8)
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
  },
  setActiveHymn: track => set({ activeHymn: track }),
  setLastActiveHymn: track => set({ lastActiveHymn: track }),
  setIsPlaying: playing => set({ isPlaying: playing }),
  setPlayerState: state => set({ playerState: state }),

  play: async (track?: Track) => {
    if (track) {
      await TrackPlayer.reset()
      await TrackPlayer.add(track)
      get().setActiveHymn(track)
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

export const useTrackUpdates = () => {
  const setActiveHymn = usePlayerStore(state => state.setActiveHymn)

  React.useEffect(() => {
    const subscription = TrackPlayer.addEventListener(
      Event.PlaybackActiveTrackChanged,
      async ({ track }) => {
        if (typeof track === 'number') {
          const nextTrackObj = await TrackPlayer.getTrack(track)
          setActiveHymn(nextTrackObj || null)
        } else {
          setActiveHymn(null)
        }
      }
    )

    return () => subscription.remove()
  }, [setActiveHymn])
}

export const useSetupHymnPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const isInitialized = React.useRef(false)
  const setupPlayer = usePlayerStore(state => state.setupPlayer)
  React.useEffect(() => {
    setupPlayer()
      .then(() => {
        isInitialized.current = true
        onLoad?.()
      })
      .catch(error => {
        isInitialized.current = false
        console.log(error)
      })
  }, [onLoad])
}
