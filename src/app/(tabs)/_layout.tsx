import CategoriesSVG from '@/components/svg/CategoriesSvg'
import ConfigurationsSVG from '@/components/svg/ConfigurationsSvg'
import HymnsSVG from '@/components/svg/HymnsSvg'
import HomeSVG from '@/components/svg/HomeSvg'
import { colors, fontSize } from '@/constants/styles'
import { Tabs } from 'expo-router'
import PlaylistsSVG from '@/components/svg/PlayListsSVG'
import FloatingPlayer from '@/components/util/FloatingPlayer'
import { TouchableOpacity } from 'react-native'

const TabsNavigation = ()=>{
    
    return (
        
        <>
            <Tabs
        initialRouteName='home'
        screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor:colors.second,
            tabBarLabelStyle: {
                fontSize: fontSize.xs,
                flexDirection: 'row',
                fontWeight: '500',
            },
            headerShown:false,
            
        }}>
            <Tabs.Screen name='home' options={{
                tabBarLabel: 'Início',
                tabBarIcon: ({color}) => <HomeSVG color={color}/>
            }} />
            <Tabs.Screen name='(hymns)'
            options={{
                tabBarLabel: 'Hinos',
                tabBarIcon: ({color}) => <HymnsSVG color={color} />
            }}/>
            <Tabs.Screen name='(categories)'
            options={{
                tabBarLabel: 'Seções',
                tabBarIcon: ({color}) => <CategoriesSVG color={color}/>
            }}/>
            <Tabs.Screen name='(playlists)'
            options={{
                tabBarLabel: 'Playlists',
                tabBarIcon: ({color}) => <PlaylistsSVG color={color}/>
            }}/>
            
            <Tabs.Screen name='(configurations)'
            options={{
                tabBarLabel: 'Ajustes',
                tabBarIcon: ({color}) => <ConfigurationsSVG color={color}/>
            }}/>
        </Tabs>

        <FloatingPlayer style={{
            position:'absolute',
            left: 8,
            right: 8,
            borderRadius:8,
            bottom: 94
        }}/>
        </>
    )
}

export default TabsNavigation