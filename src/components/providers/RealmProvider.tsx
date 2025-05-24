/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect, useState } from 'react'
import { RealmProvider as RProvider } from '@/services/BaseRealmService'
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native'
import { useRealm } from '@/hooks/useRealm'
import hymnalData from '../../api/hiasd-old.json'
import { Hymn, Category } from '@/types/hymnsTypes'
import { colors, fontFamily } from '@/constants/styles'

type HymnalData = {
  hymns: Hymn[]
  categories: Category[]
}

export function RealmProvider({ children }: { children: React.ReactNode }) {
  const { closeRealm, create, error, isLoading, checkIfDatabaseEmpty } =
    useRealm()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initializeData = async () => {
      try {
        const isEmpty = await checkIfDatabaseEmpty()

        if (isEmpty) {
          await create(hymnalData as HymnalData)
        }

        await closeRealm()
        setInitialized(true)
      } catch (err) {
        console.error('Failed to initialize hymnal data:', err)
      }
    }

    if (!initialized) {
      initializeData()
    }
  }, [initialized, checkIfDatabaseEmpty, create, closeRealm])

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
