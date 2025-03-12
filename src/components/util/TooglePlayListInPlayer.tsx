import { colors } from '@/constants/styles'
import { useStateStore } from '@/store/stateStore'
import { memo, useEffect, useRef } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useShallow } from 'zustand/react/shallow'
import PlaylistsOutlineSVG from '../svg/PlayListsOutlineSVG'
import PlaylistsSVG from '../svg/PlayListsSVG'

const TooglePlayListInPlayer = () => {
  const viewPlayList = useStateStore(useShallow(state => state.viewPlaylist))
  const setViewPlayList = useStateStore(
    useShallow(state => state.setViewPlaylist)
  )
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: viewPlayList ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [viewPlayList, animatedValue])

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  })

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={setViewPlayList}>
      <Animated.View
        style={[
          styles.container,
          viewPlayList && styles.activeContainer,
          { transform: [{ scale }] },
        ]}
      >
        {viewPlayList ? (
          <PlaylistsSVG height={24} width={24} color={colors.white} />
        ) : (
          <PlaylistsOutlineSVG height={24} width={24} color={colors.white} />
        )}
        {viewPlayList && <View style={styles.activeIndicator} />}
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

export default memo(TooglePlayListInPlayer)
