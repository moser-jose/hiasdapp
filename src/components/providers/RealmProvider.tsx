import React, { useEffect, useState } from 'react'
import { RealmProvider as RProvider } from '@/services/RealmService'
import { View, Text } from 'react-native'
import { useRealm } from '@/hooks/useRealm'
import hymnalData from '../../api/hiasd-old.json'

export function RealmProvider({ children }: { children: React.ReactNode }) {
  const { importData, error, isLoading } = useRealm()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initializeData = async () => {
      try {
        await importData(hymnalData.hymns)
        setInitialized(true)
      } catch (err) {
        console.error('Failed to initialize hymnal data:', err)
      }
    }

    if (!initialized) {
      initializeData()
    }
  }, [importData, initialized])

  if (error) {
    return (
      <View>
        <Text>Error initializing data: {error.message}</Text>
      </View>
    )
  }

  if (isLoading || !initialized) {
    return (
      <View>
        <Text>Loading hymnal data...</Text>
      </View>
    )
  }

  return <RProvider>{children}</RProvider>
}
