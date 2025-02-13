import { Track } from 'react-native-track-player'

interface HymnsTypes {
  hymn:{
	id:number
	title: string
	ingles?: string
	numero?: number
	numero_view?: string
	texto_biblico?:string
	categoria:{
		id:number
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
		numero:string
		estrofe:string
	}],
  }
  onHymnSelect:(hymn:HymnTrackType)=>void
  style?:any
}

interface HymnsCategoriesTypes{
		id: number,
		categoria: string,
		background: string,
		sub_categorias: [
			{
				title: string,
				hinos: string
			}
		]
	
}

interface HymnTrackType extends Track{
	id?:number,
	numberView?:string,
	titleIngles?:string,
	authors?:[{nome:string}],
	title:string,
	url?:string,
	artwork?:string,
	artist?:string
}

type ListHymnsProps = Partial<FlatListProps<HymnsTypes['hymn']>>&{
    hymns:HymnsTypes['hymn'][]
}



export {HymnsTypes,HymnTrackType, ListHymnsProps,HymnsCategoriesTypes}