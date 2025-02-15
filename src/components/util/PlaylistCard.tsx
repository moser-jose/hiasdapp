import {Text,TouchableOpacity, View, ViewStyle } from "react-native"

import {truncateTextWords } from "@/helpers/textsWords"
import { StyleSheet } from "react-native"
import SongSVG from "../svg/SongSvg"
import { colors, fontSize } from "@/constants/styles"
type dat=
    {
      title:string
      hymns:number
    }

const PlaylistCard=({playlist, style}:{style:ViewStyle, playlist:dat})=>{
   
    return <TouchableOpacity activeOpacity={.8}  style={[styles.container, style]}>
            <View style={styles.icon}>
                <SongSVG color={colors.primary}/>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{truncateTextWords(playlist.title,3)}</Text>
                <Text style={styles.hymns}>{playlist.hymns}</Text>
            </View>
    </TouchableOpacity>
} 

const styles=StyleSheet.create({
	container: {
        backgroundColor:'rgba(87, 86, 86, 0.12)',
        flexDirection:'row',
        alignItems:'center',
        marginRight:20,
        justifyContent:'space-between',
        padding:10,
        borderRadius:14,
        gap:10

	},
    icon:{
        height:45,
        width:45,
        backgroundColor:'rgba(87, 86, 86, 0.14)',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
        
    },
    content:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        justifyContent:'space-between',
    },
	title:{
        fontSize:fontSize.base,
        fontFamily:'PlusJakartaSans_400Regular'
    },
    hymns:{
        fontSize:fontSize.smB,
        backgroundColor:colors.favoritesRGBA,
        borderRadius:6,
        padding:6,
        fontFamily:'PlusJakartaSans_400Regular'
    },

});

export default PlaylistCard