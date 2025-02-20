import { TouchableOpacity } from 'react-native'
import ShuffleSVG from '../svg/ShuffleSVG'
import ShuffleActiveSVG from '../svg/ShuffleActiveSVG'
import { useTrackPlayerShuffleMode } from '@/hooks/useTrackPlayerShuffleMode'

const PlayerShuffleToogle = () => {
  const { shuffleMode, handleShufflePress } = useTrackPlayerShuffleMode()

  const getShuffleIcon = () => {
    return shuffleMode ? (
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
