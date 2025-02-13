import AsyncStorage from '@react-native-async-storage/async-storage'
import { randomNumber } from './randomNumber'
import { HymnsTypes, ListHymns } from '@/types/hymnsTypes'

export const getDailyHymn = async (hymns:ListHymns) => {
    const today = new Date().toISOString().split('T')[0]
  
    try {
      //await AsyncStorage.removeItem('dailyHymn')
      const storedData = await AsyncStorage.getItem('dailyHymn')
      
      if (storedData) {
        const { date, hymn } = JSON.parse(storedData)
        if (date === today) {
          console.log(storedData,hymns)
            const hymnDay=hymns.filter((item:HymnsTypes['hymn'])=>item.id==hymn)
            
            return hymnDay[0] 
        }
      }
      const newHymn = randomNumber()
      await AsyncStorage.setItem(
        'dailyHymn',
        JSON.stringify({ date: today, hymn:newHymn })
      )
  
    } catch (error) {
      console.log('Erro ao obter o hino:', error)
    }
  }

  