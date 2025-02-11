import { FlatList, FlatListProps, View } from "react-native"
import HymnsItem from "./HymnsItem"
import {HymnsTypes} from "@/types/hymnsTypes"
import { utilsStyles } from "@/styles"
import { Text } from "react-native"
import TrackPlayer, { Track } from "react-native-track-player"

export type ListHymnsProps = Partial<FlatListProps<HymnsTypes['hymn']>>&{
    hymns:HymnsTypes['hymn'][]
}
const ItemDivider =()=>{
    return <View style={{...utilsStyles.itemSeparator, marginVertical:9, marginLeft:16}}></View>
}
export const ListHymns = ({hymns,...listHymnsProps}:ListHymnsProps)=>{
    
    

    const handleHymnSelect= async (hymn:Track)=>{
       await TrackPlayer.load(hymn)
    }
    
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
      renderItem={({item:hymn})=><HymnsItem hymn={hymn} onHymnSelect={handleHymnSelect}/>}
      {...listHymnsProps}
    />
}