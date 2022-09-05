import EntityBase from '@/state/common/EntityBase'

export default class FileFieldModel extends EntityBase {
  name!: string
  path!: string
  size!: string
  url!: string

  public constructor(data?: Partial<FileFieldModel>) {
    super(data)
  }
}
