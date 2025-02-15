import Separator from "@/components/util/Separator"
import { defaultStyles} from "@/styles"
import { View,ScrollView, FlatList} from "react-native"
import { Track } from "react-native-track-player"
import TrackPlayer from "react-native-track-player/lib/src/trackPlayer"
import { ListHymnsCard } from "@/components/util/ListHymnsCard"
import HinosAntigo from '@/api/hiasd-antigo.json'
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
import PlaylistCard from "@/components/util/PlaylistCard"

type dat=[
    {
      title:string
      hymns:number
    }

]



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

  const categories = useMemo(()=>{
    return HinosAntigo.categorias
  },[]);

  const hymns = useMemo(()=>{
    return HinosAntigo.hinos
  },[]);

  const data:dat=[
    {
      title:'Amor da vida',
      hymns:34
    },{
      title:'Fé e oração',
      hymns:346
    },
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
          <ListHymnsCard hymns={hymns} handleHymnSelect={handleHymnSelect} />
          <Separator title="Categorias"/>
          <ListCategories categories={categories}
          horizontal 
          showsHorizontalScrollIndicator={false}/>

          <CardHymnDay hymns={hymns} categories={categories}  />

          <Separator title="Playlists"/>
          <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item:dat,index})=><PlaylistCard playlist={dat}
          style={[{marginLeft: index === 0 ? 16 : 0}]}/>}
          />

      </ScrollView>
    </View>
  }
}


export default memo(HomeScreen)