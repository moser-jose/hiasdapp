import { colors } from "@/constants/styles";
import { truncateText } from "@/helpers/textsWords";
import { Author } from "@/types/hymnsTypes";
import { shortName } from "@mosmmy/shortname-js";
import { Text, View,StyleSheet, StyleProp, TextStyle } from "react-native";

const Authors =({authors,styleText, card}:{authors:Author[],card:boolean,styleText?:StyleProp<TextStyle>})=>{

    return (
        <View style={styles.container}>
            {
                authors?.map((item:Author, index:number) => {
                    const isLastItem = index === authors.length - 1; 
                    const name =item.name ? shortName(item.name) : 'Desconhecido'
                    const separator = !isLastItem ? ', ' : '';
                    return  (
                        <Text key={index} style={styleText?styleText:styles.hymnTitleBase}>
                            {card ? authors.length === 1? name +''+separator:authors.length===2?truncateText(name ?? '', 10):authors.length>=3&&truncateText(name ?? '', 10):name+''+separator }
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