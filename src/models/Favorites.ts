import Realm from 'realm'

export class Category extends Realm.Object<Category> {
  static schema = {
    name: 'Category',
    properties: {
      id: 'int',
      name: 'string',
      subCategory: 'SubCategory',
    },
  }
}

// Schema for Verse
export class Verse extends Realm.Object<Verse> {
  static schema = {
    name: 'Verse',
    properties: {
      id: 'int',
      number: 'string',
      verse: 'string',
    },
  }
}

// Schema for Chorus
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

// Schema for Lyrics
export class Lyrics extends Realm.Object<Lyrics> {
  static schema = {
    name: 'Lyrics',
    properties: {
      verses: { type: 'list', objectType: 'Verse' },
      chorus: { type: 'list', objectType: 'Chorus' },
    },
  }
}

export class Favorites extends Realm.Object<Favorites> {
  static schema = {
    name: 'Favorites',
    primaryKey: 'id',
    properties: {
      id: 'int',
      hymn: { type: 'list', objectType: 'Hymn' },
    },
  }
}
