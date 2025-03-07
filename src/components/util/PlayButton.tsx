import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'

import PlaySVG from '../svg/PlaySvg'
import { colors } from '@/constants/styles'
import PauseSVG from '../svg/PauseSvg'
import { Hymn } from '@/types/hymnsTypes'
import { hymnsCard } from '@/styles'

type PlayButtonProps = {
  isPlaying: boolean
  id: number
  activeHymnId: number
  testID?: string
  style?: StyleProp<ViewStyle>
  height?: number
  width?: number
  handleHymnSelect: () => void
  color?: string
  backgroundColor?: string
}

export default function PlayButton({
  isPlaying,
  id,
  style,
  activeHymnId,
  handleHymnSelect,
  height,
  width,
  color,
  backgroundColor,
}: PlayButtonProps) {
  return (
    <TouchableOpacity style={style} onPress={handleHymnSelect}>
      {isPlaying && id && id === activeHymnId ? (
        <PauseSVG
          backgroundColor={backgroundColor as string}
          color={color as string}
          height={height}
          width={width}
        />
      ) : (
        <PlaySVG
          backgroundColor={backgroundColor as string}
          color={color as string}
          height={height}
          width={width}
        />
      )}
    </TouchableOpacity>
  )
}
