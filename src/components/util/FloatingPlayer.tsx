import { colors, fontFamily, fontSize } from '@/constants/styles'
import { defaultStyles } from '@/styles'
import {
  ViewProps,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native'
import {
  PlayPauseButton,
  SkipToNextButton,
} from '@/components/util/PlayerControls'
import Authors from './Authors'
import { MovingText } from './MovingText'
import { router } from 'expo-router'
import { memo, useCallback } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { useShallow } from 'zustand/react/shallow'

const FloatingPlayer = ({ style }: ViewProps) => {
  const activeHymn = usePlayerStore(useShallow(state => state.activeHymn))
  const lastActiveHymn = usePlayerStore(
    useShallow(state => state.lastActiveHymn)
  )

  const handlePress = useCallback(() => {
    try {
      router.push('/player')
    } catch (error) {
      console.error('Erro ao navegar para /player:', error)
    }
  }, [])

  const displayedHymn = activeHymn ?? lastActiveHymn
  if (!displayedHymn) return null

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
          authors={Object.values(displayedHymn.authors)}
          card={false}
        />
      </View>
      <View style={styles.hymnControlsContainer}>
        <PlayPauseButton
          id={displayedHymn?.id as number}
          height={38}
          width={38}
        />
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
    borderRadius: 30,
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
    alignItems: 'flex-start',
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

export default memo(FloatingPlayer)
