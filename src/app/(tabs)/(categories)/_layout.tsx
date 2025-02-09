import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"

const CategoriesScreenLayout = ()=>{
    return <View style={defaultStyles.container}>
        <Stack>
            <Stack.Screen name="index" options={{
                headerTitle:'Categorias'
            }}/>
        </Stack>
    </View>
}


export default CategoriesScreenLayout