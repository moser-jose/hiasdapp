import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { colors, fontFamily, fontSize } from '@/constants/styles'
import { useEffect, useState } from 'react'
import { useLibraryStore } from '@/store/library'
import { useShallow } from 'zustand/react/shallow'
import { Hymn, Lyrics } from '@/types/hymnsTypes'
import { Ionicons } from '@expo/vector-icons'
import FloatingPlayer from '@/components/util/FloatingPlayer'

export default function LyricsScreen() {
  const { hymnId, hymnNumber, hymnTitle, lyrics } = useLocalSearchParams()
  const [lyricsContent, setLyricsContent] = useState<string>('')
  const [textSize, setTextSize] = useState<number>(fontSize.base)

  const hymns = useLibraryStore(useShallow(state => state.hymns))

  useEffect(() => {
    if (lyrics) {
      try {
        const paraLyrics = JSON.parse(lyrics as string) as Lyrics

        let formattedLyrics = ''

        if (
          Object.values(paraLyrics.verses) &&
          Object.values(paraLyrics.verses).length > 0
        ) {
          Object.values(paraLyrics.verses).forEach(verse => {
            if (verse.number) {
              formattedLyrics += `${verse.number}. `
            }
            if (verse.verse) {
              formattedLyrics += `${verse.verse}\n\n`
            }

            if (
              Object.values(paraLyrics.chorus) &&
              Object.values(paraLyrics.chorus).length > 0
            ) {
              Object.values(paraLyrics.chorus).forEach(chorus => {
                if (chorus.name) {
                  formattedLyrics += `[CHORUS_START]${chorus.name}\n`
                }
                if (chorus.choir) {
                  formattedLyrics += `${chorus.choir}\n\n`
                }
              })
            }
          })
        }

        setLyricsContent(formattedLyrics)
        return
      } catch (error) {
        console.error('Failed to parse lyrics:', error)
      }
    }

    if (hymnId && hymns.length > 0) {
      const hymn = hymns.find(
        (h: Hymn) => h.id.toString() === hymnId.toString()
      )
      if (hymn && typeof hymn.lyrics === 'string') {
        setLyricsContent(hymn.lyrics)
      }
    }
  }, [hymnId, hymns, lyrics])

  const handleGoBack = () => {
    router.back()
  }

  const increaseTextSize = () => {
    if (textSize < 24) {
      setTextSize(prevSize => prevSize + 2)
    }
  }

  const decreaseTextSize = () => {
    if (textSize > 14) {
      setTextSize(prevSize => prevSize - 2)
    }
  }

  const handleShare = async () => {
    try {
      const content = `${hymnTitle} (Hino ${hymnNumber})\n\n${lyricsContent}`
      await Share.share({
        message: content,
        title: `${hymnTitle} - Hino ${hymnNumber}`,
      })
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar a letra')
    }
  }

  const formatLyrics = (lyrics: string) => {
    return lyrics.split('\n').map((line, index) => {
      const isChorus =
        line.includes('[CHORUS_START]') || line.includes('[CHORUS_CONTENT]')

      const displayLine = line
        .replace('[CHORUS_START]', '')
        .replace('[CHORUS_CONTENT]', '')

      return (
        <Text
          key={index}
          style={[
            styles.lyrics,
            { fontSize: textSize },
            isChorus && styles.chorusText,
          ]}
        >
          {displayLine || ' '}
        </Text>
      )
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.hymnNumber}>Hino {hymnNumber}</Text>
          <Text style={styles.title}>{hymnTitle}</Text>
        </View>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.lyricsContainer}>
          {lyricsContent ? (
            formatLyrics(lyricsContent)
          ) : (
            <Text style={styles.noLyrics}>
              Letra não disponível para este hino.
            </Text>
          )}
        </View>
        <View style={styles.floatingPlayerSpace} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.textSizeControls}>
          <TouchableOpacity
            onPress={decreaseTextSize}
            style={styles.sizeButton}
            disabled={textSize <= 14}
          >
            <Ionicons
              name="remove"
              size={24}
              color={textSize <= 14 ? colors.textMuted : colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.textSizeLabel}>Tamanho do texto</Text>
          <TouchableOpacity
            onPress={increaseTextSize}
            style={styles.sizeButton}
            disabled={textSize >= 24}
          >
            <Ionicons
              name="add"
              size={24}
              color={textSize >= 24 ? colors.textMuted : colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Adiciona o FloatingPlayer diretamente na tela de lyrics */}
      <FloatingPlayer style={styles.floatingPlayer} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
  },
  chorusText: {
    color: colors.text,
    fontFamily: fontFamily.plusJakarta.bold,
    //marginLeft: 10,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  floatingPlayer: {
    borderRadius: 12,
    bottom: 94,
    left: 8,
    position: 'absolute',
    right: 8,
  },
  floatingPlayerSpace: {
    height: 100, // Ajustado para considerar o tamanho do FloatingPlayer (com padding e margens)
  },
  footer: {
    borderTopColor: colors.third,
    borderTopWidth: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: colors.third,
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 16,
  },
  hymnNumber: {
    color: colors.primary,
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: fontSize.sm,
    marginBottom: 4,
  },
  lyrics: {
    color: colors.text,
    fontFamily: fontFamily.plusJakarta.medium,
    lineHeight: 28,
    marginBottom: 8,
  },
  lyricsContainer: {
    marginBottom: 16,
    marginTop: 16,
  },
  noLyrics: {
    color: colors.textMuted,
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.base,
    marginTop: 32,
    textAlign: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 0, // Removemos o padding do fundo porque estamos usando o floatingPlayerSpace
  },
  shareButton: {
    padding: 8,
  },
  sizeButton: {
    backgroundColor: colors.third,
    borderRadius: 20,
    marginHorizontal: 10,
    padding: 8,
  },
  textSizeControls: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textSizeLabel: {
    color: colors.textMuted,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.sm,
  },
  title: {
    color: colors.text,
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: fontSize.lg,
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
  },
})
