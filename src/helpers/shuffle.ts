import {
  getActiveTrackIndex,
  remove,
  setQueue,
} from 'react-native-track-player/lib/src/trackPlayer'

import { Hymn } from '@/types/hymnsTypes'
import { Track } from 'react-native-track-player'
import { add, getQueue } from 'react-native-track-player/lib/src/trackPlayer'

/**
 * shuffles the current Queue. The method returns a pre-shuffled Queue,
 * to revert shuffling, use setQueueUninterrupted().
 */
export async function shuffle(): Promise<Track[] | Hymn[]> {
  const currentQueue = await getQueue()
  const shuffledQueue = [...currentQueue].sort(() => Math.random() - 0.5)
  await setQueueUninterrupted(shuffledQueue)
  return currentQueue
}

/**
 * This is a combination of removePreviousTracks() and removeUpcomingTracks().
 * To set the player's queue without playback interruption, remove
 * all tracks with remove() that are not the activeTrackIndex. The current
 * track will be automatically shifted to the first element. Then, splice tracks that
 * the currentTrack is at the first element, and add the spliced tracks.
 * @param tracks
 */
async function setQueueUninterrupted(tracks: Track[] | Hymn[]): Promise<void> {
  // if no currentTrack, its a simple setQueue
  const currentTrackIndex = await getActiveTrackIndex()
  /* console.debug(
    'setQueueUninterrupted: currentTrackIndex is valid? ',
    currentTrackIndex
  ) */
  if (currentTrackIndex === undefined) return await setQueue(tracks)
  // if currentTrack is not in tracks, its a simple setQueue
  const currentQueue = await getQueue()
  const currentTrack = currentQueue[currentTrackIndex]
  const currentTrackNewIndex = tracks.findIndex(
    // define conditions to find the currentTrack in tracks
    track => track.url === currentTrack.url
  )
  /* console.log(
    'setQueueUninterrupted: currentTrackIndex is present? ',
    currentTrackNewIndex,
    tracks,
    currentTrack
  ) */
  if (currentTrackNewIndex < 0) return await setQueue(tracks)
  // else, splice that all others are removed, new track list spliced
  // that the currentTrack becomes the first element.
  // eslint-disable-next-line prefer-const
  let removeTrackIndices = [...Array(currentQueue.length).keys()]
  removeTrackIndices.splice(currentTrackIndex, 1)
  await remove(removeTrackIndices)
  const splicedTracks = tracks
    .slice(currentTrackNewIndex + 1)
    .concat(tracks.slice(0, currentTrackNewIndex))
  //console.log('edited tracks', splicedTracks)
  await add(splicedTracks)
}
