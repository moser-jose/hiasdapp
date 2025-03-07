import { memo, useState, useEffect, useCallback, useMemo } from 'react'

import { ActivityIndicator, TouchableOpacity } from 'react-native'

import HeartFullSVG from '../svg/HeartFullSvg'

import { colors } from '@/constants/styles'

import HeartSVG from '../svg/HeartSvg'
import { useFavorites } from '@/store/library'

const ToogleFavorites = ({ id }: { id: number }) => {
  const { toggleFavorite, isFavorite } = useFavorites()
  const [isFav, setIsFav] = useState(false)
  const [loadingFavorite, setLoadingFavorite] = useState(false)

  useEffect(() => {
    const checkFavorite = async () => {
      const result = await isFavorite(id as number)
      setIsFav(result as boolean)
    }
    checkFavorite()
  }, [id, isFavorite])

  const handleFavoritePress = useCallback(async () => {
    try {
      setLoadingFavorite(true)
      await toggleFavorite(id as number)
      setIsFav(prevState => !prevState)
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setLoadingFavorite(false)
    }
  }, [id, toggleFavorite])

  const FavoriteButton = useMemo(() => {
    if (loadingFavorite) {
      return <ActivityIndicator size="small" color={colors.green} />
    }
    return isFav ? (
      <HeartFullSVG color={colors.green} />
    ) : (
      <HeartSVG color={colors.green} />
    )
  }, [isFav, loadingFavorite])

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleFavoritePress}>
      {FavoriteButton}
    </TouchableOpacity>
  )
}

export default memo(ToogleFavorites)
