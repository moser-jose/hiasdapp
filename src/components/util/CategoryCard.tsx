import { adoracaoImage, AmenImage, canticosResponsivosImage, categoryImage, deusOPaiImage, espiritoSantoImage, igrejaDoutrinaImage, jesusCristoImage, larCristaoImage, logoApp, OEvangelhoImage, SantaEscrituraImage, sonGodImage, vidaCristaImage } from '@/constants/images';
import { HymnsCategoriesTypes, HymnsTypes } from '@/types/hymnsTypes';

import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';


const { width, height } = Dimensions.get('window');

const CategoryCard = ({data,index}:{data:HymnsCategoriesTypes,index:number}) => {
    const categoryImages = {
        'Adoração': adoracaoImage,
        'Deus, o Pai': deusOPaiImage,
        'Jesus Cristo': jesusCristoImage,
        'Espirito Santo': espiritoSantoImage,
        'Santa Escritura': SantaEscrituraImage,
        'O Evangelho': OEvangelhoImage,
        'Lar Cristão': larCristaoImage,
        'Igreja e Doutrina': igrejaDoutrinaImage,
        'Cânticos Responsivos': canticosResponsivosImage,
        'Améns': AmenImage,
        'Vida Cristã': vidaCristaImage,
      };
      const getBackgroundSource = (category: string) =>
          categoryImages[category as keyof typeof categoryImages] || logoApp;
      
  return (
    
    <TouchableOpacity activeOpacity={0.8} style={[styles.container,index % 1 !== 0 && styles.spacingLeft]}>
      {/* Imagem de fundo */}
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
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  spacingLeft: {
    paddingLeft: 16, 
  },
});

export default CategoryCard;
