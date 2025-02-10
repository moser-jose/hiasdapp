
import HymnsCard from "@/components/util/hymnsCard"
import Separator from "@/components/util/separator"
import { screenPadding } from "@/constants/styles"
import { defaultStyles, scrollViewHorizontal } from "@/styles"
import { View,Text,ScrollView, FlatList, FlatListProps } from "react-native"
import HiasdAntigo from '../../../api/hiasd-antigo.json'
import HiasdNovo from '../../../api/hiasd-novo.json'
import { HymnsTypes } from "@/types/hymnsTypes"
import { useMemo,memo } from "react"

export type ListHymnsProps = Partial<FlatListProps<unknown>>
const HomeScreen=({...listHymnsProps}:ListHymnsProps)=>{

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

    <FlatList
      scrollEnabled={false}
      data={Hinos.hinos}    
      horizontal
      renderItem={({item:HymnsTypes,index})=><HymnsCard
      style={[{ marginLeft: index === 0 ? 16 : 16, 
        marginRight: index === Hinos.hinos.length - 1 ? 16 : 0, },
    ]} hymn={
        {...HymnsTypes}
      }/>}
      {...listHymnsProps}
    />
        </ScrollView>
    </ScrollView>
    </View>

    
}


export default HomeScreen