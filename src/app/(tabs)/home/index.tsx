import Separator from '@/components/util/Separator'
import { defaultStyles } from '@/styles'
import { View, ScrollView } from 'react-native'
import { memo } from 'react'
import { ListCategories } from '@/components/util/ListCategories'
import CardHymnDay from '@/components/util/CardHymnDay'
import HeartFullSVG from '@/components/svg/HeartFullSvg'
import { colors } from '@/constants/styles'
import { useCategories, useFavorites, useHymns } from '@/store/library'
import ListHymns from '@/components/util/ListHymns'

import React from 'react'
import { generateTracksListId } from '@/helpers/j'
import ListPlayLists from '@/components/util/ListPlayLists'

const HomeScreen = () => {
  const categories = useCategories()
  const hymns = useHymns()
  const { favorites } = useFavorites()

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        <Separator title="Hinos" />

        <ListHymns id={generateTracksListId('home')} hymns={hymns} horizontal />

        <Separator title="Categorias" />
        <ListCategories
          categories={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <Separator title="Coletâneas" />
        <ListPlayLists horizontal showsHorizontalScrollIndicator={false} />

        <CardHymnDay hymns={hymns} categories={categories} />

        {favorites.length > 0 && (
          <>
            <Separator title="Favoritos" more>
              <HeartFullSVG color={colors.green} height={16} width={16} />
            </Separator>

            <ListHymns hymns={favorites} horizontal />
          </>
        )}

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
