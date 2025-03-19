import { PlayerProgressBar } from '@/components/svg/PlayerProgressbar'
import Authors from '@/components/util/Authors'
import LyricsInPlayer from '@/components/util/LyricsInPlayer'
import { MovingText } from '@/components/util/MovingText'
import { PlayerControls } from '@/components/util/PlayerControls'
import { PlayerVolumeBar } from '@/components/util/PlayerVolumeBar'
import ToogleFavorites from '@/components/util/ToogleFavorites'
import ToogleLyricInPlayer from '@/components/util/ToogleLyricInPlayer'
import TooglePlayListInPlayer from '@/components/util/TooglePlayListInPlayer'
import { logoApp } from '@/constants/images'
import { colors, fontFamily, fontSize } from '@/constants/styles'
import { usePlayerBackground } from '@/hooks/usePlayerBackground'
import { usePlayerStore } from '@/store/playerStore'
import { useStateStore } from '@/store/stateStore'
import { defaultStyles } from '@/styles'
import { memo, useEffect, useMemo, useRef } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { LinearGradient } from 'react-native-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useShallow } from 'zustand/react/shallow'

// Constantes
const TABLET_BREAKPOINT = 768 // iPad mini e acima
const LARGE_SCREEN_BREAKPOINT = 1024 // iPad Pro e acima

// Tipos
interface ResponsiveStylesProps {
  width: number
  height: number
  isLandscape: boolean
  isTablet: boolean
  isLargeScreen: boolean
}

interface TrackInfoProps {
  displayHymn: any
  isLandscape: boolean
}

// Função utilitária para calcular tamanhos responsivos
const getResponsiveSize = (baseSize: number) => {
  const { width } = Dimensions.get('window')
  const isSmallDevice = width < 375 // iPhone SE, etc.
  const isTablet = width >= TABLET_BREAKPOINT
  const isLargeScreen = width >= LARGE_SCREEN_BREAKPOINT

  if (isSmallDevice) return Math.max(baseSize * 0.85, 9) // Nunca menor que 9pts
  if (isTablet) return baseSize * 1.2
  if (isLargeScreen) return baseSize * 1.4
  return baseSize
}

// Componente para o artwork do player
const PlayerArtwork = memo(
  ({
    artwork,
    top,
    bottom,
  }: {
    artwork: string
    top: number
    bottom: number
  }) => {
    const viewLyric = useStateStore(useShallow(state => state.viewLyric))
    const viewPlayList = useStateStore(useShallow(state => state.viewPlaylist))
    const { width, height } = useWindowDimensions()
    const isLandscape = width > height
    const isTablet = width >= TABLET_BREAKPOINT

    // Calcular tamanho responsivo da imagem - Movido para antes do return
    const artworkSize = useMemo(() => {
      if (isTablet) {
        return isLandscape
          ? Math.min(width * 0.4, height * 0.75)
          : Math.min(width * 0.6, height * 0.35)
      }

      return isLandscape
        ? Math.min(width * 0.45, height * 0.65)
        : Math.min(width * 0.65, height * 0.4)
    }, [width, height, isLandscape, isTablet])

    const topMargin = isLandscape ? top + 10 : top + (isTablet ? 30 : 50)
    const bottomMargin = isTablet ? bottom + 20 : bottom

    // Return após todos os hooks serem chamados
    if (viewLyric || viewPlayList) return null

    return (
      <View
        style={[
          styles.artworkContainer,
          {
            flex: isLandscape ? 0.5 : undefined,
            marginTop: topMargin,
            marginBottom: bottomMargin,
          },
        ]}
      >
        <View
          style={[
            styles.artworkImageContainer,
            {
              width: artworkSize,
              height: artworkSize,
              aspectRatio: 1,
            },
          ]}
        >
          <FastImage
            source={{
              uri: artwork,
              priority: FastImage.priority.high,
            }}
            resizeMode="cover"
            style={styles.artworkImage}
          />
        </View>
      </View>
    )
  }
)

// Componente para o indicador de arraste
const DismissPlayerSimbol = memo(() => {
  const { top } = useSafeAreaInsets()
  const { width } = useWindowDimensions()
  const isTablet = width >= TABLET_BREAKPOINT
  const indicatorWidth = Math.min(isTablet ? 70 : 50, width * 0.12)

  return (
    <View style={styles.dismissContainer}>
      <View
        accessible={false}
        style={[
          styles.dismissIndicator,
          {
            width: indicatorWidth,
            top: top + (isTablet ? 12 : 8),
          },
        ]}
      />
    </View>
  )
})

// Componente para informações da faixa
const TrackInfo = memo(({ displayHymn, isLandscape }: TrackInfoProps) => {
  const { width } = useWindowDimensions()
  const isTablet = width >= TABLET_BREAKPOINT

  return (
    <View style={styles.trackInfoContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={styles.trackTitleContainer}>
          <Text style={styles.trackNumberView}>{displayHymn.numberView}</Text>
          <View style={styles.trackTitleContainerView}>
            <View
              style={{
                maxWidth: isLandscape ? '80%' : '65%',
                overflow: 'hidden',
              }}
            >
              <MovingText
                text={displayHymn.title ?? ''}
                animationThreshold={isTablet ? 30 : 23}
                style={styles.trackTitleText}
              />
            </View>

            <View style={{ paddingHorizontal: 6 }}>
              <ToogleFavorites id={displayHymn.id as number} />
            </View>
          </View>

          {displayHymn.englishTitle && (
            <Text style={styles.trackEnglishTitle}>
              {displayHymn.englishTitle}
            </Text>
          )}
          <Authors
            style={styles.authors}
            authors={Object.values(displayHymn.authors)}
            card={false}
          />
        </View>
      </View>
    </View>
  )
})

// Componente para botões de controle
const PlayerButtons = memo(() => {
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height
  const isTablet = width >= TABLET_BREAKPOINT
  const marginVertical = height * (isTablet ? 0.025 : 0.02)

  return (
    <View
      style={[
        styles.playerButtonsContainer,
        {
          marginTop: marginVertical,
          marginBottom: isLandscape ? marginVertical : marginVertical * 2,
        },
      ]}
    >
      <ToogleLyricInPlayer />
      <TooglePlayListInPlayer />
    </View>
  )
})

// Tela principal
const PlayerScreen = () => {
  const activeHymn = usePlayerStore(useShallow(state => state.activeHymn))
  const { background } = usePlayerBackground(logoApp)
  const { top, bottom } = useSafeAreaInsets()
  const prevActiveHymnRef = useRef(activeHymn)
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height
  const isTablet = width >= TABLET_BREAKPOINT
  const isLargeScreen = width >= LARGE_SCREEN_BREAKPOINT

  // Calcular valores responsivos
  const responsiveStyles = useMemo(() => {
    return createResponsiveStyles({
      width,
      height,
      isLandscape,
      isTablet,
      isLargeScreen,
    })
  }, [width, height, isLandscape, isTablet, isLargeScreen])

  useEffect(() => {
    if (activeHymn) {
      prevActiveHymnRef.current = activeHymn
    }
  }, [activeHymn])

  const displayHymn = activeHymn || prevActiveHymnRef.current

  // Preparar conteúdo condicional
  const renderContent = () => {
    if (!displayHymn) {
      return (
        <View style={[defaultStyles.container, { justifyContent: 'center' }]}>
          <ActivityIndicator
            size={isTablet ? 'large' : 'small'}
            color={colors.icon}
          />
        </View>
      )
    }

    return (
      <LinearGradient
        style={styles.container}
        colors={
          background
            ? [background.background, background.primary]
            : [colors.background]
        }
      >
        <View style={styles.overlayContainer}>
          <DismissPlayerSimbol />

          <View style={responsiveStyles.mainContent}>
            <PlayerArtwork artwork={logoApp} top={top} bottom={bottom} />
            <LyricsInPlayer lyrics={displayHymn?.lyrics} />
            <View style={responsiveStyles.playerControlsArea}>
              <View style={styles.controlsWrapper}>
                <TrackInfo
                  displayHymn={displayHymn}
                  isLandscape={isLandscape}
                />
                <PlayerProgressBar style={responsiveStyles.progressBar} />
                <PlayerControls style={responsiveStyles.controls} />
              </View>
              <PlayerVolumeBar style={responsiveStyles.volumeBar} />
              <PlayerButtons />
            </View>
          </View>
        </View>
      </LinearGradient>
    )
  }

  // Renderizar o conteúdo condicional sem riscos de hooks
  return renderContent()
}

// Criador de estilos responsivos
const createResponsiveStyles = ({
  width,
  height,
  isLandscape,
  isTablet,
  isLargeScreen,
}: ResponsiveStylesProps) => {
  const paddingHorizontal = Math.min(width * 0.04, isTablet ? 30 : 20)
  const marginVertical = height * (isTablet ? 0.025 : 0.02)

  return StyleSheet.create({
    contentContainer: {
      paddingHorizontal: paddingHorizontal,
    },
    controls: {
      marginBottom: marginVertical,
    },
    progressBar: {
      marginVertical: marginVertical + 15,
    },
    volumeBar: {
      marginTop: marginVertical - 10,
      maxWidth: isLargeScreen ? '80%' : '100%',
      alignSelf: isLargeScreen ? 'center' : undefined,
      justifyContent: 'center',
      paddingHorizontal: Math.min(isTablet ? 40 : 30, width * 0.08),
    },
    mainContent: {
      flex: 1,
      flexDirection: isLandscape ? 'row' : 'column',
      paddingHorizontal: isTablet ? 20 : 10,
    },
    playerControlsArea: {
      flex: isLandscape ? 0.6 : 1,
      justifyContent: 'flex-end',
      paddingBottom: isTablet ? 20 : 10,
    },
  })
}

// Estilos base
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artworkContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  artworkImage: {
    borderRadius: 12,
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },
  artworkImageContainer: {
    borderRadius: 11,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  authors: {
    color: colors.second,
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: getResponsiveSize(fontSize.xsm),
  },
  controlsWrapper: {
    marginTop: 'auto',
  },
  dismissContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 10,
  },
  dismissIndicator: {
    height: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    opacity: 0.7,
    position: 'absolute',
  },
  overlayContainer: {
    ...defaultStyles.container,
    backgroundColor:
      Platform.OS === 'ios' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.5)',
  },
  playerButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  trackEnglishTitle: {
    color: colors.second,
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: getResponsiveSize(fontSize.xsm),
    marginVertical: 0,
  },
  trackInfoContainer: {
    minHeight: 80,
    paddingVertical: 5,
  },
  trackNumberView: {
    marginTop: 12,
    color: colors.second,
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: getResponsiveSize(16),
  },
  trackTitleContainer: {
    flex: 1,
    minHeight: 98,
    height: 110,
    //maxHeight: 100,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  trackTitleContainerView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackTitleText: {
    color: 'white',
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: getResponsiveSize(20),
  },
})

export default memo(PlayerScreen)
