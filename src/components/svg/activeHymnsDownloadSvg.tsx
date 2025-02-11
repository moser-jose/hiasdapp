import React from 'react';

import { SVGIconProps } from '@/types/svgTypes';
import Svg, { Path } from 'react-native-svg';

const  ActiveHymnsDownloadSVG:React.FC<SVGIconProps> = ({color,width,height})=>{
  return (
    <Svg width={width ?? "15"} height={height ?? "19"} viewBox='0 0 12 8' fill="none">
      <Path d="M2.99963 0.999932V5.27464C2.52957 5.00466 1.9495 4.89966 1.33442 5.11465C0.664335 5.35463 0.149271 5.94959 0.0292561 6.64954C-0.200773 8.01945 0.959372 9.18937 2.32454 8.97439C3.30466 8.8194 3.99975 7.91946 3.99975 6.92453V1.99986H4.99988C5.54994 1.99986 6 1.54989 6 0.999932C6 0.449969 5.54994 0 4.99988 0H3.99975C3.44968 0 2.99963 0.449969 2.99963 0.999932Z" fill={color}/>
    </Svg>
  );
}

export default  ActiveHymnsDownloadSVG