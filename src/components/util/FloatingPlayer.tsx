import { colors } from "@/constants/styles"
import { defaultStyles} from "@/styles"
import { ViewProps,TouchableOpacity, View,StyleSheet, Text } from "react-native"
import { useActiveTrack } from "react-native-track-player"
import {PlayPauseButton, SkipToNextButton} from '@/components/util/PlayerControls'
import Authors from "./Authors"
import { useLastActiveHymn } from "@/hooks/useLastActiveHymn"
import { MovingText } from "./MovingText"

const FloatingPlayer = ({style}:ViewProps)=>{
    const activeHymn=useActiveTrack()
    const lastActiveHymn=useLastActiveHymn()

    const displayedHymn = activeHymn ?? lastActiveHymn 
    if(!displayedHymn) return null

    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.container, style]}>
            
            {/* <FastImage
					source={{
						uri: logoApp,
					}}
					style={styles.trackArtworkImage}
				/> */}
                <View>
                <Text style={styles.hymnTitle}>{displayedHymn.numberView}</Text>
            </View>
            <View style={styles.hymnTitleContainer}>
                <MovingText style={styles.hymnTitle} text={displayedHymn.title} animationThreshold={25}/>
                <Text style={styles.hymnTitleBase}>{displayedHymn.titleIngles}</Text>
                <Authors authors={displayedHymn.authors} card={false}/>
            </View>
            <View style={styles.hymnControlsContainer}>
                <PlayPauseButton/>
                <SkipToNextButton/>
            </View>
        </TouchableOpacity>
    )
    
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        backgroundColor: colors.primary,
        alignItems: 'center',
        paddingLeft:16,
        paddingVertical:14
    },
    trackArtworkImage:{
        width:40,
        height:40,
        borderRadius:8,
        backgroundColor:colors.favorites
    },
    hymnTitle:{
        ...defaultStyles.text,
        fontSize:18,
        fontWeight:'600',
        color:'#FFFFFF',
    },
    hymnTitleBase:{
        color:colors.textMuted,
        fontSize:12,
        flex:1,
        width:'100%',
    },
    hymnTitleContainer:{
        flex:1,
        overflow: 'hidden',
        marginLeft:10
    },
    hymnControlsContainer:{
        flexDirection:'row',
        alignItems: 'center',
        columnGap:20,
        marginRight:16,
        marginLeft:16,
    }

})

export default FloatingPlayer