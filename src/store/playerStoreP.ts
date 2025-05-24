import TrackPlayer from 'react-native-track-player'

export const setupPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
    // Add more options as needed:
    autoHandleInterruptions: true,
    backBuffer: 60, // Keep 60 seconds of audio loaded before current position
  })

  // Set up capabilities for the notification/control center
  await TrackPlayer.updateOptions({
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_STOP,
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    ],
    // Customize notification appearance
    // android options
    stopWithApp: false, // continue playback even when the app is closed
  })

  await TrackPlayer.setVolume(0.8)
  await TrackPlayer.setRepeatMode(RepeatMode.Off)
}
