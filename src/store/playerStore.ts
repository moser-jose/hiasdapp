import { Hymn } from '@/types/hymnsTypes'
import React from 'react'
import TrackPlayer, {
  AddTrack,
  Event,
  PlaybackActiveTrackChangedEvent,
  RepeatMode,
  State,
  Track,
} from 'react-native-track-player'
import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

interface PlayerState {
  activeHymn: Track | Hymn | null
  activeHymns: Track[] | Hymn[] | null
  lastActiveHymn: Track | Hymn | null
  isPlaying: boolean
  playerState: State | null
  activeQueueId: string | null
  // Actions
  setupPlayer: () => Promise<void>
  setActiveHymn: (track: Track | Hymn | null) => void
  setLastActiveHymn: (track: Track | Hymn | null) => void
  setIsPlaying: (playing: boolean) => void
  setPlayerState: (state: State) => void
  // Player controls
  play: (track?: Track | Hymn) => Promise<void>
  pause: () => Promise<void>
  skipToPrevious: () => Promise<void>
  skipToNext: () => Promise<void>
  skipTo: (index: number) => Promise<void>
  add: (track: Track[] | Hymn[] | Track | Hymn) => Promise<void>
  reset: () => Promise<void>
  setActiveQueueId: (id: string) => void
  setQueue: (tracks?: Track[] | Hymn[]) => Promise<void>
  setActiveHymns: (tracks: Track[] | Hymn[]) => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  activeHymn: null,
  lastActiveHymn: null,
  isPlaying: false,
  playerState: null,
  activeQueueId: null,
  activeHymns: [],
  setupPlayer: async () => {
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 10,
    })

    await TrackPlayer.setVolume(0.8)
    await TrackPlayer.setRepeatMode(RepeatMode.Off)
  },
  setActiveHymn: track => set({ activeHymn: track }),
  setActiveHymns: tracks => set({ activeHymns: tracks }),
  setLastActiveHymn: track => set({ lastActiveHymn: track }),
  setIsPlaying: playing => set({ isPlaying: playing }),
  setPlayerState: state => set({ playerState: state }),

  play: async (track?: Track | Hymn) => {
    if (track) {
      await TrackPlayer.load(track)
      get().setActiveHymn(track)
    } else {
      const currentTrack = await TrackPlayer.getActiveTrack()
      if (currentTrack) {
        get().setActiveHymn(currentTrack as Track | Hymn)
      }
    }
    await TrackPlayer.play()
    set({ isPlaying: true })
  },

  pause: async () => {
    await TrackPlayer.pause()
    set({ isPlaying: false })
  },

  add: async (track: Track[] | Hymn[] | Track | Hymn) => {
    if (Array.isArray(track)) {
      await TrackPlayer.add(track as AddTrack[] | Hymn[])
    } else {
      await TrackPlayer.add(track as AddTrack | Hymn)
    }
  },

  reset: async () => {
    await TrackPlayer.reset()
  },

  skipToPrevious: async () => {
    await TrackPlayer.skipToPrevious()
    const nextTrack = await TrackPlayer.getActiveTrack()
    if (nextTrack) {
      get().setActiveHymn(nextTrack as Track | Hymn)
    }
  },
  skipToNext: async () => {
    await TrackPlayer.skipToNext()
    const nextTrack = await TrackPlayer.getActiveTrack()
    if (nextTrack) {
      get().setActiveHymn(nextTrack as Track | Hymn)
    }
  },
  skipTo: async (index: number) => {
    await TrackPlayer.skip(index)
    const nextTrack = await TrackPlayer.getActiveTrack()
    if (nextTrack) {
      get().setActiveHymn(nextTrack as Track | Hymn)
    }
  },
  setQueue: async (tracks?: Track[] | Hymn[]) => {
    if (tracks && tracks.length > 0) {
      await TrackPlayer.setQueue(tracks as Hymn[])
      set({ activeHymns: tracks })
    } else {
      await TrackPlayer.reset()
      set({ activeHymns: [], activeHymn: null })
    }
  },
  setActiveQueueId: (id: string) => set({ activeQueueId: id }),
}))
export const useTrackUpdates = () => {
  const setActiveHymn = usePlayerStore(state => state.setActiveHymn)

  React.useEffect(() => {
    const subscription = TrackPlayer.addEventListener(
      Event.PlaybackActiveTrackChanged,
      async (event: PlaybackActiveTrackChangedEvent) => {
        if (typeof event.track?.id === 'number') {
          const nextTrackObj = await TrackPlayer.getActiveTrack()
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
  useTrackUpdates()

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
  }, [onLoad, setupPlayer])
}

export const useQueue = () => usePlayerStore(useShallow(state => state))
