import { registerRootComponent } from 'expo'

import App from './src/app/_layout'
import TrackPlayer from 'react-native-track-player'
//import PlaybackService from '@/services/PlaybackService'

registerRootComponent(App)
TrackPlayer.registerPlaybackService(() =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./src/services/PlaybackService')
)
