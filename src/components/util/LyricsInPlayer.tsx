import { colors, fontFamily } from '@/constants/styles'
import { Chorus, Verse } from '@/types/hymnsTypes'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const LyricsInPlayer = ({
  chorus,
  verses,
}: {
  verses?: Verse[]
  chorus?: Chorus[]
}) => {
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
        {verses?.map(({ verse, number }: Verse, index) => {
          return (
            <Text style={styles.text} key={index}>
              {verse}
            </Text>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontFamily: fontFamily.plusJakarta.semibold,
    fontSize: 30,
    marginBottom: 20,
  },
})

export default LyricsInPlayer
