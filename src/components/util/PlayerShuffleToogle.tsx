import { TouchableOpacity } from 'react-native'
import ShuffleSVG from '../svg/ShuffleSVG'
import ShuffleActiveSVG from '../svg/ShuffleActiveSVG'
import { useTrackPlayerShuffleMode } from '@/hooks/useTrackPlayerShuffleMode'
import { useStateStore } from '@/store/stateStore'
import { useShallow } from 'zustand/react/shallow'

const PlayerShuffleToogle = () => {
  const { handleShufflePress } = useTrackPlayerShuffleMode()
  const shuffle = useStateStore(useShallow(state => state.shuffle))

  const getShuffleIcon = () => {
    return shuffle ? (
      <ShuffleActiveSVG color="white" width={22} height={22} />
    ) : (
      <ShuffleSVG color="white" width={22} height={22} />
    )
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleShufflePress}>
      {getShuffleIcon()}
    </TouchableOpacity>
  )
}

export default PlayerShuffleToogle
