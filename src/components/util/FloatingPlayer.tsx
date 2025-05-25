import {
  PlayPauseButton,
  SkipToNextButton,
} from '@/components/util/PlayerControls'
import { colors, fontFamily, fontSize } from '@/constants/styles'
import { usePlayerStore } from '@/store/playerStore'
import { defaultStyles } from '@/styles'
import { router } from 'expo-router'
import { memo, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native'
import { useShallow } from 'zustand/react/shallow'
import Authors from './Authors'
import { MovingText } from './MovingText'

const FloatingPlayer = ({ style }: ViewProps) => {
  const { width } = useWindowDimensions()
  /* const { shuffle, setShuffle } = useStateStore(
    useShallow(state => ({
      shuffle: state.shuffle,
      setShuffle: state.setShuffle,
    }))
  )

  console.log('shuffle', shuffle) */

  // Responsive adjustments
  const responsivePadding = width * 0.04
  const responsiveFontSize = width * 0.045
  const responsiveControlSize = width * 0.1

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

  const styles = StyleSheet.create({
    authors: {
      color: colors.textMuted,
      fontFamily: fontFamily.plusJakarta.regular,
      fontSize: fontSize.xs,
    },
    container: {
      alignItems: 'center',
      backgroundColor: colors.primary,
      flexDirection: 'row',
      paddingLeft: responsivePadding,
      paddingVertical: responsivePadding * 0.9,
      zIndex: 1000,
    },
    hymnControlsContainer: {
      alignItems: 'center',
      columnGap: responsivePadding,
      flexDirection: 'row',
      marginLeft: responsivePadding,
      marginRight: responsivePadding,
    },
    hymnTitle: {
      ...defaultStyles.text,
      color: '#FFFFFF',
      fontFamily: fontFamily.plusJakarta.bold,
      fontSize: responsiveFontSize,
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
  })

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

        <Authors
          style={styles.authors}
          authors={Object.values(displayedHymn.authors)}
          card={false}
        />
      </View>
      <View style={styles.hymnControlsContainer}>
        <PlayPauseButton
          id={displayedHymn?.id as number}
          height={responsiveControlSize}
          width={responsiveControlSize}
        />
        <SkipToNextButton
          height={responsiveControlSize * 0.6}
          width={responsiveControlSize * 0.6}
        />
      </View>
    </TouchableOpacity>
  )
}

export default memo(FloatingPlayer)
