import { memo, useState } from "react"
import { hymnsCard } from "@/styles"
import { Text, TouchableOpacity, View } from "react-native"
import HeartSVG from "../svg/HeartSvg"
import ActiveHymnsDownloadSVG from "../svg/ActiveHymnsDownloadSvg"
import PlayCardSVG from "../svg/PlayCardSvg"
import { colors } from "@/constants/styles"
import { HymnsTypes } from "@/types/hymnsTypes"
import { truncateText } from "@/helpers/textsWords"
import Authors from "./Authors"


const HymnsCard =({hymn,style}:{style?:any,hymn:HymnsTypes['hymn']})=>{

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
                <Authors authors={hymn.autores} card={true}/>
                
            </View>
        </View>
        <TouchableOpacity style={hymnsCard.play}><PlayCardSVG color={colors.primary}/></TouchableOpacity>
    </TouchableOpacity>
}

export default memo(HymnsCard)