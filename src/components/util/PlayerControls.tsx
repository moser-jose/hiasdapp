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
import { useLibraryStore } from '@/store/library'
import { Hymn } from '@/types/hymnsTypes'
import { useStateStore } from '@/store/modal'
import { useEffect } from 'react'
type PlayerControlsProps = {
  style?: ViewStyle
  styleRow?: ViewStyle
}

type PlayerButtonProps = {
  style?: ViewStyle
  width?: number
  height?: number
  id?: number
  color?: string
}

type PlayerControlsPropsLyrics = PlayerControlsProps & {
  heightPlay?: number
  widthPlay?: number
  heightNext?: number
  widthNext?: number
  heightPrevious?: number
  widthPrevious?: number
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
  heightPlay,
  widthPlay,
  heightNext,
  widthNext,
  heightPrevious,
  widthPrevious,
}: PlayerControlsPropsLyrics) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.row, styleRow]}>
        <SkipToPreviousButton
          color={colors.primary}
          width={widthPrevious}
          height={heightPrevious}
        />
        <PlayPauseButton
          color={colors.primary}
          width={widthPlay}
          height={heightPlay}
        />
        <SkipToNextButton
          color={colors.primary}
          width={widthNext}
          height={heightNext}
        />
      </View>
    </View>
  )
}

const PlayPauseButton = ({
  style,
  width,
  height,
  id,
  color = colors.green,
}: PlayerButtonProps) => {
  const play = usePlayerStore(useShallow(state => state.play))
  const pause = usePlayerStore(useShallow(state => state.pause))
  const isPlaying = usePlayerStore(useShallow(state => state.isPlaying))
  const displayedHymn = usePlayerStore(useShallow(state => state.activeHymn))
  const lyrics = useLibraryStore(useShallow(state => state.lyrics))
  const setLyrics = useLibraryStore(useShallow(state => state.setLyrics))

  const isLyricsScreenOpen = useStateStore(
    useShallow(state => state.isLyricsScreenOpen)
  )

  if (isLyricsScreenOpen === false) {
    console.log('fechado')
  }

  useEffect(() => {
    if (isLyricsScreenOpen === false) {
      setLyrics(null)
    }
    return () => {
      setLyrics(null)
    }
  }, [])

  return (
    <View style={style}>
      <PlayButton
        isPlaying={isPlaying}
        testID={`play-button-${displayedHymn?.number}`}
        id={lyrics ? lyrics.id : (displayedHymn?.id as number)}
        activeHymnId={lyrics ? lyrics.id : (displayedHymn?.id as number)}
        handleHymnSelect={
          /* ()=>isPlaying?pause():play() */
          () =>
            isPlaying && lyrics?.id !== displayedHymn?.id
              ? pause()
              : isPlaying && lyrics?.id === displayedHymn?.id
                ? pause()
                : !isPlaying && !lyrics
                  ? play()
                  : isPlaying && !lyrics
                    ? /* play(displayedHymn as Hymn) */ pause()
                    : !isPlaying && lyrics
                      ? play(lyrics)
                      : play()
        }
        height={height}
        backgroundColor="transparent"
        width={width}
        color={color}
      />
    </View>
  )
}

const SkipToNextButton = ({
  width,
  height,
  color = colors.green,
}: PlayerButtonProps) => {
  const skipToNext = usePlayerStore(useShallow(state => state.skipToNext))
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={skipToNext}>
      <NextMusicButtonSVG width={width} height={height} color={color} />
    </TouchableOpacity>
  )
}

const SkipToPreviousButton = ({
  width,
  height,
  color = colors.green,
}: PlayerButtonProps) => {
  const skipToPrevious = usePlayerStore(
    useShallow(state => state.skipToPrevious)
  )

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={skipToPrevious}>
      <PreviousMusicButtonSVG width={width} height={height} color={color} />
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
