import { RepeatMode } from 'react-native-track-player'
import { TouchableOpacity } from 'react-native'
import RepeatSVG from '../svg/RepeatSvg'
import RepeatOnceSVG from '../svg/RepeatOnceSvg'
import RepeatAllSVG from '../svg/RepeatAllSvg'
import { useTrackPlayerRepeatMode } from '@/hooks/useTrackPlayerRepeatMode'

const repeatOrder: RepeatMode[] = [
  RepeatMode.Off,
  RepeatMode.Track,
  RepeatMode.Queue,
]

const PlayerRepeatToogle = () => {
  const { repeatMode, handleRepeatPress } = useTrackPlayerRepeatMode()

  const toogleRepeatMode = () => {
    if (repeatMode === null) return

    const currentIndex = repeatOrder.indexOf(repeatMode)
    const nextIndex = (currentIndex + 1) % repeatOrder.length
    handleRepeatPress(repeatOrder[nextIndex])
  }

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case RepeatMode.Off:
        return <RepeatSVG color="white" width={24} height={24} />
      case RepeatMode.Track:
        return <RepeatOnceSVG color="white" width={24} height={24} />
      case RepeatMode.Queue:
        return <RepeatAllSVG color="white" width={24} height={24} />
      default:
        return <RepeatSVG color="white" width={24} height={24} />
    }
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={toogleRepeatMode}>
      {getRepeatIcon()}
    </TouchableOpacity>
  )
}

export default PlayerRepeatToogle
