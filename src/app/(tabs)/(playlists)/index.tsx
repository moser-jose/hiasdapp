import { defaultStyles } from '@/styles'
import { View } from 'react-native'
import ListPlayLists from '@/components/util/ListPlayLists'
function PlaylistsScreen() {
  return (
    <View style={defaultStyles.container}>
      <ListPlayLists />
    </View>
  )
}

export default PlaylistsScreen
