import { Text, TouchableOpacity, View } from 'react-native'
import ActiveHymnsDownloadSVG from '../svg/ActiveHymnsDownloadSvg'
import PlayCardSVG from '../svg/PlaySvg'
import { colors, fontFamily, fontSize } from '@/constants/styles'
import { Author, Hymn, HymnsProps } from '@/types/hymnsTypes'
import SpreedSVG from '../svg/SpreedSvg'
import Authors from './Authors'
import { truncateText } from '@/helpers/textsWords'
import { StyleSheet } from 'react-native'
import { useMemo, useCallback, useRef, useEffect } from 'react'
import LoaderKit from 'react-native-loader-kit'
import { memo } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { useShallow } from 'zustand/react/shallow'
import ToogleFavorites from './ToogleFavorites'

import PlayButton from './PlayButton'
import { router } from 'expo-router'
import { useLyrics } from '@/store/library'

function HymnsItem({ hymn, id, onHymnSelect: handleHymnSelect }: HymnsProps) {
  const { play, pause, isPlaying, activeHymn } = usePlayerStore(
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
            <SpreedSVG color={colors.textMuted} />
          </TouchableOpacity>
        </View>
        <View style={styles.cardMore}>
          <View style={styles.numberCard}>
            <Text style={styles.number}>{hymn.number}</Text>
            <ActiveHymnsDownloadSVG color={colors.green} />
            {hymn.biblicalText && (
              <Text style={styles.baseTitle}>{hymn.biblicalText}</Text>
            )}
          </View>
          <View style={styles.ViewCard}>
            <Text style={titleStyle}>{truncateText(hymn.title, 29)}</Text>
            <Text style={styles.baseTitle}>{hymn.englishTitle}</Text>
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
          height={34}
          width={34}
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
    fontSize: fontSize.base,
  },
  numberCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  title: {
    color: colors.text,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.base,
  },
})
export default memo(HymnsItem)
