import { FlatList } from 'react-native'
import { ListPlaylistsProps, Playlist } from '@/types/hymnsTypes'

import PlaylistCard from './PlaylistCard'
import { useEffect, useState } from 'react'
import { usePlaylist } from '@/hooks/usePlaylist'
import { useFavorites } from '@/store/library'
import { isArrayBindingPattern } from 'typescript'

export const ListPlaylistsCard = ({
  data,
  ...listHymnsProps
}: ListPlaylistsProps) => {
  return (
    <PlaylistCard
      playlist={data as unknown as Playlist}
      style={index === 0 && { marginLeft: 16 }}
      {...listHymnsProps}
    />
  )
}
