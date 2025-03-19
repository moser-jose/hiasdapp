import { colors } from '@/constants/styles'
import { useTrackPlayerShuffleMode } from '@/hooks/useTrackPlayerShuffleMode'
import { useStateStore } from '@/store/stateStore'
import { memo, useEffect, useRef } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useShallow } from 'zustand/react/shallow'
import ShuffleActiveSVG from '../svg/ShuffleActiveSVG'
import ShuffleSVG from '../svg/ShuffleSVG'

const PlayerShuffleToogle = () => {
  const { handleShufflePress } = useTrackPlayerShuffleMode()
  const shuffle = useStateStore(useShallow(state => state.shuffle))
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: shuffle ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [shuffle, animatedValue])

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  })

  const rotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleShufflePress}>
      <Animated.View
        style={[
          styles.container,
          shuffle === true && styles.activeContainer,
          {
            transform: [
              { scale },
              { rotate: shuffle === true ? rotation : '0deg' },
            ],
          },
        ]}
      >
        {shuffle === true ? (
          <ShuffleActiveSVG color="white" width={22} height={22} />
        ) : (
          <ShuffleSVG color="white" width={22} height={22} />
        )}
        {shuffle && <View style={styles.activeIndicator} />}
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

export default memo(PlayerShuffleToogle)
