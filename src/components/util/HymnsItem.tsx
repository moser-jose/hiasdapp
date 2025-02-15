import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import HeartSVG from "../svg/HeartSvg"
import ActiveHymnsDownloadSVG from "../svg/ActiveHymnsDownloadSvg"
import PlayCardSVG from "../svg/PlayCardSvg"
import { colors, fontSize } from "@/constants/styles"
import { HymnsTypes, HymnTrackType } from "@/types/hymnsTypes"
import { useActiveTrack, useIsPlaying } from "react-native-track-player"
import SpreedSVG from "../svg/SpreedSvg"
import Authors from "./Authors"
import { truncateText } from "@/helpers/textsWords"
import { StyleSheet } from "react-native"
import { useState } from "react"
import HeartFullSVG from "../svg/HeartFullSvg"

const HymnsItem=({hymn, onHymnSelect:handleHymnSelect}:HymnsTypes)=>{
	const [favorites, setFavorites] =useState(false)
    const { playing } = useIsPlaying()
    
    const isActiveHymn=useActiveTrack()?.url===hymn.url

    const track:HymnTrackType={
            id:hymn.numero,
            numberView:hymn.numero_view,
            titleIngles:hymn.ingles,
            authors:hymn.autores,
            title:hymn.title,
            url:hymn.url,
            artwork:hymn.artwork,
            artist:hymn.artist
    }

	

    return <TouchableOpacity  style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardSpreed}>
                    <TouchableOpacity style={styles.cardSpreedTouch}><SpreedSVG color={colors.textMuted}/></TouchableOpacity>
                </View>
            <View style={styles.cardMore}>
                <View style={styles.numberCard}>
                    <Text style={styles.number}>{hymn.numero}</Text>
                    <ActiveHymnsDownloadSVG color={colors.favorites}/>
                    {hymn.texto_biblico &&<Text style={styles.baseTitle}>{hymn.texto_biblico}</Text>}
                </View>
                <View style={styles.ViewCard}>
                    <Text style={styles.title}>{truncateText(hymn.title,29)}</Text>
                    <Text style={styles.baseTitle}>{hymn.ingles}</Text>
                    <Authors authors={hymn.autores} card={false}/>
                </View>
            </View>
            <TouchableOpacity activeOpacity={.8} onPress={()=>setFavorites(!favorites)} >
				{
					favorites===true ? <HeartFullSVG color={colors.favorites}/>:<HeartSVG color={colors.favorites}/>
				}
			</TouchableOpacity>
            <TouchableHighlight  onPress={()=>handleHymnSelect(track)}><PlayCardSVG width={35} height={35} color={colors.primary}/></TouchableHighlight>
            </View>
        </TouchableOpacity>
}


const styles=StyleSheet.create({
	container: {
		position:'relative',
		justifyContent: 'space-between',
		flexDirection:'row',
		alignItems: 'center',
		marginHorizontal:16,
		marginRight:16,
	},
	number:{
		fontSize:fontSize.base,
		fontWeight:'500',
		color:colors.primary
	},
	cardMore:{
		flex:1
	},
	numberCard:{
		flexDirection: 'row',
		alignItems: 'center',
		gap:6,
	},
	card: {
		position:'relative',
		flexDirection: 'row',
		alignItems: 'center',
		gap:16,
	},
    cardSpreed:{
            alignItems: 'center',
    },
    cardSpreedTouch:{
        flex:1,
        padding:4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
	ViewCard:{
		flex:1
	},
	cardTittle:{
		position:'relative',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title:{
		fontSize:fontSize.base,
		color:colors.text
	},
	baseTitle:{
		fontSize:fontSize.xss,
		color:colors.textMuted
	}
});

export default HymnsItem


