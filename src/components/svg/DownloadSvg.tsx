import React from 'react'

import { SVGIconProps } from '@/types/svgTypes'
import Svg, { Path } from 'react-native-svg'

const DownloadSVG: React.FC<SVGIconProps> = ({
  color,
  width = 8,
  height = 10,
}: {
  color: string
  width?: number
  height?: number
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 8 10" fill="none">
      <Path
        d="M4 1L4 6.25M4 6.25L6.25 4M4 6.25L1.75 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 8.5H4H1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default DownloadSVG
