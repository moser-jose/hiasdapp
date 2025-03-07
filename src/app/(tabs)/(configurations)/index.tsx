import { defaultStyles } from '@/styles'
import { memo } from 'react'
import { View, Text } from 'react-native'

const ConfigurationsScreen = () => {
  console.log('renderizouConf')
  return (
    <View style={defaultStyles.container}>
      <Text>Categories Screen j</Text>
    </View>
  )
}

export default memo(ConfigurationsScreen)
