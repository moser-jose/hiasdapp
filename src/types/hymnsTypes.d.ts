import { Track } from 'react-native-track-player'
import { FlatListProps, StyleProp } from 'react-native'
import { ViewStyle } from 'react-native'

// Interfaces básicas
interface Author {
  nome: string
}

interface Verse {
  numero: string
  estrofe: string
}

interface Chorus {
  nome_coro: string | null
  coro: string | null
}

interface SubCategory {
  title: string | null
  hinos: string | null
}

// Interface principal do Hino
interface Hymn {
  id: number
  title: string
  ingles?: string
  numero?: number
  numero_view?: string
  texto_biblico?: string
  categoria: string
  sub_categoria: string
  coro?: Chorus[]
  url: string
  artwork: string
  artist: string
  autores: Author[]
  estrofes: Verse[]
}

// Interface para categorias
interface HymnCategory {
  id: number
  categoria: string
  background: string
  sub_categorias: SubCategory[]
}

// Interface que estende Track do player
interface HymnTrack extends Track {
  id?: number
  numberView?: string
  titleIngles?: string
  authors?: Author[]
  title: string
  url: string
  artwork: string
  artist: string
}

// Props interfaces
interface HymnsProps {
  hymn: Hymn
  onHymnSelect: (hymn: HymnTrack) => void
  style?: StyleProp<ViewStyle>
}

// List Props Types
type ListHymnsProps = Partial<FlatListProps<Hymn>> & {
  hymns: Hymn[]
}

type ListCategoriesProps = Partial<FlatListProps<Category>> & {
  categories: Category[]
}

type ListPlaylistsProps = Partial<FlatListProps<unknown>> & {
  hymns: Hymn[]
  data: Playlist[]
}

// List Types
type ListHymns = Hymn[]

type ListCategories = Partial<HymnCategory[]> & {
  category: HymnCategory[]
}

interface Category {
  categoria: string
  // add other category properties as needed
}

interface Playlist {
  title: string
  hymns: number
}

export {
  Hymn,
  HymnCategory,
  HymnTrack,
  HymnsProps,
  ListPlaylistsProps,
  ListCategories,
  ListHymns,
  ListHymnsProps,
  ListCategoriesProps,
  Author,
  Verse,
  Category,
  Chorus,
  SubCategory
}