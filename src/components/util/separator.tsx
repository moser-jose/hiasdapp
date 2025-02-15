import { View,Text, StyleSheet, TouchableOpacity } from "react-native"
import { fontSize } from "@/constants/styles"

const Separator = ({title,more}:{title:string,more?:boolean})=>{
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {more && <TouchableOpacity activeOpacity={0.8}><Text style={styles.more}>Ver mais</Text></TouchableOpacity>}
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        paddingHorizontal:fontSize.sm,
        justifyContent:'space-between',
        marginVertical:8
    },
    title:{
        fontSize:fontSize.base,
        fontWeight:'500'
    },
    more:{
        fontSize:fontSize.sm
    },


})

export default Separator