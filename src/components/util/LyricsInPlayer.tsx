import { colors, fontFamily } from '@/constants/styles'
import { Lyrics, Verse } from '@/types/hymnsTypes'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useStateStore } from '@/store/stateStore'

const LyricsInPlayer = ({ lyrics }: { lyrics: Lyrics }) => {
  const { top, bottom } = useSafeAreaInsets()
  const viewLyric = useStateStore(useShallow(state => state.viewLyric))

  if (!viewLyric) return null
  return (
    <ScrollView
      style={{
        flex: 1,
        marginTop: top + 40,
        marginBottom: bottom - 30,
      }}
    >
      <View style={{ flex: 1 }}>
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
    color: colors.second,
    fontFamily: fontFamily.plusJakarta.semibold,
    fontSize: 30,
    letterSpacing: 2,
    marginBottom: 20,
  },
})

export default LyricsInPlayer
