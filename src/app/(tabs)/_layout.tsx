import CategoriesOutlineSVG from '@/components/svg/CategoriesOutlineSvg'
import CategoriesSVG from '@/components/svg/CategoriesSvg'
import ConfigurationsOutlineSVG from '@/components/svg/ConfigurationsOutlineSvg'
import ConfigurationsSVG from '@/components/svg/ConfigurationsSvg'
import HomeOutlineSVG from '@/components/svg/HomeOutlineSvg'
import HomeSVG from '@/components/svg/HomeSvg'
import HymnsOutlineSvg from '@/components/svg/HymnsOutlineSvg'
import HymnsSVG from '@/components/svg/HymnsSvg'
import PlayListsOutlineSVG from '@/components/svg/PlayListsOutlineSVG'
import PlayListsSVG from '@/components/svg/PlayListsSVG'
import FloatingPlayer from '@/components/util/FloatingPlayer'
import { colors, fontFamily } from '@/constants/styles'
import { Tabs } from 'expo-router'
import React, { memo, useEffect, useState } from 'react'
import { Dimensions, Platform, ScaledSize } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window')

// Calcular tamanhos responsivos
const getResponsiveSizes = (screenWidth: number) => {
  // Ajustar proporcionalmente com base na largura da tela
  const baseIconSize = Math.max(18, Math.min(22, screenWidth * 0.055))
  const baseFontSize = Math.max(10, Math.min(12, screenWidth * 0.03))

  return {
    iconSize: baseIconSize,
    fontSize: baseFontSize,
    tabBarHeight: Math.max(50, Math.min(90, screenWidth * 0.17)),
  }
}

const responsiveSizes = getResponsiveSizes(width)

type IconProps = {
  color: string
  focused: boolean
  size?: number
}

const TAB_BAR_OPTIONS = {
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.second,

  tabBarLabelStyle: {
    fontSize: responsiveSizes.fontSize,
    flexDirection: 'row',
    fontFamily: fontFamily.plusJakarta.medium,
    paddingBottom: Platform.OS === 'ios' ? 14 : 4,
  },
  tabBarStyle: {
    height: responsiveSizes.tabBarHeight,
    paddingTop: Platform.OS === 'ios' ? 1 : 0,
    paddingBottom: Platform.OS === 'ios' ? 80 : 0,
  },
  headerShown: false,
} as const

const IconRenderer = ({
  color,
  focused,
  size = responsiveSizes.iconSize,
  ActiveIcon,
  InactiveIcon,
}: IconProps & {
  ActiveIcon: React.FC<{ width?: number; height?: number; color: string }>
  InactiveIcon: React.FC<{ width?: number; height?: number; color: string }>
}) => {
  return focused ? (
    <ActiveIcon height={size} width={size} color={color} />
  ) : (
    <InactiveIcon height={size} width={size} color={color} />
  )
}

function TabsNavigation() {
  const insets = useSafeAreaInsets()
  const [dimensions, setDimensions] = useState({ width, height })
  const [sizes, setSizes] = useState(responsiveSizes)
  let PLAYER_STYLES = {}

  // Adicionar listener para mudanças de dimensão (rotação de tela, etc)
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window }: { window: ScaledSize }) => {
        setDimensions({ width: window.width, height: window.height })
        setSizes(getResponsiveSizes(window.width))
      }
    )

    return () => subscription.remove()
  }, [])

  // Configuração responsiva para todos os dispositivos
  PLAYER_STYLES = {
    position: 'absolute' as const,
    //left: dimensions.width * 0.04,
    //right: dimensions.width * 0.04,
    borderRadius: 0,
  }

  if (Platform.OS === 'ios') {
    // Ajuste específico para iOS
    if (insets.bottom > 0) {
      // Dispositivos com notch (iPhone X e mais recentes)
      PLAYER_STYLES = {
        ...PLAYER_STYLES,
        bottom: insets.bottom + dimensions.height * 0.05,
      }
    } else {
      // Dispositivos sem notch
      PLAYER_STYLES = {
        ...PLAYER_STYLES,
        bottom: dimensions.height * 0.09,
      }
    }
  } else {
    // Ajuste para Android
    PLAYER_STYLES = {
      ...PLAYER_STYLES,
      bottom: dimensions.height * 0.07,
    }
  }

  return (
    <>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          ...TAB_BAR_OPTIONS,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: ({ color, focused }) => (
              <IconRenderer
                color={color}
                focused={focused}
                size={sizes.iconSize}
                ActiveIcon={HomeSVG}
                InactiveIcon={HomeOutlineSVG}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(hymns)"
          options={{
            tabBarLabel: 'Hinos',
            tabBarIcon: ({ color, focused }) => (
              <IconRenderer
                color={color}
                focused={focused}
                size={sizes.iconSize}
                ActiveIcon={HymnsSVG}
                InactiveIcon={HymnsOutlineSvg}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(categories)"
          options={{
            tabBarLabel: 'Seções',
            tabBarIcon: ({ color, focused }) => (
              <IconRenderer
                color={color}
                focused={focused}
                size={sizes.iconSize}
                ActiveIcon={CategoriesSVG}
                InactiveIcon={CategoriesOutlineSVG}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(playlists)"
          options={{
            tabBarLabel: 'Coletâneas',
            tabBarIcon: ({ color, focused }) => (
              <IconRenderer
                color={color}
                focused={focused}
                size={sizes.iconSize}
                ActiveIcon={PlayListsSVG}
                InactiveIcon={PlayListsOutlineSVG}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(configurations)"
          options={{
            tabBarLabel: 'Ajustes',
            tabBarIcon: ({ color, focused }) => (
              <IconRenderer
                color={color}
                focused={focused}
                size={sizes.iconSize}
                ActiveIcon={ConfigurationsSVG}
                InactiveIcon={ConfigurationsOutlineSVG}
              />
            ),
          }}
        />
      </Tabs>
      <FloatingPlayer style={PLAYER_STYLES} />
    </>
  )
}

export default memo(TabsNavigation)
