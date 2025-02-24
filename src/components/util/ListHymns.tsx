import { FlatList, View } from 'react-native'
import HymnsItem from './HymnsItem'
import { Hymn, ListHymnsProps } from '@/types/hymnsTypes'
import { utilsStyles } from '@/styles'
import { Text } from 'react-native'
import ItemDivider from './ItemDivider'
import { useCallback, useMemo } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { Track } from 'react-native-track-player'
import { useShallow } from 'zustand/react/shallow'

export const ListHymns = ({ hymns, ...listHymnsProps }: ListHymnsProps) => {
  const play = usePlayerStore(useShallow(state => state.play))

  const handleHymnSelect = useCallback(
    async (hymn: Track | Hymn) => {
      await play(hymn)
    },
    [play]
  )

  const renderItem = useCallback(
    ({ item: hymn, index }: { item: Hymn; index: number }) => (
      <HymnsItem
        id={hymn.id}
        key={index}
        hymn={hymn}
        onHymnSelect={handleHymnSelect}
      />
    ),
    [handleHymnSelect]
  )

  const keyExtractor = useCallback((item: Hymn) => item.id.toString(), [])

  const ListEmptyComponent = useMemo(
    () => (
      <View>
        <Text style={utilsStyles.emptyContentText}>No hymns found</Text>
      </View>
    ),
    []
  )

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 16, paddingBottom: 128 }}
      ListFooterComponent={ItemDivider}
      data={hymns}
      ItemSeparatorComponent={ItemDivider}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      keyExtractor={keyExtractor}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={renderItem}
      updateCellsBatchingPeriod={30}
      {...listHymnsProps}
    />
  )
}
