import { FlatList, FlatListProps } from 'react-native'
import { Hymn } from '@/types/hymnsTypes'
import { Track } from 'react-native-track-player'
import HymnsCard from './HymnsCard'
import { useCallback, memo } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { useShallow } from 'zustand/react/shallow'

interface ListHymnsCardProps extends Partial<FlatListProps<Hymn>> {
  hymns: Hymn[]
  handleHymnSelect: (hymn: Track) => void
}

// Memoize the HymnsCard component render
const MemoizedHymnsCard = memo(HymnsCard)

export const ListHymnsCard = ({ hymns, ...props }: ListHymnsCardProps) => {
  const play = usePlayerStore(useShallow(state => state.play))

  const handleHymnSelect = useCallback(
    async (hymn: Track | Hymn) => {
      await play(hymn)
    },
    [play]
  )

  // Memoize the renderItem function
  const renderItem = useCallback(
    ({ item: hymn, index }: { item: Hymn; index: number }) => (
      <MemoizedHymnsCard
        id={hymn.id}
        hymn={hymn}
        onHymnSelect={() => handleHymnSelect(hymn)}
        style={{
          marginLeft: index === 0 ? 16 : 16,
          marginRight: index === hymns.length - 1 ? 16 : 0,
        }}
      />
    ),
    [hymns.length, handleHymnSelect]
  )

  // Memoize the keyExtractor
  const keyExtractor = useCallback(
    (item: Hymn, index: number) => `hymnscard-${item.id}-${index}`,
    []
  )

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      initialNumToRender={10}
      removeClippedSubviews={true}
      keyExtractor={keyExtractor}
      data={hymns}
      renderItem={renderItem}
      {...props}
    />
  )
}

// Memoize the entire ListHymnsCard component
export default memo(ListHymnsCard)
