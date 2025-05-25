/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect, useState } from 'react'
import { RealmProvider as RProvider } from '@/services/BaseRealmService'
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native'
import { useRealm } from '@/hooks/useRealm'
import hymnalData from '../../api/hiasd-old.json'
import { Hymn, Category } from '@/types/hymnsTypes'
import { colors, fontFamily } from '@/constants/styles'
import { useLibraryStore } from '@/store/library'

type HymnalData = {
  hymns: Hymn[]
  categories: Category[]
}

export function RealmProvider({ children }: { children: React.ReactNode }) {
  const { create, error, isLoading, checkIfDatabaseEmpty } = useRealm()
  const [initialized, setInitialized] = useState(false)
  const { setHymns, setCategories } = useLibraryStore()

  useEffect(() => {
    const initializeData = async () => {
      try {
        const isEmpty = await checkIfDatabaseEmpty()

        if (isEmpty) {
          create(hymnalData as HymnalData)
          setHymns(hymnalData.hymns as Hymn[])
          setCategories(hymnalData.categories as Category[])
        }

        setInitialized(true)
      } catch (err) {
        console.error('Failed to initialize hymnal data:', err)
      }
    }

    if (!initialized) {
      console.log('está nullo 2')
      initializeData()
    }
  }, [initialized, checkIfDatabaseEmpty, create, setHymns, setCategories])

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error initializing data: {error.message}</Text>
      </View>
    )
  }

  if (isLoading || !initialized) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.green,
        }}
      >
        <Image
          source={require('../../../assets/logo.png')}
          style={{ width: 170, height: 170, marginBottom: 20 }}
        />
        <View style={styles.container}>
          <Text style={styles.title}>Hinos Adventista do 7 Dia</Text>
        </View>
        <ActivityIndicator size="small" color={colors.white} />
      </View>
    )
  }

  return <RProvider>{children}</RProvider>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: 20,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.white,
    fontFamily: fontFamily.rochester.regular,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
})
