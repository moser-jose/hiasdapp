import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View, SafeAreaView } from 'react-native'

import Header from '@/components/util/Header'

const HeaderComponent = () => {
  return (
    <SafeAreaView>
      <Header title="Hinos Adventistas" text="Novo" year="2022" />
    </SafeAreaView>
  )
}

const HomeScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <HeaderComponent />,
          }}
        />
      </Stack>
    </View>
  )
}

export default HomeScreenLayout
