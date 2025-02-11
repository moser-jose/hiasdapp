import { hymnsItem } from "@/styles"
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import HeartSVG from "../svg/heartSvg"
import ActiveHymnsDownloadSVG from "../svg/activeHymnsDownloadSvg"
import PlayCardSVG from "../svg/playCardSvg"
import { colors } from "@/constants/styles"
import { HymnsTypes, HymnTrackType } from "@/types/hymnsTypes"
import { shortName } from "@mosmmy/shortname-js"
import { Track, useActiveTrack, useIsPlaying } from "react-native-track-player"
import SpreedSVG from "../svg/spreedSvg"

function truncateText(text:string, maxLength:number = 0)  {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
}

function truncateTextWords(text: string, maxWords: number = 0): string {
    const words = text.split(" ");
    if (words.length > maxWords) {
        
        return words.slice(0, maxWords).join(" ") + "...";
    }
    //console.log(words)
    return text;
}

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
    return <TouchableOpacity  style={hymnsItem.container} onPress={()=>handleHymnSelect(track)}>
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
                    <View style={{flexDirection:'row',gap:5}}>
                    {
                        hymn.autores.map((item, index) => {
                            const isLastItem = index === hymn.autores.length - 1; 
                            const nome =item.nome ? shortName(item.nome) : 'Desconhecido'
                            const separator = !isLastItem ? ', ' : '';
                            return  (
                                <Text key={index} style={hymnsItem.baseTitle}>
                                    { nome+''+separator}
                                </Text>
                                )
                            })
                    }
                    </View>
                </View>
            </View>
            <TouchableHighlight ><HeartSVG color={colors.favorites}/></TouchableHighlight>
            <TouchableHighlight style={hymnsItem.play}><PlayCardSVG width={35} height={35} color={colors.primary}/></TouchableHighlight>
            </View>
        </TouchableOpacity>
}


export default HymnsItem


