import CategoriesSVG from "@/components/svg/categoriesSvg"
import ConfigurationsSVG from "@/components/svg/configurationsSvg"
import HymnsSVG from "@/components/svg/hymnsSvg"
import HomeSVG from "@/components/svg/homeSvg"
import { colors, fontSize } from "@/constants/styles"
import { Tabs } from "expo-router"
import PlaylistsSVG from "@/components/svg/playListsSVG"

const TabsNavigation = ()=>{
    return (
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor:colors.second,
            tabBarLabelStyle: {
                fontSize: fontSize.xs,
                flexDirection: "row",
                fontWeight: '500',
            },
            headerShown:false,
            /* tabBarStyle: {
                position: 'absolute',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderTopWidth: 0,
                paddingTop: 8,
            }, */
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
                tabBarLabel: 'Categorias',
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
    )
}

export default TabsNavigation