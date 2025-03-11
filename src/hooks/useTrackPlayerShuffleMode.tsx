import { usePlayerStore } from '@/store/playerStore'
import { useStateStore } from '@/store/stateStore'
import { useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'

export const useTrackPlayerShuffleMode = () => {
  const { shuffle, setShuffle } = useStateStore(
    useShallow(state => ({
      shuffle: state.shuffle,
      setShuffle: state.setShuffle,
    }))
  )

  const { activeHymns, setQueue, setActiveHymns } = usePlayerStore(
    useShallow(state => ({
      activeHymns: state.activeHymns,
      setQueue: state.setQueue,
      setActiveHymns: state.setActiveHymns,
    }))
  )

  const handleShufflePress = useCallback(async () => {
    try {
      // If shuffle is currently ON and we're turning it OFF
      if (shuffle && activeHymns) {
        // Sort the hymns by their original order (assuming they have a 'number' property)
        const originalOrderHymns = [...activeHymns].sort((a, b) => {
          if (a.number && b.number) {
            return a.number - b.number
          }
          return 0
        })

        // Update the queue with the original ordered tracks
        await setQueue(originalOrderHymns)
        setActiveHymns(originalOrderHymns)
      }
      // If shuffle is currently OFF and we're turning it ON
      else if (!shuffle && activeHymns) {
        // Create a shuffled version of the tracks
        const shuffledTracks = [...activeHymns].sort(() => Math.random() - 0.5)

        // Update the queue with the shuffled tracks
        await setQueue(shuffledTracks)
        setActiveHymns(shuffledTracks)
      }

      // Toggle the shuffle state in the store
      setShuffle()
    } catch (error) {
      console.error('Error toggling shuffle mode:', error)
    }
  }, [shuffle, activeHymns, setQueue, setActiveHymns, setShuffle])

  return {
    handleShufflePress,
  }
}
