import TrackPlayer, { Event } from 'react-native-track-player'
import { usePlayerStore } from '@/store/playerStore'

const { play, pause, skipToNext, skipToPrevious } = usePlayerStore.getState()

export const AudioService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => play())
  TrackPlayer.addEventListener(Event.RemotePause, () => pause())
  TrackPlayer.addEventListener(Event.RemoteNext, () => skipToNext())
  TrackPlayer.addEventListener(Event.RemotePrevious, () => skipToPrevious())
}
