import Separator from "@/components/util/Separator"
import { defaultStyles} from "@/styles"
import { View,ScrollView} from "react-native"
import { Track } from "react-native-track-player"
import TrackPlayer from "react-native-track-player/lib/src/trackPlayer"
import { ListHymnsCard } from "@/components/util/ListHymnsCard"
import HinosAntigo from '@/api/hiasd-old.json'
import { memo, useMemo } from "react"
import { ListCategories } from "@/components/util/ListCategories"
import { useFonts } from "expo-font"
import { Rochester_400Regular } from '@expo-google-fonts/rochester';
import {Sacramento_400Regular} from '@expo-google-fonts/sacramento'
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
} from '@expo-google-fonts/plus-jakarta-sans';
import AppLoading from "expo-app-loading"
import CardHymnDay from "@/components/util/CardHymnDay"
import { ListPlaylistsCard } from "@/components/util/ListPlaylistsCard"
import HeartFullSVG from "@/components/svg/HeartFullSvg"
import { colors } from "@/constants/styles"
import DownloadSVG from "@/components/svg/DownloadSvg"
import { hymnsWithArtwork } from "@/mocks/DataMock"
import { HymnCategory } from "@/types/hymnsTypes"
type Playlist = {
  title: string
  hymns: number
}

type dat = Playlist[]

const HomeScreen=()=>{

  const [fontsLoaded] = useFonts({
    Rochester_400Regular,
    Sacramento_400Regular,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
  });

  const handleHymnSelect= async (hymn:Track)=>{
    await TrackPlayer.load(hymn)
 }
 const categories:HymnCategory[] = useMemo(()=>{
  return HinosAntigo.categories
},[]);
  /* 

  const hymns = useMemo(()=>{
    return HinosAntigo.hinos
  },[]); */

  const data: dat = [
    {
      title: 'Amor da vida',
      hymns: 34
    },
    {
      title: 'Fé e oração',
      hymns: 346
    }
  ]

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <View style={defaultStyles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{paddingTop:10, paddingBottom:90}}
          showsVerticalScrollIndicator={false}>
            
          <Separator title="Hinos"/>
<<<<<<< Updated upstream
          <ListHymnsCard hymns={hymns} handleHymnSelect={handleHymnSelect} />
          <Separator title="Categorias"/>
=======
          <ListHymnsCard hymns={hymnsWithArtwork} handleHymnSelect={handleHymnSelect} />
          <Separator title="Categorias" more/>
>>>>>>> Stashed changes
          <ListCategories categories={categories}
          horizontal 
          showsHorizontalScrollIndicator={false}/>

          <CardHymnDay hymns={hymnsWithArtwork} categories={categories} />

          <Separator title="Coletâneas"/>
          <ListPlaylistsCard hymns={hymnsWithArtwork} data={data}/>

          <Separator title="Favoritos"  more>
            <HeartFullSVG color={colors.favorites} height={16} width={16}/>
          </Separator>

          <ListHymnsCard hymns={hymnsWithArtwork} handleHymnSelect={handleHymnSelect} />

          <Separator title="Hinos baixados"  more>
            <DownloadSVG color={colors.favorites} height={16} width={16}/>
          </Separator>

          <ListHymnsCard hymns={hymnsWithArtwork} handleHymnSelect={handleHymnSelect} />

      </ScrollView>
    </View>
  }
}


export default memo(HomeScreen)