import { colors } from '@/constants/styles'
import { useFavorites } from '@/store/library'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import HeartFullSVG from '../svg/HeartFullSvg'
import HeartSVG from '../svg/HeartSvg'

const ToogleFavorites = ({ id }: { id: number }) => {
  const { toggleFavorite, isFavorite } = useFavorites()
  const [isFav, setIsFav] = useState(false)
  const animatedValue = useRef(new Animated.Value(0)).current
  const pulseAnimation = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const checkFavorite = async () => {
      const result = await isFavorite(id as number)
      setIsFav(result as boolean)
    }
    checkFavorite()
  }, [id, isFavorite])

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFav ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()

    if (isFav) {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.3,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      pulseAnimation.setValue(1)
    }
  }, [isFav, animatedValue, pulseAnimation])

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  })

  const handleFavoritePress = useCallback(async () => {
    try {
      await toggleFavorite(id as number)
      setIsFav(prevState => !prevState)
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }, [id, toggleFavorite])

  const FavoriteButton = useMemo(() => {
    return isFav ? (
      <HeartFullSVG height={22} width={22} color={colors.green} />
    ) : (
      <HeartSVG height={22} width={22} color={colors.green} />
    )
  }, [isFav])

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleFavoritePress}>
      <Animated.View
        style={[
          styles.container,
          isFav && styles.activeContainer,
          {
            transform: [
              { scale },
              isFav ? { scale: pulseAnimation } : { scale: 1 },
            ],
          },
        ]}
      >
        {FavoriteButton}
        {isFav && <View style={styles.activeIndicator} />}
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeContainer: {
    backgroundColor: 'rgba(32, 171, 155, 0.15)',
    shadowColor: colors.green,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.green,
    //marginBottom: 2,
  },
})

export default memo(ToogleFavorites)
