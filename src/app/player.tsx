import HeartFullSVG from '@/components/svg/HeartFullSvg'
import HeartSVG from '@/components/svg/HeartSvg'
import { PlayerProgressBar } from '@/components/svg/PlayerProgressbar'
import Authors from '@/components/util/Authors'
import { MovingText } from '@/components/util/MovingText'
import { PlayerControls } from '@/components/util/PlayerControls'
import { logoApp } from '@/constants/images'
import { colors, fontSize } from '@/constants/styles'
import { defaultStyles } from '@/styles'
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'

const PlayerScreen = () => {
  const activeHymn = useActiveTrack()
  const isFavorite = false
  const { top, bottom } = useSafeAreaInsets()

  if (!activeHymn) {
    return (
      <View
        style={[
          defaultStyles.container,
          { justifyContent: 'center' /*,  backgroundColor: colors.primary */ },
        ]}
      >
        <ActivityIndicator color={colors.icon} />
      </View>
    )
  }

  const toogleFavorite = () => {
    console.log(activeHymn.authors)
  }
  return (
    <View style={styles.overlayContainer}>
      <DismissPlayerSimbol />
      <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
        <View style={styles.artworkImageContainer}>
          <FastImage
            source={{
              uri: logoApp,
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
                      text={activeHymn.title}
                      animationThreshold={30}
                      style={styles.trackTitleText}
                    />
                  </View>
                  <Text style={styles.trackNumberView}>
                    {activeHymn.numberView}
                  </Text>

                  <TouchableOpacity
                    onPress={toogleFavorite}
                    style={{ marginHorizontal: 16 }}
                  >
                    {isFavorite ? (
                      <HeartFullSVG color={colors.favorites} />
                    ) : (
                      <HeartSVG
                        color={colors.favorites}
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
                  style={{ fontSize: fontSize.sm, color: colors.second }}
                  authors={activeHymn.authors}
                  card={false}
                />
              </View>
            </View>
          </View>
          <PlayerProgressBar style={{ marginTop: 32 }} />
          <PlayerControls style={{ marginTop: 30 }} />
        </View>
      </View>
    </View>
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
    borderRadius: 20,
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },
  artworkImageContainer: {
    borderRadius: 11,
    flexDirection: 'row',
    height: '90%',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.8,
  },
  overlayContainer: {
    ...defaultStyles.container,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 16,
  },
  trackEnglishTitle: {
    color: colors.second,
    fontSize: fontSize.sm,
    fontWeight: '400',
  },
  trackNumberView: {
    color: colors.second,
    fontFamily: 'PlusJakartaSans_500Regular',
    fontSize: 18,
    fontWeight: '700',
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
    fontFamily: 'PlusJakartaSans_500Regular',
    fontSize: 22,
    fontWeight: '700',
    //maxWidth: '50%',
  },
})
