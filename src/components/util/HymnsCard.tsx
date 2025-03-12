import { colors } from '@/constants/styles'
import { truncateText } from '@/helpers/textsWords'
import { usePlayerStore } from '@/store/playerStore'
import { hymnsCard } from '@/styles'
import { Author, HymnsProps } from '@/types/hymnsTypes'
import { router } from 'expo-router'
import { memo, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useShallow } from 'zustand/react/shallow'
import ActiveHymnsDownloadSVG from '../svg/ActiveHymnsDownloadSvg'
import Authors from './Authors'
import PlayButton from './PlayButton'
import ToogleFavorites from './ToogleFavorites'
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
      style={[hymnsCard.container, style]}
    >
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
        height={36}
        width={36}
        activeHymnId={activeHymn?.id as number}
        handleHymnSelect={
          /* () =>
          isPlaying ? pause() : activeHymn?.id === id ? play() : play(hymn)
         */

          () => handleHymnSelect(hymn)
        }
      />
    </TouchableOpacity>
  )
}
export default memo(HymnsCard)
