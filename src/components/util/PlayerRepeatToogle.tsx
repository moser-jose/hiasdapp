import { colors } from '@/constants/styles'
import { useTrackPlayerRepeatMode } from '@/hooks/useTrackPlayerRepeatMode'
import { memo, useEffect, useRef } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { RepeatMode } from 'react-native-track-player'
import RepeatAllSVG from '../svg/RepeatAllSvg'
import RepeatOnceSVG from '../svg/RepeatOnceSvg'
import RepeatSVG from '../svg/RepeatSvg'

const repeatOrder: RepeatMode[] = [
  RepeatMode.Off,
  RepeatMode.Track,
  RepeatMode.Queue,
]

const PlayerRepeatToogle = () => {
  const { repeatMode, handleRepeatPress } = useTrackPlayerRepeatMode()
  const animatedValue = useRef(new Animated.Value(0)).current
  const isActive = repeatMode !== RepeatMode.Off

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [isActive, animatedValue])

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  })

  const pulseAnimation = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start()
    } else {
      pulseAnimation.setValue(1)
    }
  }, [isActive, pulseAnimation])

  const toogleRepeatMode = () => {
    if (repeatMode === null) return

    const currentIndex = repeatOrder.indexOf(repeatMode)
    const nextIndex = (currentIndex + 1) % repeatOrder.length
    handleRepeatPress(repeatOrder[nextIndex])
  }

  const getRepeatIcon = () => {
    console.log('repeatMode', RepeatMode)
    switch (repeatMode) {
      case RepeatMode.Off:
        return <RepeatSVG color="white" width={24} height={24} />
      case RepeatMode.Track:
        return <RepeatOnceSVG color="white" width={24} height={24} />
      case RepeatMode.Queue:
        return <RepeatAllSVG color="white" width={24} height={24} />
      default:
        return <RepeatSVG color="white" width={24} height={24} />
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={toogleRepeatMode}>
      <Animated.View
        style={[
          styles.container,
          isActive && styles.activeContainer,
          {
            transform: [
              { scale },
              repeatMode === RepeatMode.Track
                ? { scale: pulseAnimation }
                : { scale: 1 },
            ],
          },
        ]}
      >
        {getRepeatIcon()}
        {isActive && <View style={styles.activeIndicator} />}
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginBottom: 2,
  },
})

export default memo(PlayerRepeatToogle)
