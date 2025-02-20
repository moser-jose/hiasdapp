import React from 'react'

import { SVGIconProps } from '@/types/svgTypes'
import Svg, { Path } from 'react-native-svg'

const RepeatSVG: React.FC<SVGIconProps> = ({
  color,
  width = 23,
  height = 21,
}: {
  color: string
  width?: number
  height?: number
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 23 21" fill="none">
      <Path
        d="M14.9999 16.5823C13.4228 16.5823 11.9465 15.9618 10.8511 14.9086"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.15475 6.5847C4.78876 5.28637 2.95637 4.52249 1 4.52249"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.6518 17.6261C22.276 17.2341 22.276 16.3245 21.6518 15.9325L16.5319 12.7165C15.8659 12.2982 15 12.7769 15 13.5633V19.9952C15 20.7817 15.8659 21.2603 16.5319 20.842L21.6518 17.6261Z"
        fill={color}
      />
      <Path
        d="M15 4.52247V4.52247C12.5786 4.52247 10.3954 5.98069 9.46806 8.21749L7.91493 11.9636C6.75571 14.7596 4.02678 16.5824 1 16.5824V16.5824"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.6518 5.56615C21.276 5.17412 21.276 4.26457 20.6518 3.87253L15.5319 0.656591C14.8659 0.238284 14 0.716957 14 1.5034V7.93528C14 8.72172 14.8659 9.2004 15.5319 8.78209L20.6518 5.56615Z"
        fill={color}
      />
    </Svg>
  )
}

export default RepeatSVG
