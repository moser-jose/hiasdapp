import { colors, fontFamily, fontSize } from '@/constants/styles'
import { defaultStyles } from '@/styles'
import {
  ViewProps,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native'
import { useActiveTrack } from 'react-native-track-player'
import {
  PlayPauseButton,
  SkipToNextButton,
} from '@/components/util/PlayerControls'
import Authors from './Authors'
import { useLastActiveHymn } from '@/hooks/useLastActiveHymn'
import { MovingText } from './MovingText'
import { router } from 'expo-router'

const FloatingPlayer = ({ style }: ViewProps) => {
  const activeHymn = useActiveTrack()
  const lastActiveHymn = useLastActiveHymn()

  const displayedHymn = activeHymn ?? lastActiveHymn
  if (!displayedHymn) return null

  const handlePress = () => {
    router.navigate('/player')
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      style={[styles.container, style]}
    >
      <View>
        <Text style={styles.hymnTitle}>{displayedHymn.numberView}</Text>
      </View>
      <View style={styles.hymnTitleContainer}>
        <MovingText
          style={styles.hymnTitle}
          text={displayedHymn.title ?? ''}
          animationThreshold={25}
        />
        {displayedHymn.englishTitle && (
          <Text style={styles.hymnTitleBase}>{displayedHymn.englishTitle}</Text>
        )}

        <Authors
          style={styles.authors}
          authors={displayedHymn.authors}
          card={false}
        />
      </View>
      <View style={styles.hymnControlsContainer}>
        <PlayPauseButton height={30} width={30} />
        <SkipToNextButton height={22} width={22} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  authors: {
    color: colors.textMuted,
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.xs,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingVertical: 14,
  },
  hymnControlsContainer: {
    alignItems: 'center',
    columnGap: 20,
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
  },
  hymnTitle: {
    ...defaultStyles.text,
    color: '#FFFFFF',
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: 18,
  },
  hymnTitleBase: {
    color: colors.textMuted,
    flex: 1,
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.xs,
    width: '100%',
  },
  hymnTitleContainer: {
    flex: 1,
    marginLeft: 10,
    overflow: 'hidden',
  },
  /* trackArtworkImage: {
    backgroundColor: colors.green,
    borderRadius: 8,
    height: 40,
    width: 40,
  }, */
})

export default FloatingPlayer
