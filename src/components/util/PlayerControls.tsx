import { TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native'
import PlayButtonSVG from '../svg/PlayButtonSvg'
import PauseButtonSVG from '../svg/PauseButtonSvg'
import { colors } from '@/constants/styles'
import NextMusicButtonSVG from '../svg/NextMusicButtonSVG'
import PreviousMusicButtonSVG from '../svg/PreviousMusicButtonSVG'
import PlayerRepeatToogle from './PlayerRepeatToogle'
import PlayerShuffleToogle from './PlayerShuffleToogle'
import { usePlayerStore } from '@/store/playerStore'
import { useShallow } from 'zustand/react/shallow'
import PlayButton from './PlayButton'
import TrackPlayer from 'react-native-track-player'
type PlayerControlsProps = {
  style?: ViewStyle
  styleRow?: ViewStyle
}

type PlayerButtonProps = {
  style?: ViewStyle
  width?: number
  height?: number
  id?: number
}

export const PlayerControls = ({ style, styleRow }: PlayerControlsProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.row, styleRow]}>
        <PlayerShuffleToogle />
        <SkipToPreviousButton width={30} height={35} />
        <PlayPauseButton width={55} height={55} />
        <SkipToNextButton width={30} height={29} />
        <PlayerRepeatToogle />
      </View>
    </View>
  )
}

export const PlayerControlsLyrics = ({
  style,
  styleRow,
}: PlayerControlsProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.row, styleRow]}>
        <SkipToPreviousButton width={30} height={35} />
        <PlayPauseButton width={55} height={55} />
        <SkipToNextButton width={30} height={29} />
      </View>
    </View>
  )
}

const PlayPauseButton = ({ style, width, height, id }: PlayerButtonProps) => {
  const play = usePlayerStore(useShallow(state => state.play))
  const pause = usePlayerStore(useShallow(state => state.pause))
  const isPlaying = usePlayerStore(useShallow(state => state.isPlaying))
  const displayedHymn = usePlayerStore(useShallow(state => state.activeHymn))
  return (
    <View style={style}>
      <PlayButton
        isPlaying={isPlaying}
        testID={`play-button-${displayedHymn?.number}`}
        id={displayedHymn?.id as number}
        activeHymnId={displayedHymn?.id as number}
        handleHymnSelect={() => (isPlaying ? pause() : play())}
        height={height}
        backgroundColor="transparent"
        width={width}
        color={colors.green}
      />
    </View>
  )
}

const SkipToNextButton = ({ width, height }: PlayerButtonProps) => {
  const skipToNext = usePlayerStore(useShallow(state => state.skipToNext))
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={skipToNext}>
      <NextMusicButtonSVG width={width} height={height} color={colors.green} />
    </TouchableOpacity>
  )
}

const SkipToPreviousButton = ({ width, height }: PlayerButtonProps) => {
  const skipToPrevious = usePlayerStore(
    useShallow(state => state.skipToPrevious)
  )

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={skipToPrevious}>
      <PreviousMusicButtonSVG
        width={width}
        height={height}
        color={colors.green}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})

export { PlayPauseButton, SkipToNextButton, SkipToPreviousButton }
