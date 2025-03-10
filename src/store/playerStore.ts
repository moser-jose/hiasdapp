import { create } from 'zustand'
import TrackPlayer, {
  State,
  Track,
  Event,
  RepeatMode,
  AddTrack,
  PlaybackActiveTrackChangedEvent,
} from 'react-native-track-player'
import React from 'react'
import { Hymn } from '@/types/hymnsTypes'
import { useShallow } from 'zustand/react/shallow'

interface PlayerState {
  activeHymn: Track | Hymn | null
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
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  activeHymn: null,
  lastActiveHymn: null,
  isPlaying: false,
  playerState: null,
  activeQueueId: null,
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
    await TrackPlayer.setQueue(tracks as Hymn[])
    /* try {
      // Validate tracks parameter
      if (!tracks || !Array.isArray(tracks)) {
        // If tracks is undefined/invalid, reset the player queue
        await TrackPlayer.reset()
        get().setActiveHymn(null)
        get().setActiveQueueId('')
        get().setIsPlaying(false)

        return true
      }

      await TrackPlayer.setQueue(tracks)

      // Update active hymn after setting queue
      if (tracks.length > 0) {
        const activeTrack = await TrackPlayer.getActiveTrack()
        if (activeTrack) {
          get().setActiveHymn(activeTrack as Track | Hymn)
        }

        // Generate a unique queue ID based on the first track and timestamp
        const queueId = `queue-${tracks[0]?.id || 'unknown'}-${Date.now()}`
        get().setActiveQueueId(queueId)
      } else {
        // If queue is empty, reset active hymn
        get().setActiveHymn(null)
        get().setActiveQueueId('')
      }

      return true
    } catch (error) {
      console.error('Error setting queue:', error)
      return false
    } */
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
