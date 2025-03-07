import { Track } from 'react-native-track-player'
import { FlatListProps, StyleProp } from 'react-native'
import { ViewStyle } from 'react-native'

// Basic interfaces
interface Author {
  id: number
  name: string | null
}

interface Verse {
  id: number
  number: string | null
  verse: string | null
}

interface Chorus {
  id: number
  name?: string | null
  choir?: string | null
}

interface SubCategory {
  id: number
  name: string | null
  hymns?: string | null
}

interface Lyrics {
  verses: Verse[] | []
  chorus: Chorus[] | []
}

// Main Hymn interface
interface Hymn {
  id: number
  title: string
  englishTitle?: string | null
  number: number
  numberView: string | null
  biblicalText?: string | null
  category: HymnCategory | null
  url: string
  urlOld?: string | null
  artwork: string
  artist: string
  lyrics: Lyrics | null
  authors: Author[] | []
  isFavorite?: boolean
}

// Category interface
interface Category {
  id: number
  name: string
  subCategories: SubCategory[]
}

interface HymnCategory {
  id: number
  name: string
  subCategory: {
    id: number
    name: string
  }
}

// Interface that extends Track from player
interface HymnTrack extends Track {
  id?: number
  number?: number
  numberView?: string | null
  titleEnglish?: string | null
  authors?: Author[] | null
  title: string
  url: string
  artwork: string
  artist: string
  isFavorite?: boolean
}

// Props interfaces
interface HymnsProps {
  hymn: Hymn
  onHymnSelect: (hymn: HymnTrack) => void
  style?: StyleProp<ViewStyle>
  id?: number
}

// List Props Types
type ListHymnsProps = Partial<FlatListProps<Hymn>> & {
  hymns: Hymn[]
  /* loading: boolean
  listEnded: boolean
  onEndReached: () => void
  onEndReachedThreshold: number */
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

type ListCategories = Partial<Category[]> & {
  category: Category[]
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
  Lyrics,
  Chorus,
  SubCategory,
}
