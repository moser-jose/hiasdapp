import { FlatList} from "react-native"
import {ListCategoriesProps} from "@/types/hymnsTypes"
import CategoryCard from "./CategoryCard"
import { useEffect, useRef, useState } from "react";

export const ListCategories = ({categories,...listCategoriesProps}:ListCategoriesProps)=>{
    const[flatList, setFlatList] = useState(undefined)
    const flatListRef = useRef(null);

    useEffect(() => {
      if (flatListRef.current) {
        setFlatList(flatListRef.current.props.horizontal)
      }
    }, []);

    return <FlatList
    ref={flatListRef}
    data={categories}
    renderItem={({item:category, index}) => <CategoryCard index={index % 2 !== 0} category={category}
    style={[flatList && {marginRight: index === categories.length - 1 ? 16 : 0, marginTop: 0}]}
    />}
    {...listCategoriesProps}
    />
}