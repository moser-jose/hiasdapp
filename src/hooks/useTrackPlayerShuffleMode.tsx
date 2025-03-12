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

  const { activeHymn, activeHymns, setQueue, setActiveHymns, setActiveHymn } =
    usePlayerStore(
      useShallow(state => ({
        activeHymn: state.activeHymn,
        activeHymns: state.activeHymns,
        setQueue: state.setQueue,
        setActiveHymns: state.setActiveHymns,
        setActiveHymn: state.setActiveHymn,
      }))
    )

  const handleShufflePress = useCallback(async () => {
    try {
      const currentActiveHymn = activeHymn

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

        // Manter o hymno ativo durante a operação
        if (currentActiveHymn) setActiveHymn(currentActiveHymn)

        await setQueue(reorderedHymns)
        setActiveHymns(reorderedHymns)
      } else if (!shuffle && activeHymns) {
        const shuffledTracks = [...activeHymns]
        for (let i = shuffledTracks.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[shuffledTracks[i], shuffledTracks[j]] = [
            shuffledTracks[j],
            shuffledTracks[i],
          ]
        }

        // Manter o hymno ativo durante a operação
        if (currentActiveHymn) setActiveHymn(currentActiveHymn)

        await setQueue(shuffledTracks)
        setActiveHymns(shuffledTracks)
      }

      setShuffle()
    } catch (error) {
      console.error('Error toggling shuffle mode:', error)
    }
  }, [
    shuffle,
    activeHymn,
    activeHymns,
    setQueue,
    setActiveHymns,
    setShuffle,
    setActiveHymn,
  ])

  return {
    handleShufflePress,
  }
}
