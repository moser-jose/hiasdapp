/* eslint-disable react/prop-types */
import { ActivityIndicator, FlatList, View, Text } from 'react-native'
import HymnsItem from './HymnsItem'
import { Hymn, ListHymnsProps } from '@/types/hymnsTypes'
import ItemDivider from './ItemDivider'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePlayerStore, useQueue } from '@/store/playerStore'
import TrackPlayer, { Track } from 'react-native-track-player'
import { useShallow } from 'zustand/react/shallow'
import Hymns from '@/app/(tabs)/(hymns)'
import HymnsCard from './HymnsCard'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { ListHymnsFilter } from '@/helpers/filter'

const TAMANHO_PAGINA = 20
function ListHymns({
  hymns,
  id,
  horizontal = false,
  ...listHymnsProps
}: ListHymnsProps) {
  const [displayedHymns, setDisplayedHymns] = useState<Hymn[] | Track[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [allLoaded, setAllLoaded] = useState(false)

  const activeHymn = usePlayerStore(state => state.activeHymn)

  const play = usePlayerStore(state => state.play)

  const { skipTo, add, reset } = usePlayerStore(
    useShallow(state => ({
      add: state.add,
      reset: state.reset,
      skipTo: state.skipTo,
    }))
  )
  const queueOffset = useRef(0)
  const { activeQueueId, setActiveQueueId } = useQueue()

  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Busque hinos pelo número, titulo, autor, estrofe',
    },
  })

  const handleHymnSelectr = useCallback(
    async (hymn: Track | Hymn) => {
      await play(hymn)
    },
    [play]
  )

  /* const handleHymnSelect = useCallback(
    async (selectedHymn: Track | Hymn) => {
      const hymnIndex = hymns.findIndex(hymn => hymn.id === selectedHymn.id)

      if (hymnIndex === -1) return

      const isChangingQueue = queueId !== activeQueueId

      if (isChangingQueue) {
        const beforeHymns = hymns.slice(0, hymnIndex)
        const afterHymns = hymns.slice(hymnIndex + 1)
        await TrackPlayer.reset()
        await TrackPlayer.add(beforeHymns)
        await TrackPlayer.add(afterHymns)
        await TrackPlayer.add(beforeHymns)

        await play()

        queueOffset.current = hymnIndex
        setActiveQueueId(queueId as string)
      } else {
        const nextHymnIndex =
          hymnIndex - queueOffset.current < 0
            ? hymns.length + hymnIndex - queueOffset.current
            : hymnIndex - queueOffset.current
        await TrackPlayer.skip(nextHymnIndex)
        await play()
      }
    },
    [activeQueueId, hymns, play, queueId, setActiveQueueId]
  ) */

  useEffect(() => {
    if (hymns.length > 0) {
      setDisplayedHymns(hymns.slice(0, TAMANHO_PAGINA))
      setAllLoaded(hymns.length <= TAMANHO_PAGINA)
    } else {
      setDisplayedHymns([])
      setAllLoaded(true)
    }
  }, [hymns])

  const loadMoreHymns = useCallback(() => {
    if (isLoading || allLoaded) return

    setIsLoading(true)
    setTimeout(() => {
      const nextItems = hymns.slice(
        displayedHymns.length,
        displayedHymns.length + TAMANHO_PAGINA
      )
      if (nextItems.length > 0) {
        setDisplayedHymns(prev => [...prev, ...nextItems])
        setPage(prev => prev + 1)
      }
      if (displayedHymns.length + nextItems.length >= hymns.length) {
        setAllLoaded(true)
      }
      setIsLoading(false)
    }, 100)
  }, [hymns, displayedHymns, isLoading, allLoaded])

  const filteredSearch: Hymn[] | Track[] = useMemo(() => {
    if (!search) return displayedHymns as Hymn[]
    const filterPredicate = ListHymnsFilter(search)
    return displayedHymns.filter(filterPredicate)
  }, [displayedHymns, search])

  const renderFooter = () => {
    if (hymns.length === 0) {
      return (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <Text>No hymns found</Text>
        </View>
      )
    }

    if (!isLoading) return null

    return (
      <View style={{ padding: 16, alignItems: 'center' }}>
        <ActivityIndicator size="small" />
      </View>
    )
  }

  const handleHymnSelect = async (selectedTrack: Track | Hymn) => {
    const trackIndex = hymns.findIndex(track => track.id === selectedTrack.id)

    if (trackIndex === -1) return

    const isChangingQueue = id !== activeQueueId
    console.log(id)
    if (isChangingQueue) {
      const beforeTracks = hymns.slice(0, trackIndex)
      const afterTracks = hymns.slice(trackIndex + 1)
      await reset()

      // we construct the new queue
      await add(selectedTrack)
      await add(afterTracks)
      await add(beforeTracks)

      await play()

      queueOffset.current = trackIndex
      setActiveQueueId(id as string)
    } else {
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? hymns.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current
      console.log(nextTrackIndex)
      await skipTo(nextTrackIndex)
      play()
    }
  }

  const renderItem = ({ item: hymn, index }: { item: Hymn; index: number }) => {
    if (horizontal === false) {
      return (
        <HymnsItem id={hymn.id} hymn={hymn} onHymnSelect={handleHymnSelect} />
      )
    } else {
      return (
        <HymnsCard
          style={{
            marginLeft: index === 0 ? 16 : 16,
            marginRight: index === hymns.length - 1 ? 16 : 0,
          }}
          id={hymn.id}
          hymn={hymn}
          onHymnSelect={handleHymnSelect}
        />
      )
    }
  }

  return (
    <FlatList
      horizontal={horizontal}
      contentContainerStyle={
        horizontal === false
          ? { paddingTop: 16, paddingBottom: 128 }
          : { paddingTop: 0, paddingBottom: 0 }
      }
      data={filteredSearch}
      ItemSeparatorComponent={horizontal ? null : ItemDivider}
      keyExtractor={(item, index) => `hymn-${item.id}-${item.number}-${index}`}
      renderItem={renderItem}
      contentInsetAdjustmentBehavior="automatic"
      removeClippedSubviews={true}
      showsHorizontalScrollIndicator={false}
      onEndReached={loadMoreHymns}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      windowSize={10}
      {...listHymnsProps}
    />
  )
}

export default memo(ListHymns)
