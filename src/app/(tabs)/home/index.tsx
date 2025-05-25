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
import { Ionicons } from '@expo/vector-icons'
import CategoriesSvg from '@/components/svg/CategoriesSvg'
import HymnsSvg from '@/components/svg/HymnsSvg'
import PlayListsSvg from '@/components/svg/PlayListsSVG'
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
        <Separator title="Hinos" more>
          <HymnsSvg color={colors.green} height={16} width={16} />
        </Separator>

        <ListHymns id={generateTracksListId('home')} hymns={hymns} horizontal />

        <CardHymnDay hymns={hymns} categories={categories} />

        <Separator title="Categorias" more>
          <CategoriesSvg color={colors.green} height={16} width={16} />
        </Separator>
        <ListCategories
          categories={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        
        <Separator title="Coletâneas" more>
          <PlayListsSvg color={colors.green} height={16} width={16} />
        </Separator>
        <ListPlayLists horizontal showsHorizontalScrollIndicator={false} />

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
