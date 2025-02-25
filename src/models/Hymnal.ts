import Realm from 'realm'
// Schema for Authors
export class Author extends Realm.Object<Author> {
  static schema = {
    name: 'Author',
    properties: {
      id: 'int',
      name: 'string?',
    },
  }
}

// Schema for SubCategory
export class SubCategory extends Realm.Object<SubCategory> {
  id!: number
  name!: string
  static schema = {
    name: 'SubCategory',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
    },
  }
}

// Schema for Category
export class Category extends Realm.Object<Category> {
  id!: number
  name!: string
  subCategory!: SubCategory
  static schema = {
    name: 'Category',
    primaryKey: 'id',
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
      number: 'string?',
      verse: 'string?',
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

// Main Hymn Schema
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
      category: 'Category',
      lyrics: 'Lyrics',
      authors: { type: 'list', objectType: 'Author' },
    },
  }
}
