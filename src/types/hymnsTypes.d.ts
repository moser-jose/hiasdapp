import { Track } from 'react-native-track-player'
import { FlatListProps, StyleProp } from 'react-native'
import { ViewStyle } from 'react-native'

// Basic interfaces
interface Author {
  name?: string
}

interface Verse {
  number?: string
  verse?: string
}

interface Chorus {
  chorusName: string | null
  chorus: string | null
}

interface SubCategory {
  id: number
  title: string | null
  hymns?: string | null
}

// Main Hymn interface
interface Hymn {
  id: number
  title: string
  englishTitle?: string
  number?: number
  numberView?: string
  biblicalText?: string
  category: HymnCategory | null
  chorus?: Chorus[]
  url: string
  artwork: string
  artist: string
  authors: Author[]
  verses: Verse[]
}

// Category interface
interface HymnCategory {
  id: number
  name: string
  subCategories: SubCategory[]
}

// Interface that extends Track from player
interface HymnTrack extends Track {
  id?: number
  number?: number
  numberView?: string
  titleEnglish?: string
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

type ListCategoriesProps = Partial<FlatListProps<HymnCategory>> & {
  categories: HymnCategory[]
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
  category: string
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