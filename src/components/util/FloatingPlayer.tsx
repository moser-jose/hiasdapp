import { colors } from '@/constants/styles'
import { defaultStyles } from '@/styles'
import { ViewProps, TouchableOpacity, View, StyleSheet, Text } from 'react-native'
import { useActiveTrack } from 'react-native-track-player'
import { PlayPauseButton, SkipToNextButton } from '@/components/util/PlayerControls'
import Authors from './Authors'
import { useLastActiveHymn } from '@/hooks/useLastActiveHymn'
import { MovingText } from './MovingText'

const FloatingPlayer = ({ style }: ViewProps) => {
  const activeHymn = useActiveTrack()
  const lastActiveHymn = useLastActiveHymn()

  const displayedHymn = activeHymn ?? lastActiveHymn
  if (!displayedHymn) return null

  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.container, style]}>
      {/* <FastImage
					source={{
						uri: logoApp,
					}}
					style={styles.trackArtworkImage}
				/> */}
      <View>
        <Text style={styles.hymnTitle}>{displayedHymn.numberView}</Text>
      </View>
      <View style={styles.hymnTitleContainer}>
        <MovingText style={styles.hymnTitle} text={displayedHymn.title} animationThreshold={25} />
        <Text style={styles.hymnTitleBase}>{displayedHymn.englishTitle}</Text>
        <Authors authors={displayedHymn.authors} card={false} />
      </View>
      <View style={styles.hymnControlsContainer}>
        <PlayPauseButton />
        <SkipToNextButton />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: '600',
  },
  hymnTitleBase: {
    color: colors.textMuted,
    flex: 1,
    fontSize: 12,
    width: '100%',
  },
  hymnTitleContainer: {
    flex: 1,
    marginLeft: 10,
    overflow: 'hidden',
  },
  trackArtworkImage: {
    backgroundColor: colors.favorites,
    borderRadius: 8,
    height: 40,
    width: 40,
  },
})

export default FloatingPlayer
