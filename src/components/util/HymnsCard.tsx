import { memo, useState } from 'react'
import { hymnsCard } from '@/styles'
import { Text, TouchableOpacity, View } from 'react-native'
import HeartSVG from '../svg/HeartSvg'
import ActiveHymnsDownloadSVG from '../svg/ActiveHymnsDownloadSvg'
import PlayCardSVG from '../svg/PlayCardSvg'
import { colors } from '@/constants/styles'
import { truncateText } from '@/helpers/textsWords'
import Authors from './Authors'
import PauseCardSVG from '../svg/PauseCardSvg'
import HeartFullSVG from '../svg/HeartFullSvg'
import { HymnsProps, HymnTrack } from '@/types/hymnsTypes'
import { usePlayerStore } from '@/store/playerStore'
import { useShallow } from 'zustand/react/shallow'
import { Author } from '@/types/hymnsTypes'
import ToogleFavorites from './ToogleFavorites'
const HymnsCard = ({
  hymn,
  style,
  id,
  onHymnSelect: handleHymnSelect,
}: HymnsProps) => {
  const [favorites, setFavorites] = useState(false)
  const { isPlaying, activeHymn } = usePlayerStore(
    useShallow(state => ({
      isPlaying: state.isPlaying,
      activeHymn: state.activeHymn,
    }))
  )

  const track: HymnTrack = {
    id: hymn.number,
    number: hymn.number,
    numberView: hymn.numberView,
    englishTitle: hymn.englishTitle,
    authors: Object.values(hymn.authors) as Author[],
    title: hymn.title,
    url: hymn.url,
    lyrics: hymn.lyrics,
    artwork: hymn.artwork,
    artist: hymn.artist,
  }

  return (
    <TouchableOpacity style={[hymnsCard.container, style]}>
      <View style={hymnsCard.card}>
        <Text style={hymnsCard.number}>{track.numberView}</Text>
        <View style={hymnsCard.ViewCard}>
          <View style={hymnsCard.cardTittle}>
            <View style={hymnsCard.viewTittle}>
              <Text style={hymnsCard.title}>
                {truncateText(track.title, 15)}
              </Text>
              <ActiveHymnsDownloadSVG color={colors.green} />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setFavorites(!favorites)}
            >
              <ToogleFavorites id={track.id as number} />
            </TouchableOpacity>
          </View>
          <Text style={hymnsCard.baseTitle}>{track.englishTitle}</Text>
          <Authors
            style={hymnsCard.author}
            authors={track.authors || []}
            card={true}
          />
        </View>
      </View>
      <TouchableOpacity
        style={hymnsCard.play}
        onPress={() => handleHymnSelect(hymn)}
      >
        {isPlaying && id === activeHymn?.id ? (
          <PauseCardSVG color={colors.primary} />
        ) : (
          <PlayCardSVG color={colors.primary} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
export default memo(HymnsCard)
