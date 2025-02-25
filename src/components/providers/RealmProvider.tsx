import React, { useEffect, useState } from 'react'
import { RealmProvider as RProvider } from '@/services/RealmService'
import { View, Text } from 'react-native'
import { useRealm } from '@/hooks/useRealm'
import hymnalData from '../../api/hiasd-old.json'
import { Category, Hymn } from '@/types/hymnsTypes'

export function RealmProvider({ children }: { children: React.ReactNode }) {
  const { importData, error, isLoading, checkIfDatabaseEmpty } = useRealm()
  const [initialized, setInitialized] = useState(false)
  interface Data {
    hymns: Hymn[]
    categories: Category[]
  }
  useEffect(() => {
    const initializeData = async () => {
      try {
        const isEmpty = await checkIfDatabaseEmpty()

        if (isEmpty) {
          //await importData(hymnalData as Data)
        }

        setInitialized(true)
      } catch (err) {
        console.error('Failed to initialize hymnal data:', err)
      }
    }

    if (!initialized) {
      initializeData()
    }
  }, [importData, initialized, checkIfDatabaseEmpty])

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error initializing data: {error.message}</Text>
      </View>
    )
  }

  if (isLoading || !initialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading hymnal data...</Text>
      </View>
    )
  }

  return <RProvider>{children}</RProvider>
}
