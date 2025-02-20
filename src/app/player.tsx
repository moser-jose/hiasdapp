import HeartFullSVG from '@/components/svg/HeartFullSvg'
import HeartSVG from '@/components/svg/HeartSvg'
import LetterOutlineSVG from '@/components/svg/LetterOutlineSvg'
import LetterSVG from '@/components/svg/LetterSvg'
import { PlayerProgressBar } from '@/components/svg/PlayerProgressbar'
import PlaylistsOutlineSVG from '@/components/svg/PlayListsOutlineSVG'
import PlaylistsSVG from '@/components/svg/PlayListsSVG'
import Authors from '@/components/util/Authors'
import { MovingText } from '@/components/util/MovingText'
import { PlayerControls } from '@/components/util/PlayerControls'
import { PlayerVolumeBar } from '@/components/util/PlayerVolumeBar'
import { logoApp } from '@/constants/images'
import { colors, fontFamily, fontSize } from '@/constants/styles'
import { usePlayerBackground } from '@/hooks/usePlayerBackground'
import { defaultStyles } from '@/styles'
import { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'

const PlayerScreen = () => {
  const [viewPlayList, setViewPlayList] = useState(false)
  const [viewLetter, setViewLetter] = useState(false)
  const activeHymn = useActiveTrack()
  const { background } = usePlayerBackground(activeHymn?.artwork ?? logoApp)
  const isFavorite = true
  const { top, bottom } = useSafeAreaInsets()

  if (!activeHymn) {
    return (
      <View style={[defaultStyles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator color={colors.icon} />
      </View>
    )
  }

  const toogleFavorite = () => {}
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
                uri: activeHymn.artwork ?? logoApp,
                priority: FastImage.priority.high,
              }}
              resizeMode="cover"
              style={styles.artworkImage}
            />
          </View>
        </View>
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
                  <View style={styles.trackTitleContainerView}>
                    <View style={{ maxWidth: '65%', overflow: 'hidden' }}>
                      <MovingText
                        text={activeHymn.title ?? ''}
                        animationThreshold={30}
                        style={styles.trackTitleText}
                      />
                    </View>
                    <Text style={styles.trackNumberView}>
                      {activeHymn.numberView}
                    </Text>

                    <TouchableOpacity onPress={toogleFavorite}>
                      {isFavorite ? (
                        <HeartFullSVG color={colors.green} />
                      ) : (
                        <HeartSVG
                          color={colors.green}
                          onPress={toogleFavorite}
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  {activeHymn.englishTitle && (
                    <Text style={styles.trackEnglishTitle}>
                      {activeHymn.englishTitle}
                    </Text>
                  )}
                  <Authors
                    style={styles.authors}
                    authors={activeHymn.authors}
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
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setViewLetter(!viewLetter)}
            >
              {viewLetter ? (
                <LetterSVG color={colors.white} />
              ) : (
                <LetterOutlineSVG color={colors.white} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setViewPlayList(!viewPlayList)}
            >
              {viewPlayList ? (
                <PlaylistsSVG height={24} width={24} color={colors.white} />
              ) : (
                <PlaylistsOutlineSVG
                  height={24}
                  width={24}
                  color={colors.white}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

const DismissPlayerSimbol = () => {
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
}

export default PlayerScreen
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
    backgroundColor: 'rgba(0,0,0,.5)',
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
    fontSize: 18,
  },
  trackTitleContainer: {
    flex: 1,
    height: 65,
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
