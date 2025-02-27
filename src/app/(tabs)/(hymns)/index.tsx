import { ListHymns } from '@/components/util/ListHymns'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { View, ScrollView } from 'react-native'
import { ListHymnsFilter } from '@/helpers/filter'
import { useMemo, memo } from 'react'
import { Hymn } from '@/types/hymnsTypes'
import { useHymns, useLibraryStore } from '@/store/library'

const HymnsScreen = () => {
  const hymns = useHymns()
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Busque hinos pelo número, titulo, autor, estrofe',
    },
  })

  console.log('gd')

  console.log(Object.values(hymns[0].authors))

  const filteredSearch: Hymn[] = useMemo(() => {
    if (!search) return hymns.slice(0, 10) as Hymn[]
    const filterPredicate = ListHymnsFilter(search)
    return hymns.filter(hymn => Boolean(filterPredicate(hymn))) as Hymn[]
  }, [search, hymns])

  return (
    <View style={defaultStyles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ListHymns hymns={filteredSearch} scrollEnabled={false} />
      </ScrollView>
    </View>
  )
}

export default HymnsScreen
