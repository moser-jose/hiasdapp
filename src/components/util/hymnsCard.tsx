import { memo } from "react"
import { hymnsCard } from "@/styles"
import { Text, TouchableOpacity, View } from "react-native"
import HeartSVG from "../svg/HeartSvg"
import ActiveHymnsDownloadSVG from "../svg/ActiveHymnsDownloadSvg"
import PlayCardSVG from "../svg/PlayCardSvg"
import { colors } from "@/constants/styles"
import { HymnsTypes, HymnTrackType } from "@/types/hymnsTypes"
import { truncateText } from "@/helpers/textsWords"
import Authors from "./Authors"
import { useActiveTrack, useIsPlaying } from "react-native-track-player"
import PauseCardSVG from "../svg/PauseCardSvg"

const HymnsCard =({hymn,style,onHymnSelect:handleHymnSelect}:HymnsTypes)=>{

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

    return <TouchableOpacity style={[hymnsCard.container,style]}> 
        <View style={hymnsCard.card}>
            <Text style={hymnsCard.number}>{hymn.numero}</Text>
            <View style={hymnsCard.ViewCard}>
                <View style={hymnsCard.cardTittle}>
                    <View style={hymnsCard.viewTittle}>
                        <Text style={hymnsCard.title}>{truncateText(hymn.title,13)}</Text>
                        <ActiveHymnsDownloadSVG color={colors.favorites}/>
                    </View>
                    <TouchableOpacity><HeartSVG color={colors.favorites}/></TouchableOpacity>
                </View>
                
                <Text style={hymnsCard.baseTitle}>{hymn.ingles}</Text>
                <Authors authors={hymn.autores} card={true}/>
                
            </View>
        </View>
        <TouchableOpacity style={hymnsCard.play}  onPress={()=>handleHymnSelect(track)}>
            {playing ? <PauseCardSVG color={colors.primary}/>:<PlayCardSVG color={colors.primary}/>}
        </TouchableOpacity>
    </TouchableOpacity>
}
export default memo(HymnsCard)