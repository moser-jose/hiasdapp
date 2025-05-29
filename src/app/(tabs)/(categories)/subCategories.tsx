import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { useLocalSearchParams, Stack, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import { getBackgroundSource } from '@/helpers/getBackgroundSource'
import { useHymns } from '@/store/library'
import ListHymns from '@/components/util/ListHymnscop'
import { ListHeaderComponent } from '@/components/util/ListHeaderComponent'

export default function SubCategories() {
  const { idQueue, category, subCategory } = useLocalSearchParams()

  const router = useRouter()

  const hymns = useHymns().filter(
    hymn => hymn.category?.subCategory?.name === subCategory
  )

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <FastImage
          source={{ uri: getBackgroundSource(category as string) }}
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

          <Text style={styles.categoryTitle}>{subCategory}</Text>
        </View>

        <ListHymns
          style={styles.listView}
          ListHeaderComponent={
            <ListHeaderComponent hymns={hymns} id={idQueue as string} />
          }
          hymns={hymns}
          id={idQueue as string}
          horizontal={false}
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
