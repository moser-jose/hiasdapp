import { SVGIconProps } from '@/types/svgTypes'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

const PauseButtonSvg: React.FC<SVGIconProps> = ({ color, width, height }) => {
  return (
    <Svg
      width={width ?? '26'}
      height={height ?? '26'}
      viewBox="0 0 26 26"
      fill={color}
    >
      <Path
        d="M13 0C5.82098 0 0 5.82098 0 13C0 20.179 5.82098 26 13 26C20.179 26 26 20.179 26 13C26 5.82098 20.179 0 13 0ZM10.6786 17.4107C10.6786 17.5384 10.5741 17.6429 10.4464 17.6429H9.05357C8.92589 17.6429 8.82143 17.5384 8.82143 17.4107V8.58929C8.82143 8.46161 8.92589 8.35714 9.05357 8.35714H10.4464C10.5741 8.35714 10.6786 8.46161 10.6786 8.58929V17.4107ZM17.1786 17.4107C17.1786 17.5384 17.0741 17.6429 16.9464 17.6429H15.5536C15.4259 17.6429 15.3214 17.5384 15.3214 17.4107V8.58929C15.3214 8.46161 15.4259 8.35714 15.5536 8.35714H16.9464C17.0741 8.35714 17.1786 8.46161 17.1786 8.58929V17.4107Z"
        fill={color}
      />
    </Svg>
  )
}

export default PauseButtonSvg
