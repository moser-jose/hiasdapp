import { colors } from "@/constants/styles"
import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"

const HymnsScreenLayout = ()=>{
    return <View style={defaultStyles.container}>
        <Stack>
            <Stack.Screen name="index" options={{
                headerLargeTitle:true,
                headerLargeStyle:{
                    backgroundColor:colors.background
                },
                headerLargeTitleStyle:{
                    color:colors.text
                },
                headerTintColor:colors.text,
                headerBlurEffect:'prominent',
                headerShadowVisible:true,
                headerTransparent:true,

                headerTitle:'Hinos'
            }}/>
        </Stack>
    </View>
}


export default HymnsScreenLayout