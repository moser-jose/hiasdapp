import React from 'react'

import { SVGIconProps } from '@/types/svgTypes'
import Svg, { Path } from 'react-native-svg'

const PreviousMusicButtonSVG: React.FC<SVGIconProps> = ({
  color,
  width,
  height,
}) => {
  return (
    <Svg
      width={width ?? '18'}
      height={height ?? '17'}
      viewBox="0 0 18 17"
      fill="none"
    >
      <Path
        d="M6.74175 12.2062C5.25269 11.2446 5.2527 8.75538 6.74176 7.79381L15.7326 1.98789C17.1798 1.05334 18.9583 2.26973 18.9583 4.19407V15.8059C18.9583 17.7303 17.1798 18.9466 15.7326 18.0121L6.74175 12.2062Z"
        fill={color}
      />
      <Path
        d="M1.66663 4.16666C1.66663 3.82148 1.94645 3.54166 2.29163 3.54166C2.6368 3.54166 2.91663 3.82148 2.91663 4.16666V15.8333C2.91663 16.1785 2.6368 16.4583 2.29163 16.4583C1.94645 16.4583 1.66663 16.1785 1.66663 15.8333V4.16666Z"
        fill={color}
      />
    </Svg>
  )
}

export default PreviousMusicButtonSVG
