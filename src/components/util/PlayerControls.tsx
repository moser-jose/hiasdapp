import { TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native'
import TrackPlayer, { RepeatMode, useIsPlaying } from 'react-native-track-player'
import PlayButtonSVG from '../svg/PlayButtonSvg'
import PauseButtonSVG from '../svg/PauseButtonSvg'
import { colors } from '@/constants/styles'
import NextMusicButtonSVG from '../svg/NextMusicButtonSVG'
import PreviousMusicButtonSVG from '../svg/PreviousMusicButtonSVG'
import ShuffleSVG from '../svg/ShufleSvg'
import React from 'react'
import RepeatSVG from '../svg/RepeatSvg'
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
        <ShuffleButton width={21} height={21} />
        <SkipToPreviousButton width={20} height={19} />
        <PlayPauseButton width={45} height={45} />
        <SkipToNextButton width={20} height={19} />
        <RepeatButton width={21} height={19} />
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
          <PauseButtonSVG
            width={width}
            height={height}
            color={colors.favorites}
          />
        ) : (
          <PlayButtonSVG
            width={width}
            height={height}
            color={colors.favorites}
          />
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
      <NextMusicButtonSVG
        width={width}
        height={height}
        color={colors.favorites}
      />
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
        color={colors.favorites}
      />
    </TouchableOpacity>
  )
}

const ShuffleButton = ({ width, height }: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToPrevious()}
    >
      <ShuffleSVG width={width} height={height} color="white" />
    </TouchableOpacity>
  )
}

const RepeatButton = ({ width, height }: PlayerButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.setRepeatMode(RepeatMode.Track)}
    >
      <RepeatSVG color="white" width={width} height={height} />
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
