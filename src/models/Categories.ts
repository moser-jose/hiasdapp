import Realm from 'realm'

export class SubCategory extends Realm.Object<SubCategory> {
  static schema = {
    name: 'SubCategory',
    properties: {
      id: 'int',
      name: 'string',
      hymns: 'string',
    },
  }
}

export class Category extends Realm.Object<Category> {
  static schema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      subCategory: { type: 'list', objectType: 'SubCategory' },
    },
  }
}
