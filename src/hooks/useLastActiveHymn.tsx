import { useEffect, useState } from 'react'
import { Track, useActiveTrack } from 'react-native-track-player'

export const useLastActiveHymn = () => {
  const activeHymn = useActiveTrack()
  const [lastActiveHymn, setLastActiveHymn] = useState<Track>()

  useEffect(() => {
    if (!activeHymn) return

    setLastActiveHymn(activeHymn)
  }, [activeHymn])

  return lastActiveHymn
}
