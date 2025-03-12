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
import React, { memo } from 'react'

type IconProps = {
  color: string
  focused: boolean
}

const PLAYER_STYLES = {
  position: 'absolute' as const,
  left: 8,
  right: 8,
  bottom: 94,
  borderRadius: 12,
}

const TAB_BAR_OPTIONS = {
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.second,
  tabBarLabelStyle: {
    fontSize: 12,
    flexDirection: 'row',
    fontFamily: fontFamily.plusJakarta.medium,
  },
  headerShown: false,
} as const

const IconRenderer = ({
  color,
  focused,
  ActiveIcon,
  InactiveIcon,
}: IconProps & {
  ActiveIcon: React.FC<{ width?: number; height?: number; color: string }>
  InactiveIcon: React.FC<{ width?: number; height?: number; color: string }>
}) => {
  return focused ? (
    <ActiveIcon height={22} width={22} color={color} />
  ) : (
    <InactiveIcon height={22} width={22} color={color} />
  )
}

function TabsNavigation() {
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
