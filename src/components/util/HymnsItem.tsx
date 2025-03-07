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
import { useState, useMemo, useCallback, useEffect } from 'react'
import HeartFullSVG from '../svg/HeartFullSvg'
import LoaderKit from 'react-native-loader-kit'
import { memo } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { useShallow } from 'zustand/react/shallow'
import { useFavorites } from '@/store/library'

function HymnsItem({ hymn, id, onHymnSelect: handleHymnSelect }: HymnsProps) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const [isFav, setIsFav] = useState(false)

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

  useEffect(() => {
    const checkFavorite = async () => {
      const result = await isFavorite(track.id as number)
      setIsFav(result as boolean)
    }
    checkFavorite()
  }, [track.id, isFavorite])

  useEffect(() => {
    const isInFavorites = favorites.some(hymn => hymn.id === track.id)
    setIsFav(isInFavorites)
  }, [favorites, track.id])

  const handleFavoritePress = async () => {
    await toggleFavorite(track.id as number)
    setIsFav(!isFav)
  }

  const handlePlayPress = useCallback(() => {
    if (track.id !== activeHymn?.id) {
      handleHymnSelect(track)
    }
  }, [track, activeHymn?.id, handleHymnSelect])

  const titleStyle = useMemo(
    () => ({
      ...styles.title,
      fontWeight: isActiveHymn ? '500' : '400',
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
  }, [activeHymn?.id, id, isActiveHymn, isPlaying])

  const FavoriteButton = useMemo(() => {
    return isFav ? (
      <HeartFullSVG color={colors.green} />
    ) : (
      <HeartSVG color={colors.green} />
    )
  }, [isFav])

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
