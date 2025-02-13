import Separator from "@/components/util/Separator"
import { defaultStyles} from "@/styles"
import { View,Text,ScrollView, StyleSheet, TouchableOpacity} from "react-native"
import { Track } from "react-native-track-player"
import TrackPlayer from "react-native-track-player/lib/src/trackPlayer"
import { ListHymnsCard } from "@/components/util/ListHymnsCard"
import HinosAntigo from '@/api/hiasd-antigo.json'
import { memo, useMemo } from "react"
import { ListCategories } from "@/components/util/ListCategories"
import { colors, fontSize } from "@/constants/styles"
import LinearGradient from "react-native-linear-gradient"
import FastImage from "react-native-fast-image"
import { sonGodImage } from "@/constants/images"
import { useFonts } from "expo-font"
import { Rochester_400Regular } from '@expo-google-fonts/rochester';
import {Sacramento_400Regular} from '@expo-google-fonts/sacramento'
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
} from '@expo-google-fonts/plus-jakarta-sans';
import AppLoading from "expo-app-loading"
import SpreedSVG from "@/components/svg/SpreedSvg"
import ActiveHymnsDownloadSVG from "@/components/svg/ActiveHymnsDownloadSvg"
import PlayCardSVG from "@/components/svg/PlayCardSvg"
import PauseCardSVG from "@/components/svg/PauseCardSvg"
import CardHymnDay from "@/components/util/CardHymnDay"

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

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <View style={defaultStyles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <Separator title="Hinos"/>
          <ListHymnsCard hymns={hymns} handleHymnSelect={handleHymnSelect} />
          <Separator title="Categorias"/>
          <ListCategories categories={categories}
          horizontal 
          showsHorizontalScrollIndicator={false}/>

          <CardHymnDay hymns={hymns} categories={categories}  />

      </ScrollView>
    </View>
  }
}


export default memo(HomeScreen)