/* eslint-disable react/prop-types */

import { ListPlaylistsProps, Playlist } from '@/types/hymnsTypes'
import { memo } from 'react'
import { FlatList } from 'react-native'

import ItemDivider from './ItemDivider'
import PlaylistCard from './PlaylistCard'
import { useLibraryStore } from '@/store/library'
import PlayListItem from './PlayListItem'
import { useShallow } from 'zustand/react/shallow'

function ListPlayLists({
  horizontal = false,
  ...listHymnsProps
}: ListPlaylistsProps) {
  const { favorites, playlists } = useLibraryStore(
    useShallow(state => ({
      favorites: state.favorites,
      playlists: state.playlists,
    }))
  )

  const dataPlaylists = () => {
    const newPlaylists = playlists.map(item => {
      return {
        id: item.id,
        name: item.name,
        hymns: item.hymns.map(hymn => hymn),
      }
    })
    if (favorites.length) {
      const array: number[] = []
      favorites.map(favorite => array.push(favorite.id))

      const dataFavorites = {
        id: 100,
        name: 'Favoritos',
        hymns: array,
      }

      return [dataFavorites, ...newPlaylists]
    }
    return newPlaylists
  }

  const renderItem = ({
    item: list,
    index,
  }: {
    item: Playlist
    index: number
  }) => {
    if (horizontal === false) {
      return <PlayListItem id={list.id} playlist={list} />
    } else {
      return (
        <PlaylistCard
          style={{
            marginLeft: index === 0 ? 16 : 16,
            marginRight: index === dataPlaylists.length - 1 ? 16 : 0,
          }}
          playlist={list}
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
      data={dataPlaylists()}
      ItemSeparatorComponent={horizontal ? null : ItemDivider}
      keyExtractor={(item, index) => `playlist-${item.id}-${index}`}
      renderItem={renderItem}
      contentInsetAdjustmentBehavior="automatic"
      removeClippedSubviews={true}
      showsHorizontalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      windowSize={10}
      {...listHymnsProps}
    />
  )
}

export default memo(ListPlayLists)
