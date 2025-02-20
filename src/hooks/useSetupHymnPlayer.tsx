/* eslint-disable no-console */
import { useEffect, useRef } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
  })

  await TrackPlayer.setVolume(0.8)
  await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

const useSetupHymnPlayer = ({ onLoad }: { onLoad?: () => void }) => {
  const isInitialized = useRef(false)
  useEffect(() => {
    setupPlayer()
      .then(() => {
        isInitialized.current = true
        onLoad?.()
      })
      .catch(error => {
        isInitialized.current = false
        console.log(error)
      })
  }, [onLoad])
}

export default useSetupHymnPlayer
