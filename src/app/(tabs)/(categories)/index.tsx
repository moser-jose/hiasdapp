import { ListHymns } from "@/components/util/ListHymns"
import { useNavigationSearch } from "@/hooks/useNavigationSearch"
import { defaultStyles } from "@/styles"
import { View, ScrollView, FlatList } from "react-native"
import HinosAntigo from '@/api/hiasd-antigo.json'
import { ListHymnsFilter } from "@/helpers/filter"
import { useMemo } from "react"
import CategoryCard from "@/components/util/CategoryCard"
import { ListCategories } from "@/components/util/ListCategories"
const CategoriesScreen=()=>{
   


    const categories = useMemo(()=>{
        return HinosAntigo.categorias.map((category,index)=>category)
    },[]);

    return <View style={[defaultStyles.container]}>
        <ScrollView contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{marginRight:16}}>
        <ListCategories categories={categories}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={2}/>
            
        {/* <FlatList
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      data={categoriesData}
      numColumns={2}
      renderItem={({item:HymnsCategoriesTypes,index})=><CategoryCard index={index % 2 !== 0} data={HymnsCategoriesTypes}/>}
    /> */}
        </ScrollView>
    </View>
}


export default CategoriesScreen