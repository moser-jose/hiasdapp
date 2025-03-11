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

  const { activeHymn, activeHymns, setQueue, setActiveHymns } = usePlayerStore(
    useShallow(state => ({
      activeHymn: state.activeHymn,
      activeHymns: state.activeHymns,
      setQueue: state.setQueue,
      setActiveHymns: state.setActiveHymns,
    }))
  )

  const handleShufflePress = useCallback(async () => {
    try {
      if (shuffle && activeHymns) {
        const originalOrderHymns = [...activeHymns].sort((a, b) => {
          if (a.number && b.number) {
            return a.number - b.number
          }
          return 0
        })

        const activeHymnIndex = activeHymn
          ? originalOrderHymns.findIndex(hymn => hymn.id === activeHymn.id)
          : -1

        let reorderedHymns = originalOrderHymns
        if (activeHymnIndex > -1) {
          const beforeActive = originalOrderHymns.slice(0, activeHymnIndex)
          const fromActive = originalOrderHymns.slice(activeHymnIndex)
          reorderedHymns = [...fromActive, ...beforeActive]
        }

        await setQueue(reorderedHymns)
        setActiveHymns(reorderedHymns)
      } else if (!shuffle && activeHymns) {
        const shuffledTracks = [...activeHymns].sort(() => Math.random() - 0.5)

        await setQueue(shuffledTracks)
        setActiveHymns(shuffledTracks)
      }

      setShuffle()
    } catch (error) {
      console.error('Error toggling shuffle mode:', error)
    }
  }, [shuffle, activeHymn, activeHymns, setQueue, setActiveHymns, setShuffle])

  return {
    handleShufflePress,
  }
}
