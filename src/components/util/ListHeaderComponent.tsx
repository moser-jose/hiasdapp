import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import SongSVG from '@/components/svg/SongSvg'
import ShuffleSVG from '../svg/ShuffleSVG'
import { colors, fontFamily } from '@/constants/styles'
import React from 'react'
import ItemDivider from './ItemDivider'
import PlayButton from './PlayButton'
import { usePlayerStore } from '@/store/playerStore'
import { useShallow } from 'zustand/react/shallow'
import { Hymn } from '@/types/hymnsTypes'
import { useHymn } from '@/hooks/useHymn'
import { useHymns } from '@/store/library'
export const ListHeaderComponent = ({
  handleHymnSelect,
}: {
  handleHymnSelect: (hymn: Hymn) => Promise<void>
}) => {
  const { play, pause, isPlaying, activeHymn } = usePlayerStore(
    useShallow(state => ({
      play: state.play,
      pause: state.pause,
      isPlaying: state.isPlaying,
      activeHymn: state.activeHymn,
    }))
  )

  const hymns = useHymns()
  return (
    <>
      <View style={styles.subCategoryContainerPlay}>
        <TouchableOpacity
          style={styles.playAll}
          onPress={() => handleHymnSelect(hymns[0] as Hymn)}
        >
          <PlayButton
            isPlaying={isPlaying}
            activeHymnId={activeHymn?.id}
            handleHymnSelect={() => handleHymnSelect(hymns[0] as Hymn)}
            height={22}
            width={22}
          />
          <Text style={styles.playText}>Reproduzir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.playAllShuffle} onPress={() => {}}>
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
