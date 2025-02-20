import { TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'
import PlayButtonSVG from '../svg/PlayButtonSvg'
import PauseButtonSVG from '../svg/PauseButtonSvg'
import { colors } from '@/constants/styles'
import NextMusicButtonSVG from '../svg/NextMusicButtonSVG'
import PreviousMusicButtonSVG from '../svg/PreviousMusicButtonSVG'
import PlayerRepeatToogle from './PlayerRepeatToogle'
import PlayerShuffleToogle from './PlayerShuffleToogle'
type PlayerControlsProps = {
  style?: ViewStyle
}

type PlayerButtonProps = {
  style?: ViewStyle
  width?: number
  height?: number
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <PlayerShuffleToogle />
        <SkipToPreviousButton width={30} height={35} />
        <PlayPauseButton width={55} height={55} />
        <SkipToNextButton width={30} height={29} />
        <PlayerRepeatToogle />
      </View>
    </View>
  )
}

const PlayPauseButton = ({ style, width, height }: PlayerButtonProps) => {
  const { playing } = useIsPlaying()

  return (
    <View style={style}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
      >
        {playing ? (
          <PauseButtonSVG width={width} height={height} color={colors.green} />
        ) : (
          <PlayButtonSVG width={width} height={height} color={colors.green} />
        )}
      </TouchableOpacity>
    </View>
  )
}

const SkipToNextButton = ({ width, height }: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToNext()}
    >
      <NextMusicButtonSVG width={width} height={height} color={colors.green} />
    </TouchableOpacity>
  )
}

const SkipToPreviousButton = ({ width, height }: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToPrevious()}
    >
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
