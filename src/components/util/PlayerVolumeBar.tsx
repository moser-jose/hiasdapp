import { colors } from '@/constants/styles'
import { useTrackPlayerVolume } from '@/hooks/useTrackPlayerVolume'
import { utilsStyles } from '@/styles'
import { Ionicons } from '@expo/vector-icons'
import { View, ViewProps } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'

export const PlayerVolumeBar = ({ style }: ViewProps) => {
  const { volume, updateVolume } = useTrackPlayerVolume()

  const progress = useSharedValue(0)
  const min = useSharedValue(0)
  const max = useSharedValue(1)

  progress.value = volume ?? 0

  return (
    <View style={style}>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Ionicons
          name="volume-low"
          size={20}
          color="rgba(255, 255, 255, 0.83)"
          style={{ opacity: 0.8 }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignContent: 'center',
            paddingHorizontal: 10,
          }}
        >
          <Slider
            progress={progress}
            minimumValue={min}
            containerStyle={utilsStyles.slider}
            onValueChange={value => {
              updateVolume(value)
            }}
            renderBubble={() => null}
            theme={{
              maximumTrackTintColor: 'rgba(255, 255, 255, 0.36)',
              minimumTrackTintColor: colors.green,
            }}
            thumbWidth={0}
            maximumValue={max}
          />
        </View>

        <Ionicons
          name="volume-high"
          size={20}
          color="rgba(255, 255, 255, 0.83)"
          style={{ opacity: 0.8 }}
        />
      </View>
    </View>
  )
}
