import React from 'react'

import { SVGIconProps } from '@/types/svgTypes'
import Svg, { Path } from 'react-native-svg'

const NextMusicButtonSVG: React.FC<SVGIconProps> = ({ color, width, height }) => {
  return (
    <Svg width={width ?? '18'} height={height ?? '17'} viewBox="0 0 18 17" fill="none">
      <Path
        d="M12.2165 10.5395C13.7056 9.57794 13.7056 7.08873 12.2165 6.12715L3.22569 0.32123C1.77849 -0.613314 0 0.603069 0 2.52741V14.1393C0 16.0636 1.77849 17.28 3.2257 16.3454L12.2165 10.5395Z"
        fill={color}
      />
      <Path
        d="M17.2917 2.5C17.2917 2.15482 17.0118 1.875 16.6667 1.875C16.3215 1.875 16.0417 2.15482 16.0417 2.5V14.1667C16.0417 14.5118 16.3215 14.7917 16.6667 14.7917C17.0118 14.7917 17.2917 14.5118 17.2917 14.1667V2.5Z"
        fill={color}
      />
    </Svg>
  )
}

export default NextMusicButtonSVG
