import React from 'react'

import { SVGIconProps } from '@/types/svgTypes'
import Svg, { Path } from 'react-native-svg'

const ShuffleSVG: React.FC<SVGIconProps> = ({
  color,
  width = 22,
  height = 22,
}: {
  color: string
  width?: number
  height?: number
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
      <Path
        d="M20.5493 5.06365C21.1734 4.67161 21.1734 3.76206 20.5493 3.37003L15.4294 0.154088C14.7634 -0.264219 13.8975 0.214454 13.8975 1.0009V7.43278C13.8975 8.21922 14.7634 8.6979 15.4294 8.27959L20.5493 5.06365Z"
        fill={color}
      />
      <Path
        d="M1.3589 18.1286C0.734768 17.7365 0.734767 16.827 1.3589 16.4349L6.47884 13.219C7.14481 12.8007 8.01074 13.2794 8.01074 14.0658V20.4977C8.01074 21.2841 7.14481 21.7628 6.47884 21.3445L1.3589 18.1286Z"
        fill={color}
      />
      <Path
        d="M2.89746 10.05V10.05C2.89746 6.73624 5.58375 4.01999 8.89746 4.01999V4.01999H13.8975"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.8975 11.0549V11.0549C17.8975 14.3686 15.2112 17.0849 11.8975 17.0849V17.0849H6.89746"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default ShuffleSVG
