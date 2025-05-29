import { colors, fontFamily, fontSize } from '@/constants/styles'
import { formatSecondsMinute } from '@/helpers/miscellaneous'
import { utilsStyles } from '@/styles'
import { StyleSheet, Text, View, ViewProps } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import TrackPlayer, { useProgress } from 'react-native-track-player'

export const PlayerProgressBar = ({ style }: ViewProps) => {
  const { duration, position } = useProgress(250)

  const isSliding = useSharedValue(false)
  const progress = useSharedValue(0)
  const min = useSharedValue(0)
  const max = useSharedValue(1)

  const trackElapsedTime = formatSecondsMinute(Math.floor(position))
  const trackRemainingTime = formatSecondsMinute(
    Math.floor(duration - position)
  )

  if (!isSliding.value) {
    progress.value = duration > 0 ? position / duration : 0
  }

  return (
    <View style={style}>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>
        <Text style={styles.timeText}>
          {'-'} {trackRemainingTime}
        </Text>
      </View>
      <Slider
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        containerStyle={utilsStyles.slider}
        thumbWidth={0}
        renderBubble={() => null}
        theme={{
          minimumTrackTintColor: colors.green,
          maximumTrackTintColor: 'rgba(255, 255, 255, 0.36)',
        }}
        onSlidingStart={() => (isSliding.value = true)}
        onValueChange={async value => {
          await TrackPlayer.seekTo(value * duration)
        }}
        onSlidingComplete={async value => {
          if (!isSliding.value) return

          isSliding.value = false

          await TrackPlayer.seekTo(value * duration)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  timeRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.83)',
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.xs,
    letterSpacing: 0.7,
    opacity: 0.75,
  },
})
