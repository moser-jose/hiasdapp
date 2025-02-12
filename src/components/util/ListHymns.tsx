import { FlatList, View } from "react-native"
import HymnsItem from "./HymnsItem"
import {ListHymnsProps} from "@/types/hymnsTypes"
import { utilsStyles } from "@/styles"
import { Text } from "react-native"
import TrackPlayer, { Track } from "react-native-track-player"
import ItemDivider from "./ItemDivider"

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
    renderItem={({item:hymn})=><HymnsItem hymn={hymn} onHymnSelect={handleHymnSelect}/>}
    {...listHymnsProps}
    />
}