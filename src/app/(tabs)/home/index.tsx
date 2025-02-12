import Separator from "@/components/util/Separator"
import { defaultStyles} from "@/styles"
import { View,Text,ScrollView} from "react-native"
import { Track } from "react-native-track-player"
import TrackPlayer from "react-native-track-player/lib/src/trackPlayer"
import { ListHymnsCard } from "@/components/util/ListHymnsCard"
import HinosAntigo from '@/api/hiasd-antigo.json'
import { memo, useMemo } from "react"

const HomeScreen=()=>{

  const hymns = useMemo(()=>{
    return HinosAntigo.hinos
  },[]);

    const handleHymnSelect= async (hymn:Track)=>{
       await TrackPlayer.load(hymn)
    }

    return <View style={defaultStyles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <Text style={defaultStyles.text}>Home Screen</Text>
          <Separator title="Hinos"/>
          <ListHymnsCard hymns={hymns} handleHymnSelect={handleHymnSelect} />
        </ScrollView>
    </View>
}

export default memo(HomeScreen)