import { colors, fontFamily } from '@/constants/styles'
import { Lyrics, Verse } from '@/types/hymnsTypes'
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FloatingPlayer from './FloatingPlayer'
import { useStateStore } from '@/store/stateStore'
import { useShallow } from 'zustand/react/shallow'

const LyricsInPlayer = ({ lyrics }: { lyrics: Lyrics }) => {
  const { top, bottom } = useSafeAreaInsets()
  const { setViewLyric } = useStateStore(
    useShallow(state => ({
      setViewLyric: state.setViewLyric,
    }))
  )

  return (
    <View
      style={{
        ...styles.viewLyrics,
        top: top + 30,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setViewLyric()
        }}
        activeOpacity={0.8}
        style={styles.closeButton}
      >
        <Text style={styles.textButton}>Fechar letra</Text>
      </TouchableOpacity>

      <ScrollView
        style={{ marginBottom: 60 }}
        showsVerticalScrollIndicator={true}
        indicatorStyle="white"
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
      </ScrollView>
      <FloatingPlayer
        style={[styles.floatingPlayer, { bottom: bottom - 26 }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  viewLyrics: {
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.91)',
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 30,
    boxShadow: '0 0 10px 0 rgba(255, 255, 255, 0.08)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  closeButton: {
    justifyContent: 'center',
    backgroundColor: colors.green,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    position: 'absolute',
    top: 10,
    right: 10,
    boxShadow: '0 0 10px 0 rgba(255, 255, 255, 0.15)',
    zIndex: 1000,
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
    fontSize: 12,
    letterSpacing: 0.5,
  },
  floatingPlayer: {
    borderRadius: 4,
    left: 8,
    position: 'absolute',
    right: 8,
  },
})

export default LyricsInPlayer
