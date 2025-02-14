import { colors } from "@/constants/styles";
import { truncateText } from "@/helpers/textsWords";
import { HymnTrackType } from "@/types/hymnsTypes";
import { shortName } from "@mosmmy/shortname-js";
import { Text, View,StyleSheet, StyleProp, TextStyle } from "react-native";

const Authors =({authors,styleText, card}:{authors:HymnTrackType['hymn']['authors'],card:boolean,styleText?:StyleProp<TextStyle>})=>{

    return (
        <View style={styles.container}>
            {
                authors?.map((item:HymnTrackType, index:number) => {
                    const isLastItem = index === authors.length - 1; 
                    const nome =item.nome ? shortName(item.nome) : 'Desconhecido'
                    const separator = !isLastItem ? ', ' : '';
                    return  (
                        <Text key={index} style={styleText?styleText:styles.hymnTitleBase}>
                            {card ? authors.length === 1? nome +''+separator:authors.length===2?truncateText(nome ?? '', 10):authors.length>=3&&truncateText(nome ?? '', 10):nome+''+separator }
                        </Text>
                    )
                 })
            }
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        gap:5
    },
    hymnTitleBase:{
        color:colors.textMuted,
        fontSize:12,
        width:'auto',
    }
})

export default Authors