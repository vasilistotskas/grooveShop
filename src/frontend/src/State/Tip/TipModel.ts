import EntityBase from '@/State/Common/EntityBase'
import { TipKindEnum } from '@/State/Tip/Enum/TipEnum'
import FileFieldModel from '@/State/Common/Models/FileFieldModel'

export default class TipModel extends EntityBase {
  id!: number
  title!: string
  content!: string
  kind!: TipKindEnum
  icon!: FileFieldModel
  url!: string
  createdAt!: string
  active!: boolean
  mainImageAbsoluteUrl!: string
  mainImageFilename!: string

  public constructor(data?: Partial<TipModel>) {
    super(data)
  }
}
