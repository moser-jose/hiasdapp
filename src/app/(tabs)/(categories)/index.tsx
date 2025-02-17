import { defaultStyles } from "@/styles"
import { View, ScrollView } from "react-native"
import HinosAntigo from '@/api/hiasd-old.json'
import { useMemo } from "react"
import { ListCategories } from "@/components/util/ListCategories"
import { ListCategoriesProps } from "@/types/hymnsTypes"
const CategoriesScreen=()=>{
   
    const categories:ListCategoriesProps['categories'] = useMemo(()=>{
        return HinosAntigo.categories
    },[]);

    return <View style={[defaultStyles.container]}>
        <ScrollView contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{marginRight:16}}>
        <ListCategories categories={categories}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={2}/>
        </ScrollView>
    </View>
}


export default CategoriesScreen