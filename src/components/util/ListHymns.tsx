import { ListHymnsFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { usePlayerStore } from '@/store/playerStore'
import { useStateStore } from '@/store/stateStore'
import { Hymn, ListHymnsProps } from '@/types/hymnsTypes'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from 'react-native'
import { Track } from 'react-native-track-player'
import { useShallow } from 'zustand/react/shallow'
import HymnsCard from './HymnsCard'
import HymnsItem from './HymnsItem'
import ItemDivider from './ItemDivider'
import { ListHeaderComponent } from './ListHeaderComponent'

const TAMANHO_PAGINA = 20
function ListHymns({
  hymns,
  id,
  horizontal = false,
  ...listHymnsProps
}: ListHymnsProps) {
  const [displayedHymns, setDisplayedHymns] = useState<Hymn[] | Track[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [allLoaded, setAllLoaded] = useState(false)

  const { shuffle, setShuffle } = useStateStore(
    useShallow(state => ({
      shuffle: state.shuffle,
      setShuffle: state.setShuffle,
    }))
  )

  const { skipTo, add, reset, play, activeQueueId, setActiveQueueId } =
    usePlayerStore(
      useShallow(state => ({
        add: state.add,
        reset: state.reset,
        skipTo: state.skipTo,
        play: state.play,
        activeQueueId: state.activeQueueId,
        setActiveQueueId: state.setActiveQueueId,
      }))
    )
  const queueOffset = useRef(0)

  const [searchValue] = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Busque hinos pelo número, titulo, autor, estrofe',
    },
  })

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
      }
      if (displayedHymns.length + nextItems.length >= hymns.length) {
        setAllLoaded(true)
      }
      setIsLoading(false)
    }, 100)
  }, [hymns, displayedHymns, isLoading, allLoaded])

  const filteredSearch: Hymn[] | Track[] = useMemo(() => {
    if (!searchValue) return displayedHymns as Hymn[]
    return hymns.filter(ListHymnsFilter(searchValue))
  }, [displayedHymns, hymns, searchValue])

  const renderFooter = () => {
    if (hymns.length === 0) {
      return (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <Text>Não foram encontrados hinos</Text>
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
  const changingQueue = async (
    trackIndex: number,
    selectedTrack: Track | Hymn
  ) => {
    const beforeTracks = hymns.slice(0, trackIndex)
    const afterTracks = hymns.slice(trackIndex + 1)
    await reset()

    await add(selectedTrack)
    await add(afterTracks)
    await add(beforeTracks)

    await play()

    queueOffset.current = trackIndex
    setActiveQueueId(id as string)
  }

  const handleHymnSelect = async (selectedTrack: Track | Hymn) => {
    const trackIndex = hymns.findIndex(track => track.id === selectedTrack.id)

    if (trackIndex === -1) return

    const isChangingQueue = id !== activeQueueId

    if (isChangingQueue) {
      await changingQueue(trackIndex, selectedTrack)
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
      ListHeaderComponent={
        !horizontal ? (
          <ListHeaderComponent id={id as string} hymns={hymns} />
        ) : null
      }
      contentContainerStyle={
        horizontal === false
          ? { paddingTop: 16, paddingBottom: 128 }
          : { paddingTop: 0, paddingBottom: 0 }
      }
      data={filteredSearch}
      ItemSeparatorComponent={horizontal ? null : ItemDivider}
      keyExtractor={(item, index) => `hymn-${item.id}-${item.number}-${index}`}
      renderItem={renderItem as ListRenderItem<Track | Hymn>}
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
