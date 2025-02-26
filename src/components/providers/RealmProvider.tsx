import React, { useEffect, useState } from 'react'
import Realm from 'realm'
import { RealmProvider as RProvider } from '@/services/BaseRealmService'
import { View, Text } from 'react-native'
import { useRealm } from '@/hooks/useRealm'
import hymnalData from '../../api/hiasd-old.json'

export function RealmProvider({ children }: { children: React.ReactNode }) {
  const { closeRealm, create, error, isLoading, checkIfDatabaseEmpty } =
    useRealm()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initializeData = async () => {
      try {
        const isEmpty = await checkIfDatabaseEmpty()

        //if (isEmpty) {
        await create(hymnalData)
        console.log('passou')
        await closeRealm()
        //}

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading hymnal data...</Text>
      </View>
    )
  }

  return <RProvider>{children}</RProvider>
}
