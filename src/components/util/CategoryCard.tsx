import {categoryImagesAntigo, categoryImagesNovo} from '@/constants/images';
import { fontSize } from '@/constants/styles';
import { HymnsCategoriesTypes} from '@/types/hymnsTypes';

import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const CategoryCard = ({data,index}:{data:HymnsCategoriesTypes,index:number}) => {
    const novo=true;
    const categoryImages=novo?categoryImagesAntigo:categoryImagesNovo
      const getBackgroundSource = (category: string) =>
          categoryImages[category as keyof typeof categoryImages] || logoApp;
  return (
    
    <TouchableOpacity activeOpacity={0.8} style={[styles.container,index % 1 !== 0 && styles.spacingLeft]}>
     
      <FastImage
        source={{ uri: getBackgroundSource(data.categoria) }}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover} 
      />
        <LinearGradient
        colors={["rgba(28, 26, 26, 0.6)", "transparent"]}
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <Text style={styles.text}>{data.categoria}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width/2,
    position: "relative",
    height:60,
    flex:1,
    marginTop: 16, 
    marginLeft:16,
    shadowRadius: 12, 
    shadowOpacity: 0.1, 
    shadowOffset: { width: 0, height: 4 }, 
    shadowColor: '#000',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, 
    width: '100%',
    height: '100%',
    borderRadius:8,
  },
  content: {
    position:'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize:fontSize.base,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  spacingLeft: {
    paddingLeft: 16, 
  },
});

export default CategoryCard;
