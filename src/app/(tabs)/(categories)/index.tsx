import { defaultStyles } from '@/styles'
import { View, ScrollView } from 'react-native'
import { memo } from 'react'
import { ListCategories } from '@/components/util/ListCategories'
import { useLibraryStore } from '@/store/library'
import { useShallow } from 'zustand/react/shallow'
const CategoriesScreen = () => {
  const { categories } = useLibraryStore(
    useShallow(state => ({
      categories: state.categories,
    }))
  )

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{ marginRight: 16 }}
      >
        <ListCategories
          categories={categories}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          numColumns={2}
        />
      </ScrollView>
    </View>
  )
}

export default memo(CategoriesScreen)
