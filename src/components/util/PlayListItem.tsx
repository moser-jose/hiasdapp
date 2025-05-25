import React from 'react'
import { Playlist } from '@/types/hymnsTypes'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import SongSVG from '@/components/svg/SongSvg'
import { colors, fontFamily } from '@/constants/styles'
import { router } from 'expo-router'
type PlayListItemProps = {
  id: number
  playlist: Playlist
  onPress?: () => void
}

const PlayListItem = ({ playlist }: PlayListItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: `/playlistHymns`,
          params: {
            id: playlist.id,
            name: playlist.name,
            hymnsId: playlist.hymns,
          },
        })
      }
    >
      <View style={styles.iconContainer}>
        <SongSVG width={24} height={24} color={colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{playlist.name}</Text>
        {playlist.description && (
          <Text style={styles.description} numberOfLines={1}>
            {playlist.description}
          </Text>
        )}
        <Text style={styles.itemCount}>
          {playlist.hymns?.length || 0} hinos
        </Text>
      </View>
      <View style={styles.chevronContainer}>
        <Text style={styles.chevron}>›</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(87, 86, 86, 0.14)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3436',
    fontFamily: fontFamily.plusJakarta.bold,
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
    fontFamily: fontFamily.plusJakarta.regular,
  },
  itemCount: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
    fontFamily: fontFamily.plusJakarta.regular,
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    fontSize: 22,
    color: colors.textMuted,
  },
})

export default PlayListItem
