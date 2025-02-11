import { TouchableOpacity, View, ViewStyle } from "react-native"
import TrackPlayer, { isPlaying, useIsPlaying } from "react-native-track-player"
import PlayButtonSVG from "../svg/PlayButtonSvg"
import PauseButtonSVG from "../svg/PauseButtonSvg"
import { colors } from "@/constants/styles"
import NextMusicButtonSVG from "../svg/NextMusicButtonSVG"
import PreviousMusicButtonSVG from "../svg/PreviousMusicButtonSVG"
type PlayerControlsProps={
    style?:ViewStyle
}

type PlayerButtonProps={
    style?:ViewStyle,
    iconSize?:number
}

const PlayPauseButton = ({style,iconSize}:PlayerButtonProps)=>{
    const {playing}=useIsPlaying()

    return <View style={[{height:iconSize}, style]}>
            <TouchableOpacity 
            activeOpacity={0.85}
            onPress={playing ? TrackPlayer.pause: TrackPlayer.play}>
                {
                    playing ? <PauseButtonSVG width={30} height={30} color={colors.favorites}/> : <PlayButtonSVG  width={32} height={32} color={colors.favorites}/>
                }
            </TouchableOpacity>
    </View>
}

const SkipToNextButton=({iconSize=30}:PlayerButtonProps)=>{
    return <TouchableOpacity activeOpacity={0.7} onPress={()=>TrackPlayer.skipToNext()}>
        <NextMusicButtonSVG color={colors.favorites}/>
    </TouchableOpacity>
}

const SkipToPreviousButton=({iconSize=30}:PlayerButtonProps)=>{
    return <TouchableOpacity activeOpacity={0.7} onPress={()=>TrackPlayer.skipToPrevious()}>
        <PreviousMusicButtonSVG color={colors.favorites}/>
    </TouchableOpacity>
}

export {PlayPauseButton,SkipToNextButton,SkipToPreviousButton}