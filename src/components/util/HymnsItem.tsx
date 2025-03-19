import { colors, fontFamily, fontSize } from '@/constants/styles'
import { truncateText } from '@/helpers/textsWords'
import { usePlayerStore } from '@/store/playerStore'
import { Author, HymnsProps } from '@/types/hymnsTypes'
import { memo, useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useShallow } from 'zustand/react/shallow'
import ActiveHymnsDownloadSVG from '../svg/ActiveHymnsDownloadSvg'
import SpreedSVG from '../svg/SpreedSvg'
import Authors from './Authors'
import ToogleFavorites from './ToogleFavorites'

import { router } from 'expo-router'
import React from 'react'
import PlayButton from './PlayButton'

function HymnsItem({ hymn, id, onHymnSelect: handleHymnSelect }: HymnsProps) {
  const { isPlaying, activeHymn } = usePlayerStore(
    useShallow(state => ({
      play: state.play,
      pause: state.pause,
      isPlaying: state.isPlaying,
      activeHymn: state.activeHymn,
    }))
  )

  const isActiveHymn = useMemo(
    () => activeHymn?.url === hymn.url,
    [activeHymn?.url, hymn.url]
  )

  const activeStyle = StyleSheet.create({
    activeTitle: {
      ...styles.title,
      color: colors.active,
      fontWeight: 'bold',
    },
    normalTitle: {
      ...styles.title,
      color: colors.text,
      fontWeight: 'normal',
    },
  })

  const titleStyle = useMemo(
    () => (isActiveHymn ? activeStyle.activeTitle : activeStyle.normalTitle),
    [isActiveHymn, activeStyle]
  )

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/lyrics`,
          params: {
            id: hymn.id,
            idQueue: id,
            numberView: hymn.numberView,
            authors: hymn.authors ? JSON.stringify(hymn.authors) : null,
            lyrics: hymn.lyrics ? JSON.stringify(hymn.lyrics) : null,
            number: hymn.number,
            title: hymn.title,
            englishTitle: hymn.englishTitle,
            biblicalText: hymn.biblicalText,
            url: hymn.url,
          },
        })
      }
      activeOpacity={0.7}
      style={styles.container}
    >
      <View style={styles.card}>
        <View style={styles.cardSpreed}>
          <TouchableOpacity style={styles.cardSpreedTouch}>
            <SpreedSVG width={16} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
        <View style={styles.cardMore}>
          <View style={styles.numberCard}>
            <Text style={styles.number}>{hymn.number}</Text>
            <ActiveHymnsDownloadSVG color={colors.second} />
            {hymn.biblicalText && (
              <Text style={styles.baseTitle}>{hymn.biblicalText}</Text>
            )}
          </View>
          <View style={styles.ViewCard}>
            <Text style={titleStyle}>{truncateText(hymn.title, 29)}</Text>
            {hymn.englishTitle && (
              <Text style={styles.baseTitle}>{hymn.englishTitle}</Text>
            )}
            <Authors
              style={styles.author}
              authors={Object.values(hymn.authors) as Author[]}
              card={false}
            />
          </View>
        </View>
        <ToogleFavorites id={hymn.id} />
        <PlayButton
          isPlaying={isPlaying}
          testID={`play-button-${hymn.number}`}
          id={id as number}
          activeHymnId={activeHymn?.id as number}
          handleHymnSelect={() => handleHymnSelect(hymn)}
          /* handleHymnSelect={() =>
            isPlaying ? pause() : isActiveHymn ? play() : play(hymn)
          } */
          height={30}
          width={30}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ViewCard: {
    flex: 1,
  },
  author: {
    color: colors.textMuted,
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.xss,
  },
  baseTitle: {
    color: colors.textMuted,
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.xss,
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    position: 'relative',
  },
  cardMore: {
    flex: 1,
  },
  cardSpreed: {
    alignItems: 'center',
  },
  cardSpreedTouch: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 4,
  },
  /* cardTittle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  }, */
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginRight: 16,
    position: 'relative',
  },
  number: {
    color: colors.primary,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.sm,
  },
  numberCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  title: {
    color: colors.text,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.sm,
  },
})
export default memo(HymnsItem)
