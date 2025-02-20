/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage'
import { randomNumber } from './randomNumber'
import { Hymn } from '@/types/hymnsTypes'

export const getDailyHymn = async (hymns: Hymn[]): Promise<Hymn> => {
  const today = new Date().toISOString().split('T')[0]

  try {
    //await AsyncStorage.removeItem('dailyHymn')
    const storedData = await AsyncStorage.getItem('dailyHymn')

    if (storedData) {
      const { date, hymn } = JSON.parse(storedData)
      if (date === today) {
        const hymnDay = hymns.find((item?: Hymn) => item?.id === hymn)
        if (hymnDay) return hymnDay
      }
    }

    const newHymnId = randomNumber()
    await AsyncStorage.setItem(
      'dailyHymn',
      JSON.stringify({ date: today, hymn: newHymnId })
    )

    // Return the new hymn
    const newHymnDay = hymns.find((item?: Hymn) => item?.id === newHymnId)
    if (newHymnDay) return newHymnDay

    // Fallback to first hymn if no match found
    return hymns[0]
  } catch (error) {
    console.log('Erro ao obter o hino:', error)
    return hymns[0] // Fallback to first hymn in case of error
  }
}
