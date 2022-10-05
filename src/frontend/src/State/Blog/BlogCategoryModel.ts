import EntityBase from '@/State/Common/EntityBase'

export default class BlogCategoryModel extends EntityBase {
  id!: number
  name!: string
  slug!: string
  description!: string

  public constructor(data?: Partial<BlogCategoryModel>) {
    super(data)
  }
}
