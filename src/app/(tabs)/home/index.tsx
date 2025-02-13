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

          <View style={styles.container}>
              <FastImage
            source={{ uri: sonGodImage }}
            style={styles.backgroundImage}
            resizeMode={FastImage.resizeMode.cover} 
          />
            <LinearGradient
            colors={["rgba(0, 0, 0, 0.69)", "transparent"]}
            style={styles.backgroundImage}
          />
          <View style={styles.content}>
            <View  style={styles.headerContent}>
              <View  style={styles.headerContentText}>
                <View style={styles.headerContentTitle}>
                  <View style={styles.title}>
                    <Text style={styles.titleText}>Hino diário</Text>
                    <Text style={styles.titleAno}>2025</Text>
                  </View>
                  <Text style={styles.titleDate}>Quinta-Feira, 15 de Fevereiro</Text>
                </View>
                <TouchableOpacity activeOpacity={.8}>
                  <SpreedSVG color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.hymnContent}>
              <View style={styles.hymnHeaderContent}>
                <View style={styles.hymnHeaderContentTitle}>
                  <Text style={styles.hymnTitle}>Ó Adorai o Senhor</Text>
                  <ActiveHymnsDownloadSVG color={colors.favorites} style={{marginTop:10}}/>
                </View>
                <View style={styles.hymnTitleNumberAuthorContent}>
                  <Text style={styles.hymnTitleNumber}>002</Text>
                  <Text style={styles.hymnTitleAuthor}>Edwin Barnes, John S. B. Monsell</Text>
                </View>
                <View style={{justifyContent:'flex-end'}}>
                  <TouchableOpacity activeOpacity={.8} style={styles.hymnTitlePlay}>
                    <Text style={styles.hymnTitlePlayText}>Tocar Agora</Text>
                    <PlayCardSVG color={colors.primary} width={20} height={20}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  }
}

  const styles = StyleSheet.create({
    container:{
      flex:1,
      height:180,
      position: "relative",
      margin:16,
    },
    backgroundImage: {
      ...StyleSheet.absoluteFillObject, 
      borderRadius:8,
    },
    content: {
      position:'relative',
      flex: 1,
      width: '100%',
      padding:10
    },
    headerContent:{
      flex: 1,
    },
    headerContentText:{
      width: '100%',
      alignItems:'center',
      justifyContent:'space-between',
      flexDirection:'row'
    },
    headerContentTitle:{
      
    },
    title:{
      flexDirection:'row',
      gap: 8,
      alignItems: 'center'
      
    },
    titleText:{
      fontFamily:'Rochester_400Regular',
      fontSize:30,
      fontWeight:'600',
      color:'white'
    },
    titleAno:{
      color:'white',
      backgroundColor:colors.favoritesRGBA,
      padding:3,
      fontWeight:'600',
      borderRadius:8,
      fontSize:12
    },
    titleDate:{
      color:'white',
      marginTop:-5,
      fontSize:12
    },
    hymnContent:{

    },
    hymnHeaderContent:{

    },
    hymnHeaderContentTitle:{
      flexDirection:'row',
      alignItems: 'center',
      gap:6
    },
    hymnTitle:{
      color:'white',
      fontSize:32,
      fontFamily:'Sacramento_400Regular',
      marginBottom:-12,
    },
    hymnTitleNumberAuthorContent:{
      flexDirection:'row',
      gap:6,
      alignItems:'center'
    },
    hymnTitleNumber:{
      color:'white',
      fontWeight:'bold',
      fontSize:fontSize.base
    },
    hymnTitleAuthor:{
      color:colors.third,
      fontSize:12
    },
    hymnTitlePlay:{
      backgroundColor:colors.favorites,
      paddingVertical:4,
      paddingHorizontal:6,
      borderRadius:10,
      flexDirection: "row",
      alignItems:'center',
      gap:6,
      alignSelf:'flex-end'
    },
    hymnTitlePlayText:{
      color:'white',
      fontFamily:'PlusJakartaSans_500Medium',
    }
    
  });

export default memo(HomeScreen)