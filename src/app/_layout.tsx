import '../../reanimatedConfig'
import useLogHymnPlayerState from '@/hooks/useLogSetupHymnPlayer'
import { useSetupHymnPlayer } from '@/store/playerStore'
import { defaultStyles } from '@/styles'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts } from 'expo-font'
import { Rochester_400Regular } from '@expo-google-fonts/rochester'
import { Sacramento_400Regular } from '@expo-google-fonts/sacramento'
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans'
import AppLoading from 'expo-app-loading'
import { BirthstoneBounce_500Medium } from '@expo-google-fonts/birthstone-bounce'
import { useInitLibrary } from '@/store/library'

SplashScreen.preventAutoHideAsync()

function App() {
  useInitLibrary()
  const [fontsLoaded] = useFonts({
    Rochester_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    Sacramento_400Regular,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    BirthstoneBounce_500Medium,
  })
  const handleHymnPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync()
  }, [])

  useSetupHymnPlayer({
    onLoad: handleHymnPlayerLoaded,
  })

  useLogHymnPlayerState()

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <SafeAreaProvider style={defaultStyles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigation />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const RootNavigation = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="player"
        options={{
          headerShown: false,
          presentation: 'card',
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animationDuration: 400,
        }}
      />
    </Stack>
  )
}

export default App
