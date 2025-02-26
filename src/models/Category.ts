import Realm from 'realm'

export class SubCategory extends Realm.Object<SubCategory> {
  id!: number
  name!: string
  static schema = {
    name: 'SubCategory',
    embedded: true,
    properties: {
      id: 'int',
      name: 'string',
    },
  }
}

export class CategoryHymn extends Realm.Object<CategoryHymn> {
  id!: number
  name!: string
  subCategory?: SubCategory
  static schema = {
    name: 'CategoryHymn',
    embedded: true,
    properties: {
      id: 'int',
      name: 'string',
      subCategory: 'SubCategory',
    },
  }
}

export class Category extends Realm.Object<Category> {
  id!: number
  name!: string
  subCategories?: SubCategory[]
  static schema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      subCategories: 'SubCategory[]',
    },
  }
}
