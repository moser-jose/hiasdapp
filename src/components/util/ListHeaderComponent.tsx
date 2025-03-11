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
    const shuffledTracks = [...hymns].sort(() => Math.random() - 0.5)
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  playAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.green,
    padding: 16,
    borderRadius: 20,
  },
  playText: {
    fontSize: 16,
    fontFamily: fontFamily.plusJakarta.bold,
    letterSpacing: 0.5,
    color: '#fff',
  },
  playAllShuffle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(33, 26, 26, 0.07)',
    padding: 16,
    borderRadius: 20,
  },
})
