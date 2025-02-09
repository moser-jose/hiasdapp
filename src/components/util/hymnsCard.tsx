import { hymnsCard } from "@/styles"
import { Text, TouchableOpacity, View } from "react-native"
import HeartSVG from "../svg/heartSvg"
import ActiveHymnsDownloadSVG from "../svg/activeHymnsDownloadSvg"
import PlayCardSVG from "../svg/playCardSvg"
import { colors } from "@/constants/styles"
import { HymnsTypes } from "@/types/hymnsTypes"
import { memo, useState } from "react"
import { shortName } from "@mosmmy/shortname-js"

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

const HymnsCard =({hymn,style}:{style?:any,hymn:HymnsTypes})=>{

    const [nameAutor, setNameAutor]=useState('')
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
                <View style={{flexDirection:'row',gap:5}}>
                {
                    hymn.autores.map((item, index) => {
                        const isLastItem = index === hymn.autores.length - 1; 
                        const nome =item.nome ? shortName(item.nome) : 'Desconhecido'
                        const separator = !isLastItem ? ', ' : '';
                        return  (
                            <Text key={index} style={hymnsCard.baseTitle}>
                                { hymn.autores.length === 1? nome +''+separator:hymn.autores.length===2?truncateText(nome ?? '', 10):hymn.autores.length>=3&&truncateText(nome ?? '', 10)}
                            </Text>
                            )
                        })
                }
                </View>
            </View>
        </View>
        <TouchableOpacity style={hymnsCard.play}><PlayCardSVG color={colors.primary}/></TouchableOpacity>
    </TouchableOpacity>
}

export default memo(HymnsCard)