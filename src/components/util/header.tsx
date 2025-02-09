import { TouchableOpacity, View,Text,StyleSheet } from "react-native"
import LogoSVG from "../svg/logoSVG"
import ChangeHymnsSVG from "../svg/changeHymnsSVG"
import Topic from "./topic"
import { colors } from "@/constants/styles"

const Header=({title,text,year}:{title:string,text:string,year:string})=>{
    return (
        <View style={styles.container}>
            <LogoSVG color="#29C17E"/>
            <View >
                <Text style={styles.title}>{title}</Text>
                <View style={styles.view}>
                    <Text style={styles.text}>{text}</Text>
                    <Topic text={year}/>
                </View>
            </View>
            <TouchableOpacity><ChangeHymnsSVG color="#1C274C"/></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection:'row',
        paddingHorizontal:16,
        paddingVertical:10
    },
    title:{
        fontSize: 18, 
        color:colors.text, 
        fontFamily:'PlusJakartaSans_500Medium' 
    },
    view:{
        flexDirection: "row", 
        justifyContent:'center',
        alignItems:'center' 
    },
    text:{ 
        fontSize: 20,
        color:'#61788A',
        fontFamily: 'BirthstoneBounce_500Medium' 
    }
})

export default Header