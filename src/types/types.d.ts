import { Track } from 'react-native-track-player'
import { Hymn, ListHymnsProps } from './hymnsTypes'

export type PlayList = {
  name: string
  hymns: Tracks[] | Hymn[]
  artworkPreview: string
}

export type Artist = {
  name: string
  hymns: Tracks[] | Hymn[]
}

export type HymnWithPlayList = (ListHymnsProps | Track) & {
  playlist?: string[]
}
