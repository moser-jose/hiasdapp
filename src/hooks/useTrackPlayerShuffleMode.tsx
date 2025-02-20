import { useState, useCallback } from 'react'

export const useTrackPlayerShuffleMode = () => {
  const [shuffleMode, setShuffleMode] = useState(false)

  const handleShufflePress = useCallback(async () => {
    try {
      setShuffleMode(!shuffleMode)
    } catch (error) {
      console.error('Error toggling shuffle mode:', error)
    }
  }, [shuffleMode])

  return {
    shuffleMode,
    handleShufflePress,
  }
}
