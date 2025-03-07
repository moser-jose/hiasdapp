import { defaultStyles } from '@/styles'
import { View, ScrollView } from 'react-native'
import { memo } from 'react'
import { ListCategories } from '@/components/util/ListCategories'
import { useCategories } from '@/store/library'
const CategoriesScreen = () => {
  const categories = useCategories()
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
          /* maxToRenderPerBatch={10}
          removeClippedSubviews={true}
          windowSize={5}
          initialNumToRender={8} */
          numColumns={2}
        />
      </ScrollView>
    </View>
  )
}

export default memo(CategoriesScreen)
