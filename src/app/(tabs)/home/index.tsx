import Separator from "@/components/util/Separator"
import { defaultStyles} from "@/styles"
import { View,Text,ScrollView, FlatList} from "react-native"
import { Track } from "react-native-track-player"
import TrackPlayer from "react-native-track-player/lib/src/trackPlayer"
import { ListHymnsCard } from "@/components/util/ListHymnsCard"
import HinosAntigo from '@/api/hiasd-antigo.json'
import { memo, useMemo } from "react"
import CategoryCard from "@/components/util/CategoryCard"

const HomeScreen=()=>{

  const hymns = useMemo(()=>{
    return HinosAntigo.hinos
  },[]);

    const handleHymnSelect= async (hymn:Track)=>{
       await TrackPlayer.load(hymn)
    }


    const categoriesData = useMemo(()=>{
      return HinosAntigo.categorias
  },[]);

    return <View style={defaultStyles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <Text style={defaultStyles.text}>Home Screen</Text>
          <Separator title="Hinos"/>
          <ListHymnsCard hymns={hymns} handleHymnSelect={handleHymnSelect} />
          
          <Separator title="Categorias"/>
          <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categoriesData}
          renderItem={({item:HymnsCategoriesTypes,index})=><CategoryCard index={index % 2 !==0} data={HymnsCategoriesTypes}
        />}
  />
      </ScrollView>
    </View>
}

export default memo(HomeScreen)