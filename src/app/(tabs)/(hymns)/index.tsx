import { memo } from 'react'
import { defaultStyles } from '@/styles'
import { View } from 'react-native'
import { useLibraryStore } from '@/store/library'
import ListHymns from '@/components/util/ListHymns'
import { generateTracksListId } from '@/helpers/j'
import { useShallow } from 'zustand/react/shallow'

function HymnsScreen() {
  const { hymns } = useLibraryStore(
    useShallow(state => ({
      hymns: state.hymns,
    }))
  )

  return (
    <ListHymns
      style={defaultStyles.container}
      id={generateTracksListId('hymns')}
      horizontal={false}
      hymns={hymns}
    />
  )
}

export default memo(HymnsScreen)
