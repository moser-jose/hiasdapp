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
import { useLibraryStore, useLyrics } from '@/store/library'
import { useShallow } from 'zustand/react/shallow'
import { Author, Hymn, Lyrics } from '@/types/hymnsTypes'
import { Ionicons } from '@expo/vector-icons'
import FloatingPlayer from '@/components/util/FloatingPlayer'
import ToogleFavorites from '@/components/util/ToogleFavorites'
import { PlayerControlsLyrics } from '@/components/util/PlayerControls'
import { useStateStore } from '@/store/modal'
export default function LyricsScreen() {
  const {
    id,
    title,
    lyrics,
    biblicalText,
    numberView,
    englishTitle,
    number,
    authors,
  } = useLocalSearchParams()
  const [lyricsContent, setLyricsContent] = useState<string>('')
  const [textSize, setTextSize] = useState<number>(fontSize.base)
  const [paraAuthors, setParaAuthors] = useState<Author[]>(
    Object.values(JSON.parse(authors as string) as Author[])
  )

  const av = useLyrics(parseInt(id as string))

  const hymns = useLibraryStore(useShallow(state => state.hymns))

  const setLyricsScreenOpen = useStateStore(
    useShallow(state => state.setLyricsScreenOpen)
  )

  useEffect(() => {
    setLyricsScreenOpen(true)
    return () => {
      setLyricsScreenOpen(false)
    }
  }, [])

  useEffect(() => {
    if (authors) {
      setParaAuthors(Object.values(JSON.parse(authors as string) as Author[]))
    }
  }, [authors])

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

    if (id && hymns.length > 0) {
      const hymn = hymns.find((h: Hymn) => h.id.toString() === id.toString())
      if (hymn && typeof hymn.lyrics === 'string') {
        setLyricsContent(hymn.lyrics)
      }
    }
  }, [id, hymns, lyrics])

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
      const content = `${title} (Hino ${number})\n\n${lyricsContent}`
      await Share.share({
        message: content,
        title: `${title} - Hino ${number}`,
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
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <View style={styles.hymnNumberContainer}>
            <Text style={styles.hymnNumber}>{numberView}</Text>
            <Text style={styles.biblicalText}>{biblicalText}</Text>
          </View>
          <View style={styles.titleContainerFavorite}>
            <Text style={styles.title}>{title}</Text>
            <ToogleFavorites id={parseInt(id as string)} />
          </View>
          <View style={styles.authorsContainer}>
            {paraAuthors.map((author, index) => {
              return (
                <Text style={styles.authorsTitle} key={index}>
                  {author.name}
                  {index < paraAuthors.length - 1 && ', '}
                </Text>
              )
            })}
          </View>
        </View>

        <PlayerControlsLyrics
          style={styles.playerControls}
          styleRow={styles.playerControlsRow}
          heightPlay={40}
          widthPlay={40}
          heightNext={30}
          widthNext={30}
          heightPrevious={30}
          widthPrevious={30}
        />

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
          {/*  <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Adiciona o FloatingPlayer diretamente na tela de lyrics */}
      <FloatingPlayer style={styles.floatingPlayer} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  authorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },

  authorsTitle: {
    color: colors.textMuted,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.sm,
  },

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
  biblicalText: {
    color: colors.textMuted,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.sm,
  },
  floatingPlayerSpace: {
    height: 100,
  },
  footer: {
    borderTopColor: colors.third,
    borderTopWidth: 1,
    padding: 16,
  },
  header: {
    //alignItems: 'center',
    borderBottomColor: colors.third,
    borderBottomWidth: 1,
    //flexDirection: 'row',
    padding: 16,
  },
  hymnNumber: {
    color: colors.primary,
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: fontSize.base,
    marginBottom: 4,
  },

  hymnNumberContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
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
  playerControls: {
    justifyContent: 'flex-start',
    marginTop: 10,
    width: 180,
  },
  playerControlsRow: {
    justifyContent: 'flex-start',
    gap: 10,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 0,
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
    flexDirection: 'row' /* 
    justifyContent: 'center', */,
  },
  textSizeLabel: {
    color: colors.textMuted,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.sm,
  },
  title: {
    color: colors.text,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.lg,
  },
  titleContainer: {
    marginTop: 10,
  },
  titleContainerFavorite: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})
