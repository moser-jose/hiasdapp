import { FlatList} from "react-native"
import {ListPlaylistsProps} from "@/types/hymnsTypes"

import PlaylistCard from "./PlaylistCard"

export const ListPlaylistsCard = ({data, ...listHymnsProps}:ListPlaylistsProps)=>{
     
    return <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item:list,index})=><PlaylistCard 
          playlist={list}
          style={index === 0 && { marginLeft: 16 }}
          {...listHymnsProps}/>}
          />
}