import useLogHymnPlayerState from '@/hooks/useLogSetupHymnPlayer'
import useSetupHymnPlayer from '@/hooks/useSetupHymnPlayer'
import { defaultStyles } from '@/styles'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

function App() {
  const handleHymnPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync()
  }, [])

  useSetupHymnPlayer({
    onLoad: handleHymnPlayerLoaded,
  })

  useLogHymnPlayerState()

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
