import { ScrollView } from 'react-native'
import { memo } from 'react'
import { ListCategories } from '@/components/util/ListCategories'
import { useLibraryStore } from '@/store/library'
import { useShallow } from 'zustand/react/shallow'
import { defaultStyles } from '@/styles'
const CategoriesScreen = () => {
  const { categories } = useLibraryStore(
    useShallow(state => ({
      categories: state.categories,
    }))
  )

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={[defaultStyles.container, { paddingRight: 16 }]}
    >
      <ListCategories
        categories={categories}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        numColumns={2}
      />
    </ScrollView>
  )
}

export default memo(CategoriesScreen)
