import Separator from '@/components/util/Separator'
import { defaultStyles } from '@/styles'
import { View, ScrollView } from 'react-native'
import { memo } from 'react'
import HeartFullSVG from '@/components/svg/HeartFullSvg'
import { colors } from '@/constants/styles'
import { useFavorites, useLibraryStore } from '@/store/library'
import ListHymns from '@/components/util/ListHymnscop'

import React from 'react'
import { generateTracksListId } from '@/helpers/j'
import HymnsSvg from '@/components/svg/HymnsSvg'
import { useShallow } from 'zustand/react/shallow'
import CardHymnDay from '@/components/util/CardHymnDay'
import CategoriesSvg from '@/components/svg/CategoriesSvg'
const HomeScreen = () => {
  //const { favorites } = useFavorites()
  const { playlists, hymns, categories, favorites } = useLibraryStore(
    useShallow(state => ({
      playlists: state.playlists,
      favorites: state.favorites,
      hymns: state.hymns,
      categories: state.categories,
    }))
  )

  console.log('playlists', playlists)

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

        {favorites?.length > 0 && (
          <>
            <Separator title="Favoritos" more>
              <HeartFullSVG color={colors.green} height={16} width={16} />
            </Separator>

            <ListHymns hymns={favorites} horizontal />
          </>
        )}

        <CardHymnDay hymns={hymns} categories={categories} />

        <Separator title="Categorias" more>
          <CategoriesSvg color={colors.green} height={16} width={16} />
        </Separator>
        {/*  <ListCategories
          categories={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
        /> */}

        {/* {playlists.length > 0 && (
          <>
            <Separator title="Coletâneas" more>
              <PlaylistsSVG color={colors.green} height={16} width={16} />
            </Separator>
            <ListPlayLists horizontal showsHorizontalScrollIndicator={false} />
          </>
        )} */}
        {/* 

        

        

        }

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
