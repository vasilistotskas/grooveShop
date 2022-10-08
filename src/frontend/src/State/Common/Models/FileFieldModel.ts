import EntityBase from '@/State/Common/EntityBase'

export default class FileFieldModel extends EntityBase {
  name!: string
  path!: string
  size!: string
  url!: string

  public constructor(data?: Partial<FileFieldModel>) {
    super(data)
  }
}
