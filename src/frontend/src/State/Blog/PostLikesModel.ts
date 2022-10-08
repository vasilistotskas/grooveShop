import EntityBase from '@/State/Common/EntityBase'

export default class PostLikesModel extends EntityBase {
  email!: string

  public constructor(data?: Partial<PostLikesModel>) {
    super(data)
  }
}