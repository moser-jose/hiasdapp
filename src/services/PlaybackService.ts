import TrackPlayer, { Event } from 'react-native-track-player'
import { usePlayerStore } from '@/store/playerStore'

// This service needs to be registered with the native modules
// to receive events from the player
/* async function PlaybackService() {
  const { play, pause, skipToNext, skipToPrevious, reset } =
    usePlayerStore.getState()

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    play()
  })

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    pause()
  })

  TrackPlayer.addEventListener(Event.RemoteStop, () => {
    reset()
  })

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    skipToNext()
  })

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    skipToPrevious()
  })

  TrackPlayer.addEventListener(Event.RemoteSeek, event => {
    TrackPlayer.seekTo(event.position)
  })

  TrackPlayer.addEventListener(Event.PlaybackState, event => {
    const { setPlayerState, setIsPlaying } = usePlayerStore.getState()
    setPlayerState(event.state)
    setIsPlaying(event.state === State.Playing)
  })

  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async () => {
    const { setActiveHymn } = usePlayerStore.getState()
    const track = await TrackPlayer.getActiveTrack()
    if (track) {
      setActiveHymn(track)
    }
  })

  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () => {
    // Handle queue ending - you can extend this based on your app's needs
    console.log('Queue ended')
  })
} */

module.exports = async function PlaybackService() {
  const { play, pause, skipToNext, skipToPrevious, reset } =
    usePlayerStore.getState()
  TrackPlayer.addEventListener(Event.RemotePlay, () => play())
  TrackPlayer.addEventListener(Event.RemotePause, () => pause())
  TrackPlayer.addEventListener(Event.RemoteNext, () => skipToNext())
  TrackPlayer.addEventListener(Event.RemotePrevious, () => skipToPrevious())
  TrackPlayer.addEventListener(Event.RemoteStop, () => reset())
  /* TrackPlayer.addEventListener(Event.RemoteSeek, event => {
    TrackPlayer.seekTo(event.position)
  })
  TrackPlayer.addEventListener(Event.PlaybackState, event => {
    const { setPlayerState, setIsPlaying } = usePlayerStore.getState()
    setPlayerState(event.state)
    setIsPlaying(event.state === State.Playing)
  }) */
}
