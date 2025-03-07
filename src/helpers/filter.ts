import { Hymn } from '@/types/hymnsTypes'
import { Track } from 'react-native-track-player'

export const ListHymnsFilter = (query: string) => (hymn: Hymn | Track) =>
  hymn.title?.toLowerCase().includes(query.toLowerCase()) ||
  hymn.number.toString().includes(query)
//hymn.estrofes?.some((item:{estrofe:string}) => item.estrofe.toLowerCase().match(query.toLowerCase()));
