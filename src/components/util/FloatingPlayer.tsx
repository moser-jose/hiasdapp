import { colors } from "@/constants/styles"
import { defaultStyles, hymnsItem } from "@/styles"
import { ViewProps,TouchableOpacity, View,StyleSheet, Text } from "react-native"
import { Track, useActiveTrack } from "react-native-track-player"
import {PlayPauseButton, SkipToNextButton} from '@/components/util/PlayerControls'
import FastImage from "react-native-fast-image"
import { logoApp } from "@/constants/images"
import { shortName } from "@mosmmy/shortname-js"

const FloatingPlayer = ({style}:ViewProps)=>{

    const activeHymn=useActiveTrack()
    console.log(activeHymn, "ol")
    const displayedHymn:Track = activeHymn ?? {
        title: "This is a just a song",
    } 
    console.log(displayedHymn)
    if(!displayedHymn) return null

    

    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.container, style]}>
            
            <FastImage
					source={{
						uri: /* displayedTrack.artwork ?? */ logoApp,
					}}
					style={styles.trackArtworkImage}
				/>
            <View style={styles.hymnTitleContainer}>
                <Text style={styles.hymnTitle}>{displayedHymn.title}</Text>
                <Text style={styles.hymnTitleBase}>{displayedHymn.titleIngles}</Text>
                <View style={{flexDirection:'row',gap:5}}>
                {
                        displayedHymn.authors?.map((item, index) => {
                            const isLastItem = index === displayedHymn.authors.length - 1; 
                            const nome =item.nome ? shortName(item.nome) : 'Desconhecido'
                            const separator = !isLastItem ? ', ' : '';
                            return  (
                                <Text key={index} style={styles.hymnTitleBase}>
                                    { nome+''+separator}
                                </Text>
                                )
                            })
                    }
                    </View>
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