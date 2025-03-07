import { memo } from 'react'
import { defaultStyles } from '@/styles'
import { View } from 'react-native'
import { useHymns } from '@/store/library'
import ListHymns from '@/components/util/ListHymns'

function HymnsScreen() {
  const hymns = useHymns()

  return (
    <View style={defaultStyles.container}>
      <ListHymns horizontal={false} hymns={hymns} />
    </View>
  )
}

export default memo(HymnsScreen)
