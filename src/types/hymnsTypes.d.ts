import { Track } from 'react-native-track-player'
interface HymnsTypes {
  hymn:{
	id:number
	title: string
	ingles?: string
	numero?: number
	numero_view?: string
	texto_biblico?:string
	categoria: string,
	sub_categoria: string,
	/* categoria:{
		id:number
		idsubcategoria:number
	}, */
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
  onHymnSelect:(hymn:HymnTrackType<Track>)=>void
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

type ListHymnsProps = Partial<FlatListProps<HymnsTypes['hymn'][]>>&{
    hymns:HymnsTypes['hymn'][]
}

type ListHymns = Partial<HymnsTypes['hymn'][]>&{
    hymns:HymnsTypes['hymn'][]
}

type ListCategoriesProps = Partial<FlatListProps<HymnsCategoriesTypes>> &  {
    category:HymnsCategoriesTypes
}

type ListCategories = Partial<HymnsCategoriesTypes[]>&{
    category:HymnsCategoriesTypes[]
}


export {ListCategories,ListHymns,HymnsTypes,HymnTrackType, ListHymnsProps,HymnsCategoriesTypes,ListCategoriesProps}