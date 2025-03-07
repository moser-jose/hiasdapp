import { memo, useState } from 'react'
import { hymnsCard } from '@/styles'
import { Text, TouchableOpacity, View } from 'react-native'
import ActiveHymnsDownloadSVG from '../svg/ActiveHymnsDownloadSvg'
import { colors } from '@/constants/styles'
import { truncateText } from '@/helpers/textsWords'
import Authors from './Authors'
import { HymnsProps, Author } from '@/types/hymnsTypes'
import { usePlayerStore } from '@/store/playerStore'
import { useShallow } from 'zustand/react/shallow'
import ToogleFavorites from './ToogleFavorites'
import PlayButton from './PlayButton'
const HymnsCard = ({
  hymn,
  style,
  id,
  onHymnSelect: handleHymnSelect,
}: HymnsProps) => {
  const [favorites, setFavorites] = useState(false)

  const { isPlaying, play, pause, activeHymn } = usePlayerStore(
    useShallow(state => ({
      play: state.play,
      pause: state.pause,
      isPlaying: state.isPlaying,
      activeHymn: state.activeHymn,
    }))
  )

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
              <ToogleFavorites id={hymn.id as number} />
            </TouchableOpacity>
          </View>
          <Text style={hymnsCard.baseTitle}>{hymn.englishTitle}</Text>
          <Authors
            style={hymnsCard.author}
            authors={Object.values(hymn.authors) as Author[]}
            card={true}
          />
        </View>
      </View>

      <PlayButton
        style={hymnsCard.play}
        isPlaying={isPlaying}
        id={id as number}
        activeHymnId={activeHymn?.id as number}
        handleHymnSelect={() =>
          isPlaying ? pause() : activeHymn?.id === id ? play() : play(hymn)
        }
      />
    </TouchableOpacity>
  )
}
export default memo(HymnsCard)
