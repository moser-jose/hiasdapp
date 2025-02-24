import { FlatList, View } from 'react-native'
import HymnsItem from './HymnsItem'
import { Hymn, ListHymnsProps } from '@/types/hymnsTypes'
import { utilsStyles } from '@/styles'
import { Text } from 'react-native'
import ItemDivider from './ItemDivider'
import { useCallback } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { Track } from 'react-native-track-player'

export const ListHymns = ({ hymns, ...listHymnsProps }: ListHymnsProps) => {
  const { play } = usePlayerStore()
  const handleHymnSelect = useCallback(
    async (hymn: Track | Hymn) => {
      await play(hymn)
    },
    [play]
  )

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 16, paddingBottom: 128 }}
      ListFooterComponent={ItemDivider}
      data={hymns}
      ItemSeparatorComponent={ItemDivider}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No hymns found</Text>
        </View>
      }
      renderItem={({ item: hymn, index }) => (
        <HymnsItem
          id={hymn.id}
          key={index}
          hymn={hymn}
          onHymnSelect={handleHymnSelect}
        />
      )}
      {...listHymnsProps}
    />
  )
}
