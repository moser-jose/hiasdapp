import { utilsStyles } from '@/styles'
import { View, ViewStyle } from 'react-native'

const ItemDivider = ({ style }: { style?: ViewStyle }) => {
  return (
    <View
      style={[
        {
          ...utilsStyles.itemSeparator,
          marginVertical: 9,
          marginLeft: 16,
        },
        style,
      ]}
    ></View>
  )
}
export default ItemDivider
