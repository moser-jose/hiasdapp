import TrackPlayer, { Event, RepeatMode } from 'react-native-track-player'
import { usePlayerStore } from '@/store/playerStore'
import { useEffect } from 'react'
export default function useSetupHymnPlayer({ onLoad }) {
  useEffect(() => {
    const setup = async () => {
      // ... seu código de setup existente ...

      await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10,
      })

      await TrackPlayer.setVolume(0.8)
      await TrackPlayer.setRepeatMode(RepeatMode.Queue)

      // Adicionar listeners para sincronizar com o store
      TrackPlayer.addEventListener(Event.PlaybackTrackChanged, event => {
        const { nextTrack } = event
        if (nextTrack) {
          TrackPlayer.getTrack(nextTrack).then(track => {
            if (track) {
              usePlayerStore.getState().setActiveTrack(track)
              usePlayerStore.getState().setLastActiveTrack(track)
            }
          })
        }
      })

      TrackPlayer.addEventListener(Event.PlaybackState, event => {
        usePlayerStore.getState().setPlayerState(event.state)
      })

      /* setupPlayer()
      .then(() => {
        isInitialized.current = true
        onLoad?.()
      })
      .catch(error => {
        isInitialized.current = false
        console.log(error)
      })
 */
      onLoad?.()
    }

    setup()
  }, [onLoad])
}
