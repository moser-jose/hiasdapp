import { Author, Chorus, Verse, Hymn, Category } from '@/types/hymnsTypes'
import HiasdAntigo from '../../src/api/hiasd-old.json'

const DEFAULT_ARTWORK =
  'https://github.com/moser-jose/Hina7/releases/download/vHinos/capa.png'

function isAuthor(author: Author) {
  return author && typeof author.name === 'string'
}

function isVerse(verse: Verse) {
  return (
    verse && typeof verse.number === 'string' && typeof verse.verse === 'string'
  )
}

function isChorus(chorus: Chorus) {
  return (
    chorus &&
    (chorus.name === null || typeof chorus.name === 'string') &&
    (chorus.choir === null || typeof chorus.choir === 'string')
  )
}

function transformToHymn(rawHymn: Hymn): Hymn {
  if (!Array.isArray(rawHymn.authors) || !rawHymn.authors.every(isAuthor)) {
    //throw new Error('Invalid authors array');
  }

  return {
    id: rawHymn.id,
    title: rawHymn.title,
    englishTitle: rawHymn.englishTitle || undefined,
    number: rawHymn.number || 1,
    numberView: rawHymn.numberView || null,
    biblicalText: rawHymn.biblicalText || undefined,
    category: rawHymn.category,
    lyrics: rawHymn.lyrics,
    url: rawHymn.url,
    artwork: rawHymn.artwork || DEFAULT_ARTWORK,
    artist: rawHymn.artist || '',
    authors: rawHymn.authors || [],
  }
}

function transformCategory(category: Category): Category {
  return {
    id: category.id,
    name: category.name,
    subCategories: category.subCategories,
  }
}

// Transform hymns to match the Hymn type
export const hymnsWithArtwork: Hymn[] = HiasdAntigo.hymns.map(hymn =>
  transformToHymn(hymn as Hymn)
)
export const categoriesTest: Category[] =
  HiasdAntigo.categories.map(transformCategory)
