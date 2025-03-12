import LyricsOutlineSVG from '@/components/svg/LyricsOutlineSvg'
import LyricsSVG from '@/components/svg/LyricsSvg'
import { colors } from '@/constants/styles'
import { useStateStore } from '@/store/stateStore'
import { memo, useEffect, useRef } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useShallow } from 'zustand/react/shallow'

const ToogleLyricInPlayer = () => {
  const viewLyric = useStateStore(useShallow(state => state.viewLyric))
  const setViewLyric = useStateStore(useShallow(state => state.setViewLyric))
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: viewLyric ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [viewLyric, animatedValue])

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  })

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={setViewLyric}>
      <Animated.View
        style={[
          styles.container,
          viewLyric && styles.activeContainer,
          { transform: [{ scale }] },
        ]}
      >
        {viewLyric ? (
          <LyricsSVG height={24} width={24} color={colors.white} />
        ) : (
          <LyricsOutlineSVG height={24} width={24} color={colors.white} />
        )}
        {viewLyric && <View style={styles.activeIndicator} />}
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

export default memo(ToogleLyricInPlayer)
