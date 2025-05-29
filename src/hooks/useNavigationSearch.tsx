import { colors } from '@/constants/styles'
import { useNavigation } from 'expo-router'
import { useLayoutEffect, useRef, useState } from 'react'
import { SearchBarProps } from 'react-native-screens'

interface UseNavigationSearchProps {
  searchBarOptions?: SearchBarProps
  debounceMs?: number
}

const defaultSearchOptions: SearchBarProps = {
  tintColor: colors.primary,
  hideWhenScrolling: false,
}

export function useNavigationSearch({
  searchBarOptions,
  debounceMs = 0,
}: UseNavigationSearchProps = {}): [string, (value: string) => void] {
  const [search, setSearch] = useState('')
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
  const navigation = useNavigation()

  // Handler with debounce support
  const handleOnChangeText: SearchBarProps['onChangeText'] = ({
    nativeEvent: { text },
  }) => {
    if (debounceMs > 0) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
      debounceTimeout.current = setTimeout(() => {
        setSearch(text)
      }, debounceMs)
    } else {
      setSearch(text)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ...defaultSearchOptions,
        ...searchBarOptions,
        onChangeText: handleOnChangeText,
        value: search,
      },
    })
    // Limpeza do debounce ao desmontar
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    }
  }, [navigation, searchBarOptions, search])

  return [search, setSearch]
}
