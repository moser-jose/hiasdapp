import Separator from '@/components/util/Separator'
import { defaultStyles } from '@/styles'
import { View, ScrollView } from 'react-native'
import { Track } from 'react-native-track-player'
import TrackPlayer from 'react-native-track-player/lib/src/trackPlayer'
import { ListHymnsCard } from '@/components/util/ListHymnsCard'
import HinosAntigo from '@/api/hiasd-old.json'
import { memo, useMemo } from 'react'
import { ListCategories } from '@/components/util/ListCategories'
import CardHymnDay from '@/components/util/CardHymnDay'
import { ListPlaylistsCard } from '@/components/util/ListPlaylistsCard'
import HeartFullSVG from '@/components/svg/HeartFullSvg'
import { colors } from '@/constants/styles'
import DownloadSVG from '@/components/svg/DownloadSvg'
import { Hymn } from '@/types/hymnsTypes'
import { useCategories, useHymns } from '@/store/library'

import { useCallback } from 'react'
type Playlist = {
  title: string
  hymns: number
}

type dat = Playlist[]

function HomeScreen() {
  const categories = useCategories()
  const hymns = useHymns()

  const handleHymnSelect = useCallback(async (hymn: Track) => {
    await TrackPlayer.load(hymn)
  }, [])
  /* const categories: Category[] = useMemo(() => {
    return HinosAntigo.categories
  }, []) */

  /* const hymns: Hymn[] = useMemo(() => {
    return HinosAntigo.hymns
  }, []) */

  const data: dat = [
    {
      title: 'Amor da vida',
      hymns: 34,
    },
    {
      title: 'Fé e oração',
      hymns: 346,
    },
  ]

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        {/* <Separator title="Hinos" />

        <ListHymnsCard hymns={hymns} handleHymnSelect={handleHymnSelect} />
 */}
        <Separator title="Categorias" more />
        <ListCategories
          categories={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <Separator title="Coletâneas" />
        <ListPlaylistsCard hymns={hymns} data={data} />

        <CardHymnDay hymns={hymns} categories={categories} />

        {/* <Separator title="Favoritos" more>
          <HeartFullSVG color={colors.green} height={16} width={16} />
        </Separator>

        <ListHymnsCard hymns={hymns} handleHymnSelect={handleHymnSelect} />
 */}
        {/* <Separator title="Hinos baixados" more>
          <DownloadSVG color={colors.green} height={16} width={16} />
        </Separator>

        <ListHymnsCard hymns={hymns} handleHymnSelect={handleHymnSelect} />
       */}
      </ScrollView>
    </View>
  )
}

export default memo(HomeScreen)
