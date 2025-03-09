import { fontFamily, fontSize } from '@/constants/styles'
import { getBackgroundSource } from '@/helpers/getBackgroundSource'
import { Category } from '@/types/hymnsTypes'

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { router } from 'expo-router'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'

const { width } = Dimensions.get('window')
const CategoryCard = ({
  category,
  index,
  style,
}: {
  category: Category
  index: number
  style?: StyleProp<ViewStyle>
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/categories`,
          params: {
            id: category.id,
            name: category.name,
            subCategories: JSON.stringify(category.subCategories),
          },
        })
      }
      activeOpacity={0.8}
      style={[styles.container, index % 1 !== 0 && styles.spacingLeft, style]}
    >
      <FastImage
        source={{ uri: getBackgroundSource(category.name) }}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <LinearGradient
        colors={['rgba(28, 26, 26, 0.6)', 'transparent']}
        style={styles.backgroundImage}
      />
      <View style={styles.content}>
        <Text style={styles.text}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    height: 60,
    marginLeft: 16,
    marginTop: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    width: width / 2,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  spacingLeft: {
    paddingLeft: 16,
  },
  text: {
    color: 'white',
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: fontSize.base,
    textAlign: 'center',
  },
})

export default CategoryCard
