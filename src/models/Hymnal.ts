import Realm from 'realm'
export class Author extends Realm.Object<Author> {
  static schema = {
    name: 'Author',
    embedded: true,
    properties: {
      id: 'int',
      name: 'string?',
    },
  }
}

export class Verse extends Realm.Object<Verse> {
  static schema = {
    name: 'Verse',
    embedded: true,
    properties: {
      id: 'int',
      number: 'string?',
      verse: 'string?',
    },
  }
}

export class Chorus extends Realm.Object<Chorus> {
  static schema = {
    name: 'Chorus',
    properties: {
      id: 'int',
      name: 'string?',
      choir: 'string?',
    },
  }
}

export class Lyrics extends Realm.Object<Lyrics> {
  static schema = {
    name: 'Lyrics',
    embedded: true,
    properties: {
      verses: 'Verse[]',
      chorus: 'Chorus[]',
    },
  }
}

export class Hymn extends Realm.Object<Hymn> {
  static schema = {
    name: 'Hymn',
    primaryKey: 'id',
    properties: {
      id: 'int',
      title: 'string',
      englishTitle: 'string?',
      number: 'int',
      numberView: 'string',
      biblicalText: 'string?',
      url: 'string?',
      urlOld: 'string?',
      artwork: 'string?',
      artist: 'string?',
      category: 'CategoryHymn',
      lyrics: 'Lyrics',
      isFavorite: { type: 'bool' as const, default: false },
      authors: 'Author[]',
    },
  }
}
