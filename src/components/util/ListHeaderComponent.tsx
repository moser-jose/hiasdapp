import { colors, fontFamily } from '@/constants/styles'
import { usePlayerStore } from '@/store/playerStore'
import { useStateStore } from '@/store/stateStore'
import { Hymn } from '@/types/hymnsTypes'
import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native'
import { Track } from 'react-native-track-player'
import { useShallow } from 'zustand/react/shallow'
import ShuffleSVG from '../svg/ShuffleSVG'
import ItemDivider from './ItemDivider'
import PlayButton from './PlayButton'
type QueueControlsProps = {
  hymns: Track[] | Hymn[]
  id: string
} & ViewProps

export const ListHeaderComponent = ({ hymns, id }: QueueControlsProps) => {
  const { shuffle, setShuffle } = useStateStore(
    useShallow(state => ({
      shuffle: state.shuffle,
      setShuffle: state.setShuffle,
    }))
  )

  const {
    play,
    isPlaying,
    activeHymn,
    setQueue,
    setActiveHymns,
    setActiveQueueId,
  } = usePlayerStore(
    useShallow(state => ({
      play: state.play,
      setQueue: state.setQueue,
      isPlaying: state.isPlaying,
      activeHymn: state.activeHymn,
      setActiveHymns: state.setActiveHymns,
      setActiveQueueId: state.setActiveQueueId,
    }))
  )

  const handlePlay = async () => {
    if (shuffle) {
      setShuffle()
    }
    setActiveHymns(hymns)
    await setQueue(hymns)
    await play()
    setActiveQueueId(id)
  }

  const handleShufflePlay = async () => {
    const shuffledTracks = [...hymns]
    for (let i = shuffledTracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledTracks[i], shuffledTracks[j]] = [
        shuffledTracks[j],
        shuffledTracks[i],
      ]
    }
    setActiveHymns(shuffledTracks)
    await setQueue(shuffledTracks)
    await play()
    setActiveQueueId(id)
    if (shuffle === false) {
      setShuffle()
    }
  }

  return (
    <>
      <View style={styles.subCategoryContainerPlay}>
        <TouchableOpacity style={styles.playAll} onPress={handlePlay}>
          <PlayButton
            isPlaying={isPlaying}
            activeHymnId={activeHymn?.id}
            handleHymnSelect={handlePlay}
            height={22}
            width={22}
          />
          <Text style={styles.playText}>Reproduzir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playAllShuffle}
          onPress={handleShufflePlay}
        >
          <ShuffleSVG color={colors.primary} width={20} height={20} />
          <Text
            style={[
              styles.playText,
              {
                color: colors.primary,
              },
            ]}
          >
            Misturar
          </Text>
        </TouchableOpacity>
      </View>
      <ItemDivider style={{ marginLeft: 0 }} />
    </>
  )
}

const styles = StyleSheet.create({
  subCategoryContainerPlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  playAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: colors.green,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 18,
    minWidth: 150,
    shadowColor: colors.green,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  playText: {
    fontSize: 16,
    fontFamily: fontFamily.plusJakarta.bold,
    letterSpacing: 0.3,
    color: '#fff',
  },
  playAllShuffle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: 'rgba(41, 193, 127, 0.16)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 18,
    minWidth: 150,
    borderWidth: 1,
    borderColor: 'rgba(41, 193, 126, 0.15)',
    shadowColor: colors.green,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
})
