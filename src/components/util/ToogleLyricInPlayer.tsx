import { useStateStore } from '@/store/stateStore'
import { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import LyricsSVG from '@/components/svg/LyricsSvg'
import LyricsOutlineSVG from '@/components/svg/LyricsOutlineSvg'
import { colors } from '@/constants/styles'
import { useShallow } from 'zustand/react/shallow'

const ToogleLyricInPlayer = () => {
  const viewLyric = useStateStore(useShallow(state => state.viewLyric))
  const setViewLyric = useStateStore(useShallow(state => state.setViewLyric))
  console.log('rendering player e')
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={setViewLyric}>
      {viewLyric ? (
        <LyricsSVG height={24} width={24} color={colors.white} />
      ) : (
        <LyricsOutlineSVG height={24} width={24} color={colors.white} />
      )}
    </TouchableOpacity>
  )
}

export default memo(ToogleLyricInPlayer)
