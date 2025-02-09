import { View,Text } from "react-native"
import { defaultStyles } from "@/styles"

const Separator = ({title,more}:{title:string,more?:string})=>{
    return (
        <View style={defaultStyles.container}>
            <Text style={defaultStyles.text}>{title}</Text>
            {more && <Text style={defaultStyles.text}>{more}</Text>}
        </View>
    )
}

export default Separator