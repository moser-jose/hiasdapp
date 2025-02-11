import { SvgProps } from 'react-native-svg';
import { Track } from 'react-native-track-player';

interface HymnsTypes {
  hymn:{
	title: string;
	ingles?: string;
	numero?: number;
	numero_view?: string;
	texto_biblico?:string
	categoria:{
		id:number;
		idsubcategoria:number
	},
	coro?:[
		{
			nome_coro: string,
			coro: string
		}
	],
	url: string,
	artwork:string,
	artist: string,
	autores:[{
		nome:string
	}],
	estrofes:[{
		numero:string;
		estrofe:string;
	}],
  }
  onHymnSelect:(hymn:Track)=>void
}

interface HymnTrackType extends Track{
	id?:number,
	numberView?:string,
	titleIngles?:string,
	authors?:[{nome:string}],
	title:string,
	url:string,
	artwork:string,
	artist:string
}


export {HymnsTypes,HymnTrackType}