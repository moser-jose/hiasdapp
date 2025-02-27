import { useStateStore } from '@/store/stateStore'
import { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { colors } from '@/constants/styles'
import { useShallow } from 'zustand/react/shallow'
import PlaylistsSVG from '../svg/PlayListsSVG'
import PlaylistsOutlineSVG from '../svg/PlayListsOutlineSVG'
const ToogleLyricInPlayer = () => {
  const viewPlayList = useStateStore(useShallow(state => state.viewPlaylist))
  const setViewPlayList = useStateStore(
    useShallow(state => state.setViewPlaylist)
  )
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={setViewPlayList}>
      {viewPlayList ? (
        <PlaylistsSVG height={24} width={24} color={colors.white} />
      ) : (
        <PlaylistsOutlineSVG height={24} width={24} color={colors.white} />
      )}
    </TouchableOpacity>
  )
}

export default memo(ToogleLyricInPlayer)
