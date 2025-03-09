import { memo } from 'react'
import { defaultStyles } from '@/styles'
import { View } from 'react-native'
import { useHymns } from '@/store/library'
import ListHymns from '@/components/util/ListHymns'
import { generateTracksListId } from '@/helpers/j'

function HymnsScreen() {
  const hymns = useHymns()

  return (
    <View style={defaultStyles.container}>
      <ListHymns
        id={generateTracksListId('hymns')}
        horizontal={false}
        hymns={hymns}
      />
    </View>
  )
}

export default memo(HymnsScreen)
