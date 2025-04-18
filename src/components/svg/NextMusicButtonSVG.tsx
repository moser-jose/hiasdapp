import React from 'react'

import { SVGIconProps } from '@/types/svgTypes'
import Svg, { Path } from 'react-native-svg'

const NextMusicButtonSVG: React.FC<SVGIconProps> = ({
  color,
  width = 24,
  height = 24,
}: {
  color: string
  width?: number
  height?: number
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.6598 14.6474C18.4467 13.4935 18.4467 10.5065 16.6598 9.35258L5.87083 2.38548C4.13419 1.26402 2 2.72368 2 5.0329V18.9671C2 21.2763 4.13419 22.736 5.87083 21.6145L16.6598 14.6474Z"
        fill={color}
      />
      <Path
        d="M22.75 5C22.75 4.58579 22.4142 4.25 22 4.25C21.5858 4.25 21.25 4.58579 21.25 5V19C21.25 19.4142 21.5858 19.75 22 19.75C22.4142 19.75 22.75 19.4142 22.75 19V5Z"
        fill={color}
      />
    </Svg>
  )
}

export default NextMusicButtonSVG
