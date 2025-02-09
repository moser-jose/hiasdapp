import { colors } from "@/constants/styles"
import { Text,StyleSheet} from "react-native"

const Topic = ({ text }: { text: string }) => {
    return (
        <Text style={styles.text}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        backgroundColor:colors.favoritesRGBA,
        justifyContent:'center',
        alignItems:'center',
        padding:4,
        borderRadius:10,
        fontSize:10,
        marginLeft:4,
        color:colors.text
    }
})

export default Topic