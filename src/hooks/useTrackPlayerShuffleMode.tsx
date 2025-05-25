import { usePlayerStore } from '@/store/playerStore'
import { useStateStore } from '@/store/stateStore'
import { useCallback, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Hymn } from '@/types/hymnsTypes'
import { Track } from 'react-native-track-player'
import { useLibraryStore } from '@/store/library'
export const useTrackPlayerShuffleMode = () => {
  const { shuffle, setShuffle } = useStateStore(
    useShallow(state => ({
      shuffle: state.shuffle,
      setShuffle: state.setShuffle,
    }))
  )
  const hymns = useLibraryStore(useShallow(state => state.hymns))

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

  const { add, reset } = usePlayerStore(
    useShallow(state => ({
      add: state.add,
      reset: state.reset,
      skipTo: state.skipTo,
    }))
  )
  const queueOffset = useRef(0)

  /* const handleShufflePlay = async () => {
    const shuffledTracks = [...hymns]
    for (let i = shuffledTracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledTracks[i], shuffledTracks[j]] = [
        shuffledTracks[j],
        shuffledTracks[i],
      ]
    }
    setActiveHymns(shuffledTracks)
    await setQueue(shuffledTracks)
    await play()
    setActiveQueueId(id)
    if (shuffle === false) {
      setShuffle()
    }
  } */

  const offShuffle = async (
    currentActiveHymn: Track | Hymn | null,
    activeHymns: Track[] | Hymn[]
  ) => {
    const originalOrderHymns = [...activeHymns].sort((a, b) => {
      if (a.number && b.number) {
        return a.number - b.number
      }
      return 0
    })

    const activeHymnIndex = activeHymn
      ? originalOrderHymns.findIndex(hymn => hymn.id === activeHymn.id)
      : -1

    //console.log('originalOrderHymns', originalOrderHymns)
    let reorderedHymns = originalOrderHymns
    if (activeHymnIndex > -1) {
      const beforeActive = originalOrderHymns.slice(0, activeHymnIndex)
      const fromActive = originalOrderHymns.slice(activeHymnIndex)
      reorderedHymns = [...fromActive, ...beforeActive]
    }

    /* console.log('reorderedHymns', reorderedHymns)
    console.log('originalOrderHymns', originalOrderHymns)
    console.log('activeHymnIndex', activeHymnIndex)
    console.log('activeHymn', activeHymn) */
    //console.log('shuffle', shuffle)
    //setShuffle()

    // Manter o hymno ativo durante a operação
    if (currentActiveHymn) setActiveHymn(currentActiveHymn)

    await setQueue(reorderedHymns)
    setActiveHymns(reorderedHymns)
  }

  const onShuffle = async (
    currentActiveHymn: Track | Hymn | null,
    activeHymns: Track[] | Hymn[]
  ) => {
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

  const changingQueue = async (
    trackIndex: number,
    selectedTrack: Track | Hymn
  ) => {
    const beforeTracks = hymns.slice(0, trackIndex)
    const afterTracks = hymns.slice(trackIndex + 1)
    await reset()

    // we construct the new queue
    await add(selectedTrack)
    await add(afterTracks)
    await add(beforeTracks)

    //await play()

    queueOffset.current = trackIndex
    //setActiveQueueId(id as string)
  }

  const handleHymnSelect = async (selectedTrack: Track | Hymn) => {
    const trackIndex = hymns.findIndex(track => track.id === selectedTrack.id)

    if (trackIndex === -1) return

    await changingQueue(trackIndex, selectedTrack)

    /*  const isChangingQueue = id !== activeQueueId

    if (isChangingQueue) {
      
    } else {
      if (shuffle || !shuffle) {
        await changingQueue(trackIndex, selectedTrack)
        setShuffle()
      } else {
        const nextTrackIndex =
          trackIndex - queueOffset.current < 0
            ? hymns.length + trackIndex - queueOffset.current
            : trackIndex - queueOffset.current
        await skipTo(nextTrackIndex)
        play()
      }
    } */
  }

  const handleShufflePress = useCallback(async () => {
    try {
      const currentActiveHymn = activeHymn

      if (!shuffle && !activeHymns?.length) {
        //Shuffle ligado e não tem hinos  shuffle na fila
        onShuffle(currentActiveHymn, hymns)
      } else if (shuffle && !activeHymns?.length) {
        //Shuffle desligado e não tem hinos  shuffle na fila
        await handleHymnSelect(activeHymn as Hymn)
      } else if (!shuffle && activeHymns?.length) {
        //Shuffle ligado e tem hinos  shuffle na fila

        onShuffle(currentActiveHymn, activeHymns)
      } else if (shuffle && activeHymns?.length) {
        //Shuffle desligado e tem hinos  shuffle na fila
        offShuffle(currentActiveHymn, activeHymns)
      }

      setShuffle()
    } catch (error) {
      console.error('Error toggling shuffle mode:', error)
    }
  }, [
    shuffle,
    activeHymn,
    activeHymns,
    setShuffle,
    hymns,
    onShuffle,
    offShuffle,
  ])

  return {
    handleShufflePress,
  }
}
