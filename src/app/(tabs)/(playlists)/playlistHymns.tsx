import React from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Hymn } from '@/types/hymnsTypes'
import ListHymns from '@/components/util/ListHymns'
import { useHymns } from '@/store/library'
import { colors, fontFamily } from '@/constants/styles'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function PlaylistHymns() {
  const { id, name, hymnsId } = useLocalSearchParams()
  function tryParseHymnsId(str: string) {
    try {
      // Tenta converter de JSON primeiro

      return JSON.parse(str)
    } catch (e) {
      // Se falhar, verifica se é uma lista separada por vírgulas
      if (str.includes(',')) {
        return str
          .split(',')
          .map(item => parseInt(item.trim(), 10))
          .filter(num => !isNaN(num))
      }
      // Se for um único número
      const num = parseInt(str, 10)
      return !isNaN(num) ? [num] : []
    }
  }
  console.log(hymnsId)
  const hymns = useHymns().filter((hymn: Hymn) =>
    tryParseHymnsId(hymnsId as string).includes(hymn.id)
  )

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: name as string,
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <ListHymns hymns={hymns} horizontal={false} />
    </>
  )
}
