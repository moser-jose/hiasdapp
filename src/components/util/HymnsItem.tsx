import { hymnsItem } from "@/styles"
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import HeartSVG from "../svg/HeartSvg"
import ActiveHymnsDownloadSVG from "../svg/ActiveHymnsDownloadSvg"
import PlayCardSVG from "../svg/PlayCardSvg"
import { colors } from "@/constants/styles"
import { HymnsTypes, HymnTrackType } from "@/types/hymnsTypes"
import { useActiveTrack, useIsPlaying } from "react-native-track-player"
import SpreedSVG from "../svg/SpreedSvg"
import Authors from "./Authors"
import { truncateText } from "@/helpers/textsWords"

const HymnsItem=({hymn, onHymnSelect:handleHymnSelect}:HymnsTypes)=>{
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

    return <TouchableOpacity  style={hymnsItem.container}>
            <View style={hymnsItem.card}>
            <SpreedSVG color={colors.textMuted}/>
            <View style={hymnsItem.cardMore}>
                <View style={hymnsItem.numberCard}>
                    <Text style={hymnsItem.number}>{hymn.numero}</Text>
                    <ActiveHymnsDownloadSVG color={colors.favorites}/>
                    {hymn.texto_biblico &&<Text style={hymnsItem.baseTitle}>{hymn.texto_biblico}</Text>}
                </View>
                <View style={hymnsItem.ViewCard}>
                    <Text style={hymnsItem.title}>{truncateText(hymn.title,29)}</Text>
                    <Text style={hymnsItem.baseTitle}>{hymn.ingles}</Text>
                    <Authors authors={hymn.autores} card={false}/>
                </View>
            </View>
            <TouchableHighlight ><HeartSVG color={colors.favorites}/></TouchableHighlight>
            <TouchableHighlight style={hymnsItem.play}  onPress={()=>handleHymnSelect(track)}><PlayCardSVG width={35} height={35} color={colors.primary}/></TouchableHighlight>
            </View>
        </TouchableOpacity>
}


export default HymnsItem


