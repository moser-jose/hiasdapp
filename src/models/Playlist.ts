import Realm from 'realm'

export class Playlist extends Realm.Object<Playlist> {
  static schema = {
    name: 'Playlist',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      description: 'string?',
      hymns: 'int[]',
    },
  }
}
