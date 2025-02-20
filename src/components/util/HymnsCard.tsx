import { memo, useState } from 'react'
import { hymnsCard } from '@/styles'
import { Text, TouchableOpacity, View } from 'react-native'
import HeartSVG from '../svg/HeartSvg'
import ActiveHymnsDownloadSVG from '../svg/ActiveHymnsDownloadSvg'
import PlayCardSVG from '../svg/PlayCardSvg'
import { colors } from '@/constants/styles'
import { truncateText } from '@/helpers/textsWords'
import Authors from './Authors'
import { useActiveTrack, useIsPlaying } from 'react-native-track-player'
import PauseCardSVG from '../svg/PauseCardSvg'
import HeartFullSVG from '../svg/HeartFullSvg'
import { HymnsProps, HymnTrack } from '@/types/hymnsTypes'

const HymnsCard = ({
  hymn,
  style,
  id,
  onHymnSelect: handleHymnSelect,
}: HymnsProps) => {
  const [favorites, setFavorites] = useState(false)
  const { playing } = useIsPlaying()
  const activeTrack = useActiveTrack()
  //const isActiveHymn = activeTrack?.url === hymn.url

  const track: HymnTrack = {
    id: hymn.number,
    number: hymn.number,
    numberView: hymn.numberView,
    englishTitle: hymn.englishTitle,
    authors: hymn.authors,
    title: hymn.title,
    url: hymn.url,
    artwork: hymn.artwork,
    artist: hymn.artist,
  }

  return (
    <TouchableOpacity style={[hymnsCard.container, style]}>
      <View style={hymnsCard.card}>
        <Text style={hymnsCard.number}>{hymn.numberView}</Text>
        <View style={hymnsCard.ViewCard}>
          <View style={hymnsCard.cardTittle}>
            <View style={hymnsCard.viewTittle}>
              <Text style={hymnsCard.title}>
                {truncateText(hymn.title, 15)}
              </Text>
              <ActiveHymnsDownloadSVG color={colors.green} />
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setFavorites(!favorites)}
            >
              {favorites === true ? (
                <HeartFullSVG color={colors.green} />
              ) : (
                <HeartSVG color={colors.green} />
              )}
            </TouchableOpacity>
          </View>

          <Text style={hymnsCard.baseTitle}>{hymn.englishTitle}</Text>
          <Authors
            style={hymnsCard.author}
            authors={hymn.authors}
            card={true}
          />
        </View>
      </View>
      <TouchableOpacity
        style={hymnsCard.play}
        onPress={() => handleHymnSelect(track)}
      >
        {playing && id === activeTrack?.id ? (
          <PauseCardSVG color={colors.primary} />
        ) : (
          <PlayCardSVG color={colors.primary} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
export default memo(HymnsCard)
