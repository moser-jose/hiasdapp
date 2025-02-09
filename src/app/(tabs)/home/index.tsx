
import HymnsCard from "@/components/util/hymnsCard"
import Separator from "@/components/util/separator"
import { screenPadding } from "@/constants/styles"
import { defaultStyles, scrollViewHorizontal } from "@/styles"
import { View,Text,ScrollView } from "react-native"
import HiasdAntigo from '../../../api/hiasd-antigo.json'
import HiasdNovo from '../../../api/hiasd-novo.json'
import { HymnsTypes } from "@/types/hymnsTypes"
import { useMemo,memo } from "react"


const HomeScreen=()=>{

    const Hinos=useMemo(() => {
        return HiasdAntigo
    },[])


    return <View style={defaultStyles.container}>
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
         /* style={{paddingHorizontal: screenPadding.horizontal}} */>
        <Text style={defaultStyles.text}>Home Screen</Text>
        <Separator title="Hinos"/>
        <ScrollView
        style={scrollViewHorizontal.horizontal}
         horizontal={true}
         showsHorizontalScrollIndicator={false}>

        {Array.isArray(Hinos?.hinos) && Hinos.hinos.map((item:HymnsTypes, index:number) => {
            const hymnFormatted: HymnsTypes = {
                ...item,
            };
            return (<HymnsCard hymn={hymnFormatted} key={index} style={[{ marginLeft: index === 0 ? 16 : 16, 
                    marginRight: index === Hinos.hinos.length - 1 ? 16 : 0, },
                ]}/> ) 
            })}
        </ScrollView>
    </ScrollView>
    </View>

    
}


export default HomeScreen