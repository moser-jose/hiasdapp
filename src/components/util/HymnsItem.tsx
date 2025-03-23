import { colors, fontFamily, fontSize } from '@/constants/styles'
import { truncateText } from '@/helpers/textsWords'
import { usePlayerStore } from '@/store/playerStore'
import { Author, HymnsProps } from '@/types/hymnsTypes'
import { memo, useMemo, useState, useRef } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
} from 'react-native'
import { useShallow } from 'zustand/react/shallow'
import ActiveHymnsDownloadSVG from '../svg/ActiveHymnsDownloadSvg'
import SpreedSVG from '../svg/SpreedSvg'
import DownloadSVG from '../svg/DownloadSvg'
//import ShareSVG from '../svg/ShareSvg'
import Authors from './Authors'
import ToogleFavorites from './ToogleFavorites'
import LoaderKit from 'react-native-loader-kit'
import { router } from 'expo-router'
import React from 'react'
import PlayButton from './PlayButton'
import { Ionicons } from '@expo/vector-icons'

function HymnsItem({ hymn, id, onHymnSelect: handleHymnSelect }: HymnsProps) {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 })
  const spreedButtonRef = useRef<View>(null)

  const { isPlaying, activeHymn } = usePlayerStore(
    useShallow(state => ({
      play: state.play,
      pause: state.pause,
      isPlaying: state.isPlaying,
      activeHymn: state.activeHymn,
    }))
  )

  const isActiveHymn = useMemo(
    () => activeHymn?.url === hymn.url,
    [activeHymn?.url, hymn.url]
  )

  const activeStyle = StyleSheet.create({
    activeTitle: {
      ...styles.title,
      color: colors.active,
      fontWeight: 'bold',
    },
    normalTitle: {
      ...styles.title,
      color: colors.text,
      fontWeight: 'normal',
    },
  })

  const titleStyle = useMemo(
    () => (isActiveHymn ? activeStyle.activeTitle : activeStyle.normalTitle),
    [isActiveHymn, activeStyle]
  )

  const handleDownload = () => {
    // Implementar lógica de download
    setModalVisible(false)
  }

  const handleShare = () => {
    // Implementar lógica de compartilhamento
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
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/lyrics`,
          params: {
            id: hymn.id,
            idQueue: id,
            numberView: hymn.numberView,
            authors: hymn.authors ? JSON.stringify(hymn.authors) : null,
            lyrics: hymn.lyrics ? JSON.stringify(hymn.lyrics) : null,
            number: hymn.number,
            title: hymn.title,
            englishTitle: hymn.englishTitle,
            biblicalText: hymn.biblicalText,
            url: hymn.url,
          },
        })
      }
      activeOpacity={0.7}
      style={styles.container}
    >
      <View style={styles.card}>
        {isPlaying && id === activeHymn?.id ? (
          <LoaderKit
            style={{ width: 20, height: 20, marginHorizontal: 6 }}
            name={'LineScalePulseOut'}
            color={colors.primary}
          />
        ) : (
          <PlayButton
            isPlaying={isPlaying}
            testID={`play-button-${hymn.number}`}
            id={id as number}
            backgroundColor="rgba(0, 0, 0, 0.03)"
            activeHymnId={activeHymn?.id as number}
            handleHymnSelect={() => handleHymnSelect(hymn)}
            /* handleHymnSelect={() =>
            isPlaying ? pause() : isActiveHymn ? play() : play(hymn)
          } */
            height={30}
            width={32}
          />
        )}
        <View style={styles.cardMore}>
          <View style={styles.numberCard}>
            <Text style={styles.number}>{hymn.number}</Text>
            <ActiveHymnsDownloadSVG color={colors.second} />
            {hymn.biblicalText && (
              <Text style={styles.baseTitle}>{hymn.biblicalText}</Text>
            )}
          </View>
          <View style={styles.ViewCard}>
            <Text style={titleStyle}>{truncateText(hymn.title, 29)}</Text>
            {hymn.englishTitle && (
              <Text style={styles.baseTitle}>{hymn.englishTitle}</Text>
            )}
            <Authors
              style={styles.author}
              authors={Object.values(hymn.authors) as Author[]}
              card={false}
            />
          </View>
        </View>
        <ToogleFavorites id={hymn.id} />

        <View style={styles.cardSpreed}>
          <TouchableOpacity
            ref={spreedButtonRef}
            style={styles.cardSpreedTouch}
            onPress={handleSpreedPress}
          >
            <SpreedSVG width={16} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de opções */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[
              styles.modalContainer,
              {
                position: 'absolute',
                top: modalPosition.top,
                right: modalPosition.right,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleDownload}
            >
              <View style={styles.modalOptionContent}>
                <Ionicons
                  name="download-outline"
                  size={18}
                  color={colors.primary}
                />
                <Text style={styles.modalOptionText}>Baixar o hino</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.modalDivider} />

            <TouchableOpacity style={styles.modalOption} onPress={handleShare}>
              <View style={styles.modalOptionContent}>
                <Ionicons
                  name="share-outline"
                  size={18}
                  color={colors.primary}
                />
                <Text style={styles.modalOptionText}>Partilhar</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ViewCard: {
    flex: 1,
  },
  author: {
    color: colors.textMuted,
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.xss,
  },
  baseTitle: {
    color: colors.textMuted,
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.xss,
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    position: 'relative',
  },
  cardMore: {
    flex: 1,
  },
  cardSpreed: {
    alignItems: 'center',
  },
  cardSpreedTouch: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 4,
  },
  /* cardTittle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  }, */
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginRight: 16,
    position: 'relative',
  },
  number: {
    color: colors.primary,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.sm,
  },
  numberCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  title: {
    color: colors.text,
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: fontSize.sm,
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
    fontSize: fontSize.sm,
  },
  modalDivider: {
    height: 0.3,
    backgroundColor: colors.textMuted,
    marginHorizontal: 0,
  },
})
export default memo(HymnsItem)
