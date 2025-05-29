import Separator from '@/components/util/Separator'
import { defaultStyles } from '@/styles'
import { View, ScrollView } from 'react-native'
import { memo } from 'react'
import HeartFullSVG from '@/components/svg/HeartFullSvg'
import { colors } from '@/constants/styles'
import { useLibraryStore } from '@/store/library'
import ListHymns from '@/components/util/ListHymnscop'

import React from 'react'
import { generateTracksListId } from '@/helpers/j'
import HymnsSvg from '@/components/svg/HymnsSvg'
import { useShallow } from 'zustand/react/shallow'
import CardHymnDay from '@/components/util/CardHymnDay'
import CategoriesSvg from '@/components/svg/CategoriesSvg'
import { ListCategories } from '@/components/util/ListCategories'
import { useStateStore } from '@/store/modal'
import { ModalChangeHymnal } from '@/components/util/ModalChangeHymnal'

const HomeScreen = () => {
  //const { favorites } = useFavorites()
  const { changeHymns } = useStateStore(
    useShallow(state => ({
      changeHymns: state.changeHymns,
    }))
  )
  const setChangeHymns = useStateStore(state => state.setChangeHymns)
  const { hymns, categories, favorites } = useLibraryStore(
    useShallow(state => ({
      favorites: state.favorites,
      hymns: state.hymns,
      categories: state.categories,
    }))
  )

  function handleSelectHymnal(hymnal: { id: string; name: string }) {
    setChangeHymns(false)
  }

  return (
    <>
      <View style={defaultStyles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}
        >
          <Separator title="Hinos" more>
            <HymnsSvg color={colors.green} height={16} width={16} />
          </Separator>
          <ListHymns
            id={generateTracksListId('home')}
            hymns={hymns}
            horizontal
          />

          <CardHymnDay hymns={hymns} categories={categories} />

          <Separator title="Categorias" more>
            <CategoriesSvg color={colors.green} height={16} width={16} />
          </Separator>
          <ListCategories
            categories={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
          />

          {favorites?.length > 0 && (
            <>
              <Separator title="Favoritos" more>
                <HeartFullSVG color={colors.green} height={16} width={16} />
              </Separator>

              <ListHymns hymns={favorites} horizontal />
            </>
          )}

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
      <ModalChangeHymnal
        visible={changeHymns}
        onClose={() => setChangeHymns(false)}
        onSelect={handleSelectHymnal}
      />
    </>
  )
}

export default memo(HomeScreen)
