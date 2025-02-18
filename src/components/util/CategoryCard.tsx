import { fontSize } from '@/constants/styles';
import { getBackgroundSource } from '@/helpers/getBackgroundSource';
import { Category } from '@/types/hymnsTypes';

import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const CategoryCard = ({category,index,style}:{category:Category,index:number,style?:StyleProp<ViewStyle>}) => {
    
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.container, index % 1 !== 0 && styles.spacingLeft, style]}>
      <FastImage
        source={{ uri: getBackgroundSource(category.name) }}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover} 
      />
        <LinearGradient
        colors={["rgba(28, 26, 26, 0.6)", "transparent"]}
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <Text style={styles.text}>{category.name}</Text>
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
