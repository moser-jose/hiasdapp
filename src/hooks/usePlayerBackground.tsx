import { colors } from '@/constants/styles'
import { useEffect, useState } from 'react'
import { getColors } from 'react-native-image-colors'
import { IOSImageColors } from 'react-native-image-colors/build/types'

export const usePlayerBackground = (imageUrl: string) => {
  const [background, setBackground] = useState<IOSImageColors | null>(null)

  useEffect(() => {
    getColors(imageUrl, {
      fallback: colors.background,
      cache: true,
      key: imageUrl,
    }).then(colors => {
      setBackground(colors as IOSImageColors)
    })
  }, [imageUrl])

  return { background }
}
