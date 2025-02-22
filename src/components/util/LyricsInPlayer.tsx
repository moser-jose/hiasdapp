import { colors, fontFamily } from '@/constants/styles'
import { Lyrics, Verse } from '@/types/hymnsTypes'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const LyricsInPlayer = ({ lyrics }: { lyrics: Lyrics }) => {
  const { top, bottom } = useSafeAreaInsets()
  return (
    <ScrollView
      style={{
        flex: 1,
        marginTop: top + 40,
        marginBottom: bottom - 30,
      }}
    >
      <View style={{ flex: 1 }}>
        {lyrics.verses.map(({ verse, number }: Verse, index) => {
          return (
            <View key={index}>
              {number && <Text style={styles.text}>{number}</Text>}
              <Text style={styles.text}>{verse}</Text>

              {lyrics.chorus[index]?.choir ? (
                <>
                  <Text style={styles.text}>Coro</Text>
                  <Text style={styles.text}>{lyrics.chorus[index]?.choir}</Text>
                </>
              ) : (
                lyrics.chorus[0]?.choir && (
                  <>
                    <Text style={styles.text}>Coro</Text>
                    <Text style={styles.text}>{lyrics.chorus[0]?.choir}</Text>
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
    marginBottom: 20,
  },
})

export default LyricsInPlayer
