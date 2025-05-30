import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { getDailyHymn } from '@/helpers/getDailyHymn'
import { ListHymns, Hymn, Category } from '@/types/hymnsTypes'
import { colors, fontFamily, fontSize } from '@/constants/styles'
import ActiveHymnsDownloadSVG from '../svg/ActiveHymnsDownloadSvg'
import SpreedSVG from '../svg/SpreedSvg'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import Authors from './Authors'
import { getBackgroundSource } from '@/helpers/getBackgroundSource'
import { dateFormat } from '@/helpers/dateFormat'
import { truncateText, truncateTextWords } from '@/helpers/textsWords'
import PlayButton from './PlayButton'
import { usePlayerStore } from '@/store/playerStore'
import { useShallow } from 'zustand/react/shallow'
import CategoriesOutlineSVG from '../svg/CategoriesOutlineSvg'

interface CardHymnDayProps {
  hymns: ListHymns
  categories: Category[]
}

const CardHymnDay = ({ hymns, categories }: CardHymnDayProps) => {
  const [hymn, setHymn] = useState<Hymn | undefined>()

  const { isPlaying, play, pause, activeHymn } = usePlayerStore(
    useShallow(state => ({
      play: state.play,
      pause: state.pause,
      isPlaying: state.isPlaying,
      activeHymn: state.activeHymn,
    }))
  )

  useEffect(() => {
    const fetchHymn = async () => {
      const hymnOfTheDay = await getDailyHymn(hymns)
      setHymn(hymnOfTheDay)
    }
    fetchHymn()
  }, [hymns])

  const categoryUri = () => {
    const categoryFound = categories.find(
      (item: Category) => item.name === hymn?.category?.name
    )
    return getBackgroundSource(categoryFound?.name ?? '')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {hymn ? (
        <View style={styles.container}>
          <FastImage
            source={{ uri: categoryUri() }}
            style={styles.backgroundImage}
            resizeMode={FastImage.resizeMode.cover}
          />
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.43)', 'rgba(71, 70, 70, 0.7)']}
            style={styles.backgroundImage}
          />
          <View style={styles.content}>
            <View>
              <View style={styles.headerContentText}>
                <View style={styles.headerContentTitle}>
                  <View style={styles.title}>
                    <Text style={styles.titleText}>Hino do dia para você</Text>
                    <View style={styles.headerContentCategoria}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ paddingTop: 8 }}
                      >
                        <SpreedSVG color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.headerContentCategoria}>
                    <Text style={styles.titleDate}>
                      {dateFormat(new Date())}
                    </Text>

                    <View style={styles.headerContentCategoriaIcon}>
                      <CategoriesOutlineSVG
                        color={colors.white}
                        height={12}
                        width={12}
                      />
                      <Text style={styles.titleCategoria}>
                        {hymn?.category
                          ? truncateText(hymn?.category?.name, 12)
                          : ''}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View>
                <View style={styles.hymnHeaderContentTitle}>
                  <Text style={styles.hymnTitle}>
                    {truncateTextWords(hymn?.title, 4)}
                  </Text>
                  <ActiveHymnsDownloadSVG
                    color={colors.green}
                    style={{ marginTop: 10 }}
                  />
                </View>
                <View style={styles.hymnTitleNumberAuthorContent}>
                  <Text style={styles.hymnTitleNumber}>{hymn.numberView}</Text>
                  <Authors
                    style={styles.hymnTitleAuthor}
                    authors={Object.values(hymn.authors)}
                    card={false}
                  />
                </View>

                <View style={{ justifyContent: 'flex-end' }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.hymnTitlePlay}
                    onPress={() =>
                      isPlaying
                        ? pause()
                        : activeHymn?.id === hymn.id
                          ? play()
                          : play(hymn)
                    }
                  >
                    <Text style={styles.hymnTitlePlayText}>
                      {isPlaying && activeHymn?.id === hymn.id
                        ? 'Pausar'
                        : 'Tocar Agora'}
                    </Text>

                    <PlayButton
                      isPlaying={isPlaying}
                      id={hymn.id as number}
                      height={20}
                      width={20}
                      activeHymnId={activeHymn?.id as number}
                      handleHymnSelect={() =>
                        isPlaying
                          ? pause()
                          : activeHymn?.id === hymn.id
                            ? play()
                            : play(hymn)
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <ActivityIndicator
          style={{ marginTop: 16 }}
          testID="loading-indicator"
          size="large"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 10,
    position: 'relative',
  },
  content: {
    flex: 1,
    padding: 10,
    position: 'relative',
    width: '100%',
  },
  headerContentCategoria: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerContentText: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerContentTitle: {},
  hymnHeaderContentTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  hymnTitle: {
    color: 'white',
    fontFamily: fontFamily.sacramento.regular,
    fontSize: 32,
    marginBottom: -12,
  },
  hymnTitleAuthor: {
    color: colors.third,
    fontSize: fontSize.xs,
  },
  hymnTitleNumber: {
    color: 'white',
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: fontSize.base,
  },
  hymnTitleNumberAuthorContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  hymnTitlePlay: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: colors.green,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  hymnTitlePlayText: {
    color: 'white',
    fontFamily: fontFamily.plusJakarta.medium,
  },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
  titleAno: {
    backgroundColor: colors.greenRGBA,
    borderColor: colors.green,
    borderWidth: 1,
    borderRadius: 8,
    color: 'white',
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.xs,
    fontWeight: '600',
    padding: 3,
  },
  headerContentCategoriaIcon: {
    backgroundColor: colors.cards,
    borderColor: colors.cards,
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  titleCategoria: {
    color: 'white',
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  titleDate: {
    color: 'white',
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.xs,
  },
  titleText: {
    color: 'white',
    fontFamily: fontFamily.rochester.regular,
    fontSize: 30,
  },
})

export default CardHymnDay
