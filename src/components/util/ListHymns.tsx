/* eslint-disable react/prop-types */
import { ActivityIndicator, FlatList, View, Text } from 'react-native'
import HymnsItem from './HymnsItem'
import { Hymn, ListHymnsProps } from '@/types/hymnsTypes'
import ItemDivider from './ItemDivider'
import { memo, useCallback, useEffect, useState } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { Track } from 'react-native-track-player'
import { useShallow } from 'zustand/react/shallow'

const TAMANHO_PAGINA = 20
function ListHymns({ hymns, ...listHymnsProps }: ListHymnsProps) {
  const [displayedHymns, setDisplayedHymns] = useState<Hymn[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [allLoaded, setAllLoaded] = useState(false)

  const play = usePlayerStore(useShallow(state => state.play))

  const handleHymnSelect = useCallback(
    async (hymn: Track | Hymn) => {
      await play(hymn)
    },
    [play]
  )
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
    }, 500)
  }, [hymns, displayedHymns, isLoading, allLoaded])

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

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 16, paddingBottom: 128 }}
      data={displayedHymns}
      ItemSeparatorComponent={ItemDivider}
      keyExtractor={(hymn, index) => `hymn-${hymn.id}-${hymn.number}-${index}`}
      renderItem={({ item: hymn }: { item: Hymn }) => (
        <HymnsItem id={hymn.id} hymn={hymn} onHymnSelect={handleHymnSelect} />
      )}
      contentInsetAdjustmentBehavior="automatic"
      removeClippedSubviews={true}
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
