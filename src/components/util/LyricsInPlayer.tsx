import { colors, fontFamily } from '@/constants/styles'
import { useStateStore } from '@/store/stateStore'
import { Lyrics, Verse } from '@/types/hymnsTypes'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useShallow } from 'zustand/react/shallow'

const LyricsInPlayer = ({ lyrics }: { lyrics: Lyrics }) => {
  const { top, bottom } = useSafeAreaInsets()
  const viewLyric = useStateStore(useShallow(state => state.viewLyric))

  if (!viewLyric) return null
  return (
    <ScrollView
      style={{
        marginTop: top + 40,
        marginBottom: bottom - 30,
        overflow: 'hidden',
        height: 1,
        maxHeight: '38%',
      }}
    >
      <View>
        {Object.values(lyrics.verses).map(({ verse, number }: Verse, index) => {
          return (
            <View key={index}>
              {number && <Text style={styles.text}>{number}</Text>}
              <Text style={styles.text}>{verse}</Text>

              {Object.values(lyrics.chorus)[index]?.choir ? (
                <>
                  <Text style={styles.text}>Coro</Text>
                  <Text style={styles.text}>
                    {Object.values(lyrics.chorus)[index]?.choir}
                  </Text>
                </>
              ) : (
                Object.values(lyrics.chorus)[0]?.choir && (
                  <>
                    <Text style={styles.text}>Coro</Text>
                    <Text style={styles.text}>
                      {Object.values(lyrics.chorus)[0]?.choir}
                    </Text>
                  </>
                )
              )}
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: 28,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
})

export default LyricsInPlayer
