import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ViewProps,
} from 'react-native'
import SongSVG from '@/components/svg/SongSvg'
import ShuffleSVG from '../svg/ShuffleSVG'
import { colors, fontFamily } from '@/constants/styles'
import React from 'react'
import ItemDivider from './ItemDivider'
import PlayButton from './PlayButton'
import { usePlayerStore } from '@/store/playerStore'
import { useShallow } from 'zustand/react/shallow'
import { Hymn } from '@/types/hymnsTypes'
import { Track } from 'react-native-track-player'

type QueueControlsProps = {
  hymns: Track[] | Hymn[]
} & ViewProps

export const ListHeaderComponent = ({ hymns }: QueueControlsProps) => {
  const { play, isPlaying, activeHymn, setQueue } = usePlayerStore(
    useShallow(state => ({
      play: state.play,
      setQueue: state.setQueue,
      isPlaying: state.isPlaying,
      activeHymn: state.activeHymn,
    }))
  )

  const handlePlay = async () => {
    await setQueue(hymns)
    await play()
  }

  const handleShufflePlay = async () => {
    const shuffledTracks = [...hymns].sort(() => Math.random() - 0.5)

    await setQueue(shuffledTracks)
    await play()
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
          <Text style={[styles.playText, { color: colors.primary }]}>
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
