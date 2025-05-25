import { ListPlaylistsProps, Playlist } from '@/types/hymnsTypes'

import PlaylistCard from './PlaylistCard'

export const ListPlaylistsCard = ({
  data,
  ...listHymnsProps
}: ListPlaylistsProps) => {
  return (
    <PlaylistCard
      playlist={data as unknown as Playlist}
      style={{ marginLeft: 116 }}
      {...listHymnsProps}
    />
  )
}
