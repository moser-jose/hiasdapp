import { memo, useState, useEffect } from 'react'

import { TouchableOpacity } from 'react-native'

import HeartFullSVG from '../svg/HeartFullSvg'

import { colors } from '@/constants/styles'

import HeartSVG from '../svg/HeartSvg'
import { useFavorites } from '@/store/library'

const ToogleFavorites = ({ id }: { id: number }) => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    const checkFavorite = async () => {
      const result = await isFavorite(id as number)
      setIsFav(result as boolean)
    }
    checkFavorite()
  }, [id, isFavorite])

  useEffect(() => {
    const isInFavorites = favorites.some(hymn => hymn.id === id)
    setIsFav(isInFavorites)
  }, [favorites, id])

  const handleFavoritePress = async () => {
    await toggleFavorite(id as number)
    setIsFav(!isFav)
  }

  return (
    <TouchableOpacity onPress={handleFavoritePress}>
      {isFav ? (
        <HeartFullSVG color={colors.green} />
      ) : (
        <HeartSVG color={colors.green} />
      )}
    </TouchableOpacity>
  )
}

export default memo(ToogleFavorites)
