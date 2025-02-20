import { useState, useCallback, useEffect } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

export const useTrackPlayerRepeatMode = () => {
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(RepeatMode.Off)

  const handleRepeatPress = useCallback(async (repeatMode: RepeatMode) => {
    await TrackPlayer.setRepeatMode(repeatMode)

    setRepeatMode(repeatMode)
  }, [])

  useEffect(() => {
    TrackPlayer.getRepeatMode().then(setRepeatMode)
  }, [])

  return {
    repeatMode,
    handleRepeatPress,
  }
}
