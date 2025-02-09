import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"

const HymnsScreenLayout = ()=>{
    return <View style={defaultStyles.container}>
        <Stack>
            <Stack.Screen name="index" options={{
                headerTitle:'Hinos'
            }}/>
        </Stack>
    </View>
}


export default HymnsScreenLayout