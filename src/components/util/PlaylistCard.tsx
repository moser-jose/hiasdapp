import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { colors, fontFamily, fontSize } from '@/constants/styles'
import { truncateTextWords } from '@/helpers/textsWords'
import { StyleSheet } from 'react-native'
import SongSVG from '../svg/SongSvg'
import { Playlist } from '@/types/hymnsTypes'
import { router } from 'expo-router'

interface PlaylistCardProps {
  playlist: Playlist
  style?: StyleProp<ViewStyle>
}

const PlaylistCard = ({ playlist, style }: PlaylistCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.replace({
          pathname: '/(tabs)/(playlists)/playlistHymns',
          params: {
            hymnsId: playlist.hymns,
            name: playlist.name,
          },
        })
      }}
      activeOpacity={0.8}
      style={[styles.container, style]}
    >
      <View style={styles.icon}>
        <SongSVG height={18} width={18} color={colors.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{truncateTextWords(playlist.name, 3)}</Text>
        <Text style={styles.hymns}>{playlist.hymns.length}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(87, 86, 86, 0.12)',
    borderRadius: 14,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    marginRight: 20,
    padding: 10,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  hymns: {
    backgroundColor: colors.greenRGBA,
    borderRadius: 8,
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.xs,
    paddingHorizontal: 8,
    paddingVertical: 1,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: 'rgba(87, 86, 86, 0.14)',
    borderRadius: 8,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  title: {
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.sm,
  },
})

export default PlaylistCard
