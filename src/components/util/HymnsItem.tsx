import { Text, TouchableOpacity, View } from 'react-native'
import HeartSVG from '../svg/HeartSvg'
import ActiveHymnsDownloadSVG from '../svg/ActiveHymnsDownloadSvg'
import PlayCardSVG from '../svg/PlayCardSvg'
import { colors, fontFamily, fontSize } from '@/constants/styles'
import { HymnsProps, HymnTrack } from '@/types/hymnsTypes'
import SpreedSVG from '../svg/SpreedSvg'
import Authors from './Authors'
import { truncateText } from '@/helpers/textsWords'
import { StyleSheet } from 'react-native'
import { useState, useMemo, useCallback } from 'react'
import HeartFullSVG from '../svg/HeartFullSvg'
import LoaderKit from 'react-native-loader-kit'
import { memo } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { useShallow } from 'zustand/react/shallow'
import { stringify } from 'querystring'

const HymnsItem = memo(
  ({ hymn, id, onHymnSelect: handleHymnSelect }: HymnsProps) => {
    const [favorites, setFavorites] = useState(false)

    const { isPlaying, activeHymn } = usePlayerStore(
      useShallow(state => ({
        isPlaying: state.isPlaying,
        activeHymn: state.activeHymn,
      }))
    )

    const isActiveHymn = useMemo(
      () => activeHymn?.url === hymn.url,
      [activeHymn?.url, hymn.url]
    )

    const track: HymnTrack = useMemo(
      () => ({
        id: hymn.number,
        number: hymn.number,
        numberView: hymn.numberView,
        englishTitle: hymn.englishTitle,
        authors: hymn.authors,
        title: hymn.title,
        url: hymn.url,
        lyrics: hymn.lyrics,
        artwork: hymn.artwork,
        artist: hymn.artist,
      }),
      [hymn]
    )

    const handleFavoritePress = useCallback(() => {
      setFavorites(prev => !prev)
    }, [])

    const handlePlayPress = useCallback(() => {
      if (track.id !== activeHymn?.id) {
        handleHymnSelect(track)
      }
    }, [track, activeHymn?.id, handleHymnSelect])

    // Memoize dynamic styles with proper TypeScript types
    const titleStyle = useMemo(
      () => ({
        ...styles.title,
        fontWeight: isActiveHymn ? '500' : ('400' as const),
        color: isActiveHymn ? colors.active : colors.text,
      }),
      [isActiveHymn]
    )

    const PlayButton = useMemo(() => {
      if (isActiveHymn && isPlaying && activeHymn?.id === id) {
        return (
          <LoaderKit
            style={{ width: 25, height: 25 }}
            name="LineScaleParty"
            color={colors.icon}
          />
        )
      }
      return <PlayCardSVG width={35} height={35} color={colors.primary} />
    }, [isActiveHymn, isPlaying, activeHymn?.id, id])

    const FavoriteButton = useMemo(
      () =>
        favorites ? (
          <HeartFullSVG color={colors.green} />
        ) : (
          <HeartSVG color={colors.green} />
        ),
      [favorites]
    )

    return (
      <TouchableOpacity style={styles.container}>
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
                authors={Object.values(hymn.authors)}
                card={false}
              />
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={handleFavoritePress}>
            {FavoriteButton}
          </TouchableOpacity>
          <TouchableOpacity
            testID={`play-button-${hymn.number}`}
            onPress={handlePlayPress}
          >
            {PlayButton}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
)

// Move styles outside component to prevent recreation
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

// Use explicit display name for debugging
HymnsItem.displayName = 'HymnsItem'

export default HymnsItem
