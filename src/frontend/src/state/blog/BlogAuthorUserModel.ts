import EntityBase from '@/state/common/EntityBase'

export default class BlogAuthorUserModel extends EntityBase {
  id!: number
  email!: string
  firstName!: string
  lastName!: string

  public constructor(data?: Partial<BlogAuthorUserModel>) {
    super(data)
  }
}
