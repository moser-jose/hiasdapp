import { ListHymns } from "@/components/util/ListHymns"
import { useNavigationSearch } from "@/hooks/useNavigationSearch"
import { defaultStyles } from "@/styles"
import { View, ScrollView, FlatList } from "react-native"
import HinosAntigo from '@/api/hiasd-antigo.json'
import { ListHymnsFilter } from "@/helpers/filter"
import { useMemo } from "react"
import CategoryCard from "@/components/util/CategoryCard"
const CategoriesScreen=()=>{
   


    const categoriesData = useMemo(()=>{
        return HinosAntigo.categorias
    },[]);

    return <View style={[defaultStyles.container]}>
        <ScrollView contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{marginRight:16}}>
            
        <FlatList
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      data={categoriesData}
      numColumns={2}
      renderItem={({item:HymnsCategoriesTypes,index})=><CategoryCard index={index % 2 !== 0} data={HymnsCategoriesTypes}
      
      />}
    />
        </ScrollView>
    </View>
}


export default CategoriesScreen