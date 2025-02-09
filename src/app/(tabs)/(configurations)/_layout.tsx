import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"

const ConfigurationsScreenLayout = ()=>{
    return <View style={defaultStyles.container}>
        <Stack>
            <Stack.Screen name="index" options={{
                headerTitle:'Configurações'
            }}/>
        </Stack>
    </View>
}


export default ConfigurationsScreenLayout