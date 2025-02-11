import LogoSVG from "@/components/svg/LogoSVG";
import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View,Text,SafeAreaView, TouchableOpacity, ScrollView } from "react-native"
import AppLoading from 'expo-app-loading';
import { useFonts } from "expo-font";
import {BirthstoneBounce_500Medium} from '@expo-google-fonts/birthstone-bounce';
import { PlusJakartaSans_500Medium, } from '@expo-google-fonts/plus-jakarta-sans';


import { colors } from "@/constants/styles";
import ChangeHymnsSVG from "@/components/svg/ChangeHymnsSVG";
import Topic from "@/components/util/Topic";
import Header from "@/components/util/Header";



const HeaderComponent = () => {
    const [fontsLoaded] = useFonts({
        PlusJakartaSans_500Medium,
        BirthstoneBounce_500Medium
      });
      if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return( 
        <SafeAreaView>
            <Header title="Hinos Adventistas" text="Novo" year="2022"/>
        </SafeAreaView>)}
    };

const HomeScreenLayout = ()=>{
    return <View style={defaultStyles.container}>
        <Stack>
            <Stack.Screen name="index" options={{
                header:() => <HeaderComponent  />,
            }}/>
        </Stack>
    </View>
}

export default HomeScreenLayout