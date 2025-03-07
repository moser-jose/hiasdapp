import { SVGIconProps } from '@/types/svgTypes'
import React from 'react'
import Svg, { Path, Mask, Rect } from 'react-native-svg'
import { colors } from '@/constants/styles'
const PauseSVG: React.FC<SVGIconProps> = ({
  color = colors.primary,
  width = 45,
  height = 45,
  backgroundColor = 'white',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={color}>
      <Mask
        id="path-1-outside-1_131_19901"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
        fill="black"
      >
        <Rect fill={backgroundColor} width="24" height="24" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 12C2 6.47979 6.48 2 12 2C17.52 2 22 6.47979 22 12C22 17.5202 17.52 22 12 22C6.48 22 2 17.5202 2 12ZM9 8H10.5V16H9V8ZM15 8H13.5V16H15V8Z"
        />
      </Mask>

      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 12C2 6.47979 6.48 2 12 2C17.52 2 22 6.47979 22 12C22 17.5202 17.52 22 12 22C6.48 22 2 17.5202 2 12ZM9 8H10.5V16H9V8ZM15 8H13.5V16H15V8Z"
        fill={color}
      />
      <Path
        d="M9 8V6H7V8H9ZM10.5 8H12.5V6H10.5V8ZM10.5 16V18H12.5V16H10.5ZM9 16H7V18H9V16ZM13.5 8V6H11.5V8H13.5ZM15 8H17V6H15V8ZM15 16V18H17V16H15ZM13.5 16H11.5V18H13.5V16ZM12 0C5.37546 0 0 5.3752 0 12H4C4 7.58439 7.58454 4 12 4V0ZM0 12C0 18.6248 5.37546 24 12 24V20C7.58454 20 4 16.4156 4 12H0ZM12 24C18.6245 24 24 18.6248 24 12H20C20 16.4156 16.4155 20 12 20V24ZM24 12C24 5.3752 18.6245 0 12 0V4C16.4155 4 20 7.58439 20 12H24ZM9 10H10.5V6H9V10ZM8.5 8V16H12.5V8H8.5ZM10.5 14H9V18H10.5V14ZM11 16V8H7V16H11ZM13.5 10H15V6H13.5V10ZM13 8V16H17V8H13ZM15 14H13.5V18H15V14ZM15.5 16V8H11.5V16H15.5Z"
        fill={backgroundColor}
        mask="url(#path-1-outside-1_131_19901)"
      />
    </Svg>
  )
}

export default PauseSVG
