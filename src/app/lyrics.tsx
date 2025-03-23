import FloatingPlayer from '@/components/util/FloatingPlayer'
import { ModalHymnItem } from '@/components/util/ModalHymnItem'
import PlayButton from '@/components/util/PlayButton'
import ToogleFavorites from '@/components/util/ToogleFavorites'
import { colors, fontFamily, fontSize } from '@/constants/styles'
import { truncateText } from '@/helpers/textsWords'
import { useLibraryStore } from '@/store/library'
import { useStateStore as useModalStore } from '@/store/modal'
import { usePlayerStore, useQueue } from '@/store/playerStore'
import { useStateStore } from '@/store/stateStore'
import { Author, Hymn, Lyrics } from '@/types/hymnsTypes'
import { Ionicons } from '@expo/vector-icons'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { memo, useEffect, useRef, useState } from 'react'
import {
  Alert,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Track } from 'react-native-track-player'
import { useShallow } from 'zustand/react/shallow'
export default function LyricsScreen() {
  const {
    id,
    title,
    lyrics,
    biblicalText,
    numberView,
    number,
    authors,
    idQueue,
  } = useLocalSearchParams()
  const [lyricsContent, setLyricsContent] = useState<string>('')
  const [textSize, setTextSize] = useState<number>(fontSize.smB)

  const [modalVisible, setModalVisible] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 })
  const spreedButtonRef = useRef<View>(null)

  const [paraAuthors, setParaAuthors] = useState<Author[]>(
    Object.values(JSON.parse(authors as string) as Author[])
  )
  const { bottom } = useSafeAreaInsets()

  const shuffle = useStateStore(useShallow(state => state.shuffle))
  const setShuffle = useStateStore(useShallow(state => state.setShuffle))

  const play = usePlayerStore(useShallow(state => state.play))

  const { skipTo, add, reset } = usePlayerStore(
    useShallow(state => ({
      add: state.add,
      reset: state.reset,
      skipTo: state.skipTo,
    }))
  )
  const queueOffset = useRef(0)
  const { activeQueueId, setActiveQueueId } = useQueue()

  const hymns = useLibraryStore(useShallow(state => state.hymns))

  const setLyricsScreenOpen = useModalStore(
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

  const handleNextHymn = () => {
    if (hymns.length === 0) return

    const currentIndex = hymns.findIndex((h: Hymn) => h.id.toString() === id)
    if (currentIndex === -1) return

    const nextIndex = (currentIndex + 1) % hymns.length
    const nextHymn = hymns[nextIndex]

    router.push({
      pathname: '/lyrics',
      params: {
        id: nextHymn.id,
        title: nextHymn.title,
        lyrics: JSON.stringify(nextHymn.lyrics),
        biblicalText: nextHymn.biblicalText || '',
        numberView: nextHymn.numberView || nextHymn.number,
        englishTitle: nextHymn.englishTitle || '',
        number: nextHymn.number,
        authors: JSON.stringify(nextHymn.authors || []),
        idQueue: idQueue || '',
      },
    })
  }

  const handlePreviousHymn = () => {
    if (hymns.length === 0) return

    const currentIndex = hymns.findIndex((h: Hymn) => h.id.toString() === id)
    if (currentIndex === -1) return

    const previousIndex = (currentIndex - 1 + hymns.length) % hymns.length
    const previousHymn = hymns[previousIndex]

    router.push({
      pathname: '/lyrics',
      params: {
        id: previousHymn.id,
        title: previousHymn.title,
        lyrics: JSON.stringify(previousHymn.lyrics),
        biblicalText: previousHymn.biblicalText || '',
        numberView: previousHymn.numberView || previousHymn.number,
        englishTitle: previousHymn.englishTitle || '',
        number: previousHymn.number,
        authors: JSON.stringify(previousHymn.authors || []),
        idQueue: idQueue || '',
      },
    })
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

  const changingQueue = async (
    trackIndex: number,
    selectedTrack: Track | Hymn
  ) => {
    const beforeTracks = hymns.slice(0, trackIndex)
    const afterTracks = hymns.slice(trackIndex + 1)
    await reset()

    // we construct the new queue
    await add(selectedTrack)
    await add(afterTracks)
    await add(beforeTracks)

    await play()

    queueOffset.current = trackIndex
    setActiveQueueId(id as string)
  }

  const handleHymnSelect = async (selectedTrack: Track | Hymn) => {
    const trackIndex = hymns.findIndex(track => track.id === selectedTrack.id)

    if (trackIndex === -1) return

    const isChangingQueue = idQueue !== activeQueueId

    if (isChangingQueue) {
      await changingQueue(trackIndex, selectedTrack)
    } else {
      if (shuffle || !shuffle) {
        await changingQueue(trackIndex, selectedTrack)
        setShuffle()
      } else {
        const nextTrackIndex =
          trackIndex - queueOffset.current < 0
            ? hymns.length + trackIndex - queueOffset.current
            : trackIndex - queueOffset.current
        await skipTo(nextTrackIndex)
        play()
      }
    }
  }

  const DismissPlayerSimbol = memo(() => {
    const { top } = useSafeAreaInsets()
    return (
      <View
        style={{
          position: 'absolute',
          top: top + 5,
          right: 0,
          left: 0,
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <View
          accessible={false}
          style={{
            width: 50,
            height: 8,
            backgroundColor: colors.primary,
            borderRadius: 8,
            opacity: 0.7,
          }}
        />
      </View>
    )
  })

  const handleDownload = () => {
    setModalVisible(false)
  }

  const handleSpreedPress = () => {
    spreedButtonRef.current?.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        setModalPosition({
          top: pageY + height,
          right: Dimensions.get('window').width - (pageX + width),
        })
        setModalVisible(true)
      }
    )
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <DismissPlayerSimbol />

          <View style={styles.titleContainer}>
            <View style={styles.hymnNumberContainer}>
              <Text style={styles.hymnNumber}>{numberView}</Text>
              <Text style={styles.biblicalText}>{biblicalText}</Text>
            </View>
            <View style={styles.titleContainerFavorite}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.playerControlsRow}>
                <ToogleFavorites id={parseInt(id as string)} />
                <TouchableOpacity
                  ref={spreedButtonRef}
                  onPress={handleSpreedPress}
                  style={styles.shareButton}
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={22}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.authorsContainer}>
              {paraAuthors.map((author, index) => {
                return (
                  <Text style={styles.authorsTitle} key={index}>
                    {truncateText(author.name as string, 18)}
                    {index < paraAuthors.length - 1 && ', '}
                  </Text>
                )
              })}
            </View>
            <View style={styles.playContainer}>
              <TouchableOpacity
                style={styles.play}
                onPress={() => {
                  handleHymnSelect(
                    hymns.find(
                      (h: Hymn) => h.id.toString() === id.toString()
                    ) as Track | Hymn
                  )
                }}
              >
                <PlayButton
                  isPlaying={false}
                  activeHymnId={0}
                  handleHymnSelect={() => {
                    handleHymnSelect(
                      hymns.find(
                        (h: Hymn) => h.id.toString() === id.toString()
                      ) as Track | Hymn
                    )
                  }}
                  color={colors.primary}
                  width={18}
                  height={18}
                />
                <Text style={styles.playText}>Reproduzir</Text>
              </TouchableOpacity>
              <View style={styles.nextPreviousLyricsContainer}>
                <TouchableOpacity
                  onPress={handlePreviousHymn}
                  style={styles.navigationButton}
                >
                  <Ionicons
                    name="chevron-back"
                    size={20}
                    color={colors.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNextHymn}
                  style={styles.navigationButton}
                >
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.primary}
                  />
                </TouchableOpacity>
                <ModalHymnItem
                  title={title.toString()}
                  number={Number(number)}
                  lyrics={lyricsContent.replaceAll('[CHORUS_START]', '')}
                  modalPosition={modalPosition}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          style={{ top: 173 }}
          //showsVerticalScrollIndicator={false}
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

        <FloatingPlayer style={[styles.floatingPlayer, { bottom: bottom }]} />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  playContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    flex: 0,
  },
  nextPreviousLyricsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  authorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },

  authorsTitle: {
    color: colors.textMuted,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.xsm,
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
    //backgroundColor: 'rgba(0, 0, 0, 0.03)',
    position: 'relative',
    flex: 1,
  },
  floatingPlayer: {
    borderRadius: 0,
    //left: 8,
    position: 'absolute',
    //right: 8,
  },
  biblicalText: {
    color: colors.textMuted,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.xs,
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
    borderBottomColor: 'rgba(0, 0, 0, 0.06)',
    position: 'absolute',
    top: 0,
    zIndex: 10000,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    //backgroundColor: 'red',
    //flexDirection: 'row',
    padding: 16,
  },
  hymnNumber: {
    color: colors.primary,
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: fontSize.sm,
    marginBottom: 4,
  },

  hymnNumberContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 60,
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
    fontSize: fontSize.smB,
    marginTop: 32,
    textAlign: 'center',
  },
  playerControls: {
    justifyContent: 'flex-start',
    marginTop: 10,
    width: 180,
  },
  playerControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 18,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 0,
    //paddingTop: 150,
  },
  shareButton: {
    //padding: 8,
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
    fontSize: fontSize.smB,
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
  play: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: 'rgba(41, 193, 127, 0.16)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(41, 193, 126, 0.15)',
    shadowColor: colors.green,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
  },

  playText: {
    color: colors.primary,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.xsm,
  },
  navigationButton: {
    backgroundColor: 'rgba(41, 193, 127, 0.12)',
    borderRadius: 30,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(41, 193, 126, 0.15)',
    shadowColor: colors.green,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 5,
    width: '40%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  modalOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalOptionText: {
    color: colors.text,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.xsm,
  },
  modalDivider: {
    height: 0.3,
    backgroundColor: colors.textMuted,
    marginHorizontal: 0,
  },
})
