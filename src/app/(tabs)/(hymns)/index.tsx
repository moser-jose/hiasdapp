import { ListHymns } from "@/components/util/ListHymns"
import { useNavigationSearch } from "@/hooks/useNavigationSearch"
import { defaultStyles } from "@/styles"
import { View, ScrollView } from "react-native"
import HinosAntigo from '@/api/hiasd-old.json'
import { ListHymnsFilter } from "@/helpers/filter"
import { useMemo } from "react"
import { hymnsWithArtwork } from "@/mocks/DataMock"

const HymnsScreen=()=>{
    const search = useNavigationSearch({
        searchBarOptions:{
            placeholder:'Busque hinos pelo número, titulo, autor, estrofe'
        }
    })

    const filteredSearch = useMemo(() => {
        if (!search) return hymnsWithArtwork;
        const filterPredicate = ListHymnsFilter(search);
        return hymnsWithArtwork.filter(hymn => Boolean(filterPredicate(hymn)));
    }, [search]);

    return <View style={defaultStyles.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <ListHymns  hymns={filteredSearch} scrollEnabled={false}/>
        </ScrollView>
    </View>
}


export default HymnsScreen