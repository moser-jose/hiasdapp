import { PlayerProgressBar } from '@/components/svg/PlayerProgressbar'
import Authors from '@/components/util/Authors'
import LyricsInPlayer from '@/components/util/LyricsInPlayer'
import { MovingText } from '@/components/util/MovingText'
import { PlayerControls } from '@/components/util/PlayerControls'
import { PlayerVolumeBar } from '@/components/util/PlayerVolumeBar'
import ToogleFavorites from '@/components/util/ToogleFavorites'
import ToogleLyricInPlayer from '@/components/util/ToogleLyricInPlayer'
import TooglePlayListInPlayer from '@/components/util/TooglePlayListInPlayer'
import { logoApp } from '@/constants/images'
import { colors, fontFamily, fontSize } from '@/constants/styles'
import { usePlayerBackground } from '@/hooks/usePlayerBackground'
import { usePlayerStore } from '@/store/playerStore'
import { useStateStore } from '@/store/stateStore'
import { defaultStyles } from '@/styles'
import { memo, useEffect, useRef } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useShallow } from 'zustand/react/shallow'
const PlayerArtwork = memo(
  ({
    artwork,
    top,
    bottom,
  }: {
    artwork: string
    top: number
    bottom: number
  }) => {
    const viewLyric = useStateStore(useShallow(state => state.viewLyric))
    const viewPlayList = useStateStore(useShallow(state => state.viewPlaylist))
    if (viewLyric || viewPlayList) return null
    return (
      <View
        style={{
          alignSelf: 'center',
          flex: 1,
          marginTop: top + 70,
          marginBottom: bottom,
        }}
      >
        <View style={styles.artworkImageContainer}>
          <FastImage
            source={{
              uri: artwork,
              priority: FastImage.priority.high,
            }}
            resizeMode="cover"
            style={styles.artworkImage}
          />
        </View>
      </View>
    )
  }
)
const DismissPlayerSimbol = memo(() => {
  const { top } = useSafeAreaInsets()
  return (
    <View
      style={{
        position: 'absolute',
        top: top + 8,
        right: 0,
        left: 0,
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      <View
        accessible={false}
        style={{
          width: 50,
          height: 8,
          backgroundColor: 'white',
          borderRadius: 8,
          opacity: 0.7,
        }}
      />
    </View>
  )
})

const PlayerScreen = () => {
  const activeHymn = usePlayerStore(useShallow(state => state.activeHymn))
  const { background } = usePlayerBackground(logoApp)
  const { top, bottom } = useSafeAreaInsets()
  const prevActiveHymnRef = useRef(activeHymn)

  const shuffle = useStateStore(useShallow(state => state.shuffle))

  useEffect(() => {
    if (activeHymn) {
      prevActiveHymnRef.current = activeHymn
    }
  }, [activeHymn])

  const displayHymn = activeHymn || prevActiveHymnRef.current

  if (!displayHymn) {
    return (
      <View style={[defaultStyles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator color={colors.icon} />
      </View>
    )
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={
        background
          ? [background.background, background.primary]
          : [colors.background]
      }
    >
      <View style={styles.overlayContainer}>
        <DismissPlayerSimbol />
        <PlayerArtwork artwork={logoApp} top={top} bottom={bottom} />
        <LyricsInPlayer lyrics={displayHymn?.lyrics} />
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 'auto' }}>
            <View /* style={{ height: 70 }} */>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View style={styles.trackTitleContainer}>
                  <Text style={styles.trackNumberView}>
                    {displayHymn.numberView}
                  </Text>
                  <View style={styles.trackTitleContainerView}>
                    <View style={{ maxWidth: '65%', overflow: 'hidden' }}>
                      <MovingText
                        text={displayHymn.title ?? ''}
                        animationThreshold={23}
                        style={styles.trackTitleText}
                      />
                    </View>

                    <View style={{ paddingHorizontal: 6 }}>
                      <ToogleFavorites id={displayHymn.id as number} />
                    </View>
                  </View>

                  {displayHymn.englishTitle && (
                    <Text style={styles.trackEnglishTitle}>
                      {displayHymn.englishTitle}
                    </Text>
                  )}
                  <Authors
                    style={styles.authors}
                    authors={Object.values(displayHymn.authors)}
                    card={false}
                  />
                </View>
              </View>
            </View>
            <PlayerProgressBar style={{ marginTop: 25, marginBottom: 42 }} />
            <PlayerControls style={{ marginBottom: 30 }} />
          </View>
          <PlayerVolumeBar
            style={{
              /* marginTop: 'auto' , */ marginBottom: 30,
              maxWidth: '100%',
              justifyContent: 'center',
              paddingHorizontal: 30,
            }}
          />
          <View
            style={{
              //paddingHorizontal: 60,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginBottom: 30,
            }}
          >
            <ToogleLyricInPlayer />
            <TooglePlayListInPlayer />
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  artworkImage: {
    borderRadius: 12,
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },
  artworkImageContainer: {
    borderRadius: 11,
    flexDirection: 'row',
    height: '75%',
    justifyContent: 'center',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.3,
    width: '75%',
  },
  authors: {
    color: colors.second,
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.sm,
  },
  overlayContainer: {
    ...defaultStyles.container,
    backgroundColor: 'rgba(0,0,0,.4)',
    paddingHorizontal: 16,
  },
  trackEnglishTitle: {
    color: colors.second,
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.sm,
  },
  trackNumberView: {
    color: colors.second,
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: 20,
  },
  trackTitleContainer: {
    flex: 1,
    height: 110,
    overflow: 'hidden',
  },
  trackTitleContainerView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackTitleText: {
    color: 'white',
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: 22,
    //maxWidth: '50%',
  },
})

export default memo(PlayerScreen)
