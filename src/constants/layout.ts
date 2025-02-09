import { NativeStackNavigationOptions } from "react-native-screens/native-stack";
import { colors } from "./styles";

export const StackScreenWithSearchBar:NativeStackNavigationOptions={
    headerLargeTitle:true,
    headerLargeStyle:{
        backgroundColor:colors.background
    },
    headerLargeTitleStyle:{
        color:colors.text
    },
    headerTintColor:colors.text,
}