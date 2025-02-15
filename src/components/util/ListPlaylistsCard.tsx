import { FlatList} from "react-native"
import {ListPlaylistsProps} from "@/types/hymnsTypes"

import PlaylistCard from "./PlaylistCard"

export const ListPlaylistsCard = ({playlist,...listHymnsProps}:ListPlaylistsProps)=>{
     
    return <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={playlist}
          renderItem={({item:list,index})=><PlaylistCard playlist={list}
          style={[{marginLeft: index === 0 ? 16 : 0}]}
          {...listHymnsProps}/>}
          />
}