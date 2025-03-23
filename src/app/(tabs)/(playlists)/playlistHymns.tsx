import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Hymn } from '@/types/hymnsTypes'
import ListHymns from '@/components/util/ListHymns'
import { useHymns } from '@/store/library'
import { colors } from '@/constants/styles'

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

  const hymns = useHymns().filter((hymn: Hymn) =>
    tryParseHymnsId(hymnsId as string).includes(hymn.id)
  )

  return (
    <>
      <Stack.Screen
        name="playlistHymns"
        options={{
          headerLargeTitle: false,
          headerLargeStyle: {
            backgroundColor: colors.background,
          },
          headerLargeTitleStyle: {
            color: colors.text,
          },
          headerBackTitle: 'voltar',
          headerTintColor: colors.text,
          headerBlurEffect: 'prominent',
          headerShadowVisible: true,
          headerTransparent: false,
          headerTitle: name as string,
        }}
      />
      <ListHymns hymns={hymns} horizontal={false} />
    </>
  )
}
