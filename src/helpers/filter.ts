import { Hymn } from '@/types/hymnsTypes'

export const ListHymnsFilter = (query: string) => (hymn: Hymn) =>
  hymn.title?.toLowerCase().includes(query.toLowerCase()) ||
  hymn.number.toString().includes(query)
//hymn.estrofes?.some((item:{estrofe:string}) => item.estrofe.toLowerCase().match(query.toLowerCase()));
