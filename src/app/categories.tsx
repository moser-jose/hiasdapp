import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SubCategory } from '@/types/hymnsTypes'
import { Ionicons } from '@expo/vector-icons'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import { getBackgroundSource } from '@/helpers/getBackgroundSource'

export default function Categories() {
  const { id, name, subCategories } = useLocalSearchParams()

  const allSubCategories = Object.values(
    JSON.parse(subCategories as string) as SubCategory[]
  )

  // Esconder completamente a barra de status
  React.useEffect(() => {
    StatusBar.setBarStyle('light-content')
    if (Platform.OS === 'ios') {
      StatusBar.setHidden(true)
    } else {
      StatusBar.setTranslucent(true)
      StatusBar.setBackgroundColor('transparent')
    }

    return () => {
      StatusBar.setHidden(false)
    }
  }, [])

  return (
    <View style={styles.container}>
      <FastImage
        source={{ uri: getBackgroundSource(name as string) }}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover}
      />

      <LinearGradient
        colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.1)', 'transparent']}
        style={styles.gradientOverlay}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {allSubCategories.map((subCategory: SubCategory) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={subCategory.id}
            style={styles.subCategory}
          >
            <Text style={styles.subCategoryName}>{subCategory.name}</Text>
            <View style={styles.subCategoryHymnsContainer}>
              <Text style={styles.subCategoryHymns}>{subCategory.hymns}</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 1,
  },
  scrollView: {
    marginTop: 200,
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 2,
  },
  subCategory: {
    padding: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  subCategoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subCategoryHymns: {
    fontSize: 14,
  },
  subCategoryHymnsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
