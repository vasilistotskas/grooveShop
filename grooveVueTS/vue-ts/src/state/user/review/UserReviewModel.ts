import EntityBase from "@/state/common/EntityBase"

export default class UserReviewModel extends EntityBase
{
    id!: number
    productId!: number
    userId!: number
    subject!: string
    comment!: string
    rate!: number
    status!: string
    createdAt!: string
    updatedAt!: string

    constructor(data?: Partial<UserReviewModel>) {
        super(data)
    }
}
