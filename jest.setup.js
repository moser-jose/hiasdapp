/* eslint-disable no-undef */
import '@testing-library/react-native'

// Mock para o ExpoRouter
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Link: 'Link',
}))

// Mock para as fontes do Expo
jest.mock('expo-font', () => ({
  useFonts: () => [true, null],
}))

// Mock para AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}))

jest.mock('react-native-track-player', () => ({
  load: jest.fn(),
  play: jest.fn(),
  useIsPlaying: () => ({ playing: false }),
  useActiveTrack: () => null,
  __esModule: true,
  default: {
    load: jest.fn(),
    play: jest.fn(),
  },
}))

// Simple mock for @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const mockComponent = () => 'IconMock'
  return {
    Ionicons: mockComponent,
    AntDesign: mockComponent,
    Entypo: mockComponent,
    EvilIcons: mockComponent,
    Feather: mockComponent,
    FontAwesome: mockComponent,
    MaterialIcons: mockComponent,
    MaterialCommunityIcons: mockComponent,
  }
})

// Mock Image component and its methods
jest.mock('react-native/Libraries/Image/Image', () => {
  const originalImage = jest.requireActual('react-native/Libraries/Image/Image')
  return {
    ...originalImage,
    resolveAssetSource: () => ({ uri: 'test-uri' }),
  }
})
