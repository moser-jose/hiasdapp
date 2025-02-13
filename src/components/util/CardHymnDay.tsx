import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { getDailyHymn } from "@/helpers/getDailyHymn";
import { HymnsTypes, ListCategories, ListCategoriesProps, ListHymns } from "@/types/hymnsTypes";
import PlayCardSVG from "../svg/PlayCardSvg";
import { colors, fontSize } from "@/constants/styles";
import ActiveHymnsDownloadSVG from "../svg/ActiveHymnsDownloadSvg";
import SpreedSVG from "../svg/SpreedSvg";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";
import Authors from "./Authors";
import { getBackgroundSource } from "@/helpers/getBackgroundSource";
import { dateFormat } from "@/helpers/dateFormat";
import { truncateText } from "@/helpers/textsWords";

const CardHymnDay = ({hymns,categories}:{hymns:ListHymns,categories:ListCategories}) => {
  const [hymn, setHymn] = useState<HymnsTypes['hymn'] | void>();

  useEffect(() => {
    const fetchHymn = async () => {
      const hymnOfTheDay = await getDailyHymn(hymns);
      setHymn(hymnOfTheDay);
    };
    fetchHymn();
  }, [hymns]);

  const categoryUri=()=> {
    const categoryFound =categories.filter((item:ListCategoriesProps)=>item.categoria==hymn?.categoria)
    return getBackgroundSource(categoryFound?.[0]?.categoria ?? '')
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {hymn ?
        <View style={styles.container}>
            <FastImage
            source={{ uri:  categoryUri()}}
            style={styles.backgroundImage}
            resizeMode={FastImage.resizeMode.cover} 
          />
            <LinearGradient
            colors={["rgba(0, 0, 0, 0.43)", "rgba(71, 70, 70, 0.7)"]}
            style={styles.backgroundImage}
          />
          <View style={styles.content}>
            <View  style={styles.headerContent}>
              <View  style={styles.headerContentText}>
                <View style={styles.headerContentTitle}>
                  <View style={styles.title}>
                    <Text style={styles.titleText}>Hino do Dia</Text>
                    <Text style={styles.titleAno}>{new Date().getFullYear()}</Text>
                    <Text style={styles.titleCategoria}>{truncateText(hymn.categoria,12)}</Text>
                  </View>
                  <Text style={styles.titleDate}>{dateFormat(new Date())}</Text>
                </View>
                <TouchableOpacity activeOpacity={.8}>
                  <SpreedSVG color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View>
                <View style={styles.hymnHeaderContentTitle}>
                  <Text style={styles.hymnTitle}>{hymn.title}</Text>
                  <ActiveHymnsDownloadSVG color={colors.favorites} style={{marginTop:10}}/>
                </View>
                <View style={styles.hymnTitleNumberAuthorContent}>
                  <Text style={styles.hymnTitleNumber}>{hymn.numero_view}</Text>
                  <Authors styleText={styles.hymnTitleAuthor} authors={hymn.autores} card={false}/>
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
        </View>: <ActivityIndicator size="large" />}
    </View>
  );
};


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
    titleCategoria:{
        color:'white',
        padding:3,
        fontWeight:'600',
        borderRadius:8,
        fontSize:12,
        backgroundColor:colors.cards
    },
    titleDate:{
      color:'white',
      marginTop:-5,
      fontSize:12
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

export default CardHymnDay;
