import EntityBase from '@/state/common/EntityBase'
import { TipKindEnum } from '@/state/tip/Enum/TipEnum'

export default class TipModel extends EntityBase {
  id!: number
  title!: string
  content!: string
  kind!: TipKindEnum
  icon!: string
  url!: string
  createdAt!: string
  active!: boolean
  mainImageAbsoluteUrl!: string
  mainImageFilename!: string

  public constructor(data?: Partial<TipModel>) {
    super(data)
  }
}
