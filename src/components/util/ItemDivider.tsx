import { utilsStyles } from '@/styles'
import { View } from 'react-native'

const ItemDivider = () => {
  return (
    <View
      style={{
        ...utilsStyles.itemSeparator,
        marginVertical: 9,
        marginLeft: 16,
      }}
    ></View>
  )
}
export default ItemDivider
