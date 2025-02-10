import { FlatList, FlatListProps, View } from "react-native"
import HinosAntigo from '../../api/hiasd-antigo.json'
import HymnsItem from "./HymnsItem"
import HymnsTypes from "@/types/hymnsTypes"
import { utilsStyles } from "@/styles"
import { Text } from "react-native"

export type ListHymnsProps = Partial<FlatListProps<unknown>>&{
    hymns:any[]
}
const ItemDivider =()=>{
    return <View style={{...utilsStyles.itemSeparator, marginVertical:9, marginLeft:16}}></View>
}
export const ListHymns = ({hymns,...listHymnsProps}:ListHymnsProps)=>{
    return <FlatList
    contentContainerStyle={{paddingTop:16, paddingBottom:128}}
    ListFooterComponent={ItemDivider}
      data={hymns}
      ItemSeparatorComponent={ItemDivider}
      ListEmptyComponent={
        <View>
            <Text style={utilsStyles.emptyContentText}>No hymns found</Text>
        </View>
    }
      //keyExtractor={(item, index) => item.id === index}
      renderItem={({item:hymn})=><HymnsItem hymn={
        {...hymn}
      }/>}
      {...listHymnsProps}
    />
}