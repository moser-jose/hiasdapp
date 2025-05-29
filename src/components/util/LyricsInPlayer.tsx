import { colors, fontFamily } from '@/constants/styles'
import { useStateStore } from '@/store/stateStore'
import { Lyrics, Verse } from '@/types/hymnsTypes'
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useShallow } from 'zustand/react/shallow'

const LyricsInPlayer = ({ lyrics }: { lyrics: Lyrics }) => {
  const { top, bottom } = useSafeAreaInsets()
  const viewLyric = useStateStore(useShallow(state => state.viewLyric))

  //if (!viewLyric) return null
  return (
    <SafeAreaView
      style={{
        overflow: 'hidden',
        height: 350,
        backgroundColor: 'rgba(0, 0, 0, 0.26)',
        padding: 16,
        borderRadius: 20,
        marginHorizontal: 16,
        position: 'relative',
        marginBottom: 30,
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
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
      <View style={styles.view}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            console.log('Ver letra completa')
          }}
          style={styles.viewButton}
        >
          <Text style={styles.textButton}>Ver letra completa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  viewButton: {
    justifyContent: 'center',
    backgroundColor: colors.green,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: 170,
  },
  view: {
    backgroundColor: 'rgb(237, 229, 229)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  text: {
    color: colors.white,
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: 20,
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  textButton: {
    color: colors.text,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: 14,
    letterSpacing: 0.5,
  },
})

export default LyricsInPlayer
