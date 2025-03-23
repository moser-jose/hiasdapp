import { colors, fontFamily } from '@/constants/styles'
import { getBackgroundSource } from '@/helpers/getBackgroundSource'
import { SubCategory } from '@/types/hymnsTypes'
import { Ionicons } from '@expo/vector-icons'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'

export default function Categories() {
  const { id, name, subCategories } = useLocalSearchParams()
  const router = useRouter()

  const allSubCategories = Object.values(
    JSON.parse(subCategories as string) as SubCategory[]
  )

  const renderItem = ({ item }: { item: SubCategory }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: `/subCategories`,
            params: {
              idQueue: `sub-category-${id}-${item.id}`,
              category: name,
              id: item.id,
              subCategory: item.name,
            },
          })
        }
        activeOpacity={0.8}
        key={item.id}
        style={styles.subCategory}
      >
        <View style={styles.subCategoryHymnsContainer}>
          <Text style={styles.subCategoryName}>{item.name}</Text>
          <Text style={styles.subCategoryHymns}>{item.hymns}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
      </TouchableOpacity>
    )
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <FastImage
          source={{ uri: getBackgroundSource(name as string) }}
          style={styles.backgroundImage}
          resizeMode={FastImage.resizeMode.cover}
        />

        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0.7)',
            'rgba(0, 0, 0, 0.5)',
            'rgba(0, 0, 0, 0.3)',
            'rgba(0, 0, 0, 0.1)',
            'transparent',
          ]}
          locations={[0, 0.3, 0.5, 0.7, 1]}
          style={styles.gradientOverlay}
        />

        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.categoryTitle}>{name}</Text>
        </View>

        <FlatList
          style={styles.listView}
          contentContainerStyle={styles.listContent}
          data={allSubCategories}
          renderItem={renderItem}
          keyExtractor={(item: SubCategory) => item.id.toString()}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </>
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
    height: 150,
    zIndex: 0,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    zIndex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 16,
    zIndex: 2,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  listView: {
    marginTop: 150,
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 2,
  },
  listContent: {
    paddingBottom: 120,
  },
  subCategory: {
    padding: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subCategoryName: {
    fontSize: 18,
    letterSpacing: 0.5,
    fontFamily: fontFamily.plusJakarta.medium,
  },
  subCategoryHymns: {
    fontSize: 14,
    fontFamily: fontFamily.plusJakarta.regular,
    color: colors.fourth,
  },
  subCategoryHymnsContainer: {},
})
