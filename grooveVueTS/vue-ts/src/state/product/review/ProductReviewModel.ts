import EntityBase from "@/state/common/EntityBase"

export default class ProductReviewModel extends EntityBase
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

    constructor(data?: Partial<ProductReviewModel>) {
        super(data)
    }
}
