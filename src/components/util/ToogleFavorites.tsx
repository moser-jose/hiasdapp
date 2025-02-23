import { memo } from 'react'

import { TouchableOpacity } from 'react-native'

import HeartFullSVG from '../svg/HeartFullSvg'

import { colors } from '@/constants/styles'

import HeartSVG from '../svg/HeartSvg'

const ToogleFavorites = () => {
  const isFavorite = true
  return (
    <TouchableOpacity /* onPress={toogleFavorite} */>
      {isFavorite ? (
        <HeartFullSVG color={colors.green} />
      ) : (
        <HeartSVG color={colors.green} />
      )}
    </TouchableOpacity>
  )
}

export default memo(ToogleFavorites)
