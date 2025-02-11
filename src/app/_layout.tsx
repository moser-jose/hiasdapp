import useLogHymnPlayerState from '@/hooks/useLogSetupHymnPlayer'
import useSetupHymnPlayer from '@/hooks/useSetupHymnPlayer'
import { defaultStyles } from '@/styles'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()

function App() {
	const handleHymnPlayerLoaded=useCallback(()=>{
		SplashScreen.hideAsync()
	},[])

	useSetupHymnPlayer({
		onLoad:handleHymnPlayerLoaded
	})

	useLogHymnPlayerState()
	
	return (
		<SafeAreaProvider style={defaultStyles.container}>
			<RootNavigation/>
			<StatusBar style="auto" />
		</SafeAreaProvider>
	)
}

const RootNavigation = () =>{
	return (
		<Stack>
			<Stack.Screen name='(tabs)' options={{
				headerShown: false,
			}} />
		</Stack>
	)
}

export default App