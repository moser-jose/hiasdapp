import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { truncateTextWords } from '@/helpers/textsWords'
import { StyleSheet } from 'react-native'
import SongSVG from '../svg/SongSvg'
import { colors, fontSize } from '@/constants/styles'
type dat = {
  title: string
  hymns: number
}

interface PlaylistCardProps {
  playlist: dat
  style?: StyleProp<ViewStyle>
}

const PlaylistCard = ({ playlist, style }: PlaylistCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.container, style]}>
      <View style={styles.icon}>
        <SongSVG color={colors.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{truncateTextWords(playlist.title, 3)}</Text>
        <Text style={styles.hymns}>{playlist.hymns}</Text>
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
    borderRadius: 6,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: fontSize.smB,
    padding: 6,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: 'rgba(87, 86, 86, 0.14)',
    borderRadius: 8,
    height: 45,
    justifyContent: 'center',
    width: 45,
  },
  title: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: fontSize.base,
  },
})

export default PlaylistCard
