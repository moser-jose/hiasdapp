import { Author, Chorus, Verse, Hymn } from "@/types/hymnsTypes";
import HiasdAntigo from "../../../../api/hiasd-old.json";

const DEFAULT_ARTWORK = "https://github.com/moser-jose/Hina7/releases/download/vHinos/capa.png";

function isAuthor(author: any): author is Author {
  return author && typeof author.name === 'string';
}

function isVerse(verse: any): verse is Verse {
  return verse && typeof verse.number === 'string' && typeof verse.verse === 'string';
}

function isChorus(chorus: any): chorus is Chorus {
  return chorus && (chorus.chorusName === null || typeof chorus.chorusName === 'string') &&
         (chorus.chorus === null || typeof chorus.chorus === 'string');
}

function transformToHymn(rawHymn: any): Hymn {
  if (!Array.isArray(rawHymn.authors) || !rawHymn.authors.every(isAuthor)) {
    //throw new Error('Invalid authors array');
  }
  if (!Array.isArray(rawHymn.verses) || !rawHymn.verses.every(isVerse)) {
    //console.log(rawHymn.verses)
    //throw new Error('Invalid verses array');
  }
  if (rawHymn.chorus && (!Array.isArray(rawHymn.chorus) || !rawHymn.chorus.every(isChorus))) {
    //throw new Error('Invalid chorus array');
  }

  return {
    id: rawHymn.id,
    title: rawHymn.title,
    englishTitle: rawHymn.englishTitle || undefined,
    number: rawHymn.number || undefined,
    numberView: rawHymn.numberView || undefined,
    biblicalText: rawHymn.biblicalText || undefined,
    category: rawHymn.category,
    chorus: rawHymn.chorus || [],
    url: rawHymn.url,
    artwork: rawHymn.artwork || DEFAULT_ARTWORK,
    artist: rawHymn.artist || undefined,
    authors: rawHymn.authors || undefined,
    verses: rawHymn.verses|| undefined
  };
}

// Transform hymns to match the Hymn type
export const hymnsWithArtwork: Hymn[] = HiasdAntigo.hymns.map(transformToHymn);