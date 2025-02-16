import { FlatList} from "react-native"
import {ListCategoriesProps} from "@/types/hymnsTypes"
import CategoryCard from "./CategoryCard"
import { useEffect, useRef, useState } from "react";

export const ListCategories = ({categories,...listCategoriesProps}:ListCategoriesProps)=>{
    const [flatList, setFlatList] = useState<boolean | undefined>(undefined)
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
      if (flatListRef.current) {
        const isHorizontal = flatListRef.current.props.horizontal ?? undefined;
        setFlatList(isHorizontal);
      }
    }, []);

    return <FlatList
    ref={flatListRef}
    data={categories}
    renderItem={({item:category, index}) => <CategoryCard index={index} category={category}
    style={[flatList && {marginRight: index === categories.length - 1 ? 16 : 0, marginTop: 0}]}
    />}
    {...listCategoriesProps}
    />
}