import { FlatList} from "react-native"
import {ListHymnsProps} from "@/types/hymnsTypes"
import TrackPlayer, { Track, useIsPlaying } from "react-native-track-player"
import HymnsCard from "./HymnsCard"

export const ListHymnsCard = ({hymns,...listHymnsProps}:ListHymnsProps)=>{
    const { playing  } = useIsPlaying()

    const handleHymnSelect= async (hymn:Track)=>{
       await TrackPlayer.load(hymn)
       if (playing) await TrackPlayer.pause(); else await TrackPlayer.play()
    }
    
    return <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    data={hymns}
    renderItem={({item:hymn, index})=><HymnsCard  hymn={hymn} onHymnSelect={handleHymnSelect}
    style={[{ marginLeft: index === 0 ? 16 : 16, 
        marginRight: index === hymns.length - 1 ? 16 : 0, },
    ]}/>}
    {...listHymnsProps}
    />
}