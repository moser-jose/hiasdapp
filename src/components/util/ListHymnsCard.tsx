import { FlatList, FlatListProps } from 'react-native'
import { Hymn, HymnTrack, HymnsProps } from '@/types/hymnsTypes'
import TrackPlayer, { Track, useIsPlaying } from 'react-native-track-player'
import HymnsCard from './HymnsCard'

interface ListHymnsCardProps extends Partial<FlatListProps<Hymn>> {
  hymns: Hymn[]
  handleHymnSelect: (hymn: Track) => void
}

export const ListHymnsCard = ({ hymns, ...props }: ListHymnsCardProps) => {
  const { playing } = useIsPlaying()

  const handleHymnSelectInternal: HymnsProps['onHymnSelect'] = async (hymn: HymnTrack) => {
    await TrackPlayer.load(hymn)
    if (playing) await TrackPlayer.pause()
    else await TrackPlayer.play()
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={hymns}
      renderItem={({ item: hymn, index }) => (
        <HymnsCard
          hymn={hymn}
          onHymnSelect={handleHymnSelectInternal}
          style={{
            marginLeft: index === 0 ? 16 : 16,
            marginRight: index === hymns.length - 1 ? 16 : 0,
          }}
        />
      )}
      {...props}
    />
  )
}
