import Separator from "@/components/util/Separator"
import { defaultStyles} from "@/styles"
import { View,Text,ScrollView} from "react-native"
import { Track } from "react-native-track-player"
import TrackPlayer from "react-native-track-player/lib/src/trackPlayer"
import { ListHymnsCard } from "@/components/util/ListHymnsCard"
import HinosAntigo from '@/api/hiasd-antigo.json'
import { memo, useMemo } from "react"
import { ListCategories } from "@/components/util/ListCategories"

const HomeScreen=()=>{

  const handleHymnSelect= async (hymn:Track)=>{
    await TrackPlayer.load(hymn)
 }

  const categories = useMemo(()=>{
    return HinosAntigo.categorias
  },[]);

  const hymns = useMemo(()=>{
    return HinosAntigo.hinos
  },[]);

    return <View style={defaultStyles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <Separator title="Hinos"/>
          <ListHymnsCard hymns={hymns} handleHymnSelect={handleHymnSelect} />
          <Separator title="Categorias"/>
          <ListCategories categories={categories}
          horizontal 
          showsHorizontalScrollIndicator={false}/>
      </ScrollView>
    </View>
}

export default memo(HomeScreen)