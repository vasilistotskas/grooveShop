import EntityBase from "@/state/common/EntityBase"
import UserDetailsModel from "@/state/user/data/UserDetailsModel"

export default class ProductReviewModel extends EntityBase
{
    id!: number
    product_id!: number
    user_id!: number
    comment!: string
    rate!: number
    status!: string
    created_at!: string
    updated_at!: string
    userprofile!: UserDetailsModel

    constructor(data?: Partial<ProductReviewModel>) {
        super(data)
    }
}
