import EntityBase from "@/state/common/EntityBase"

export default class ProductReviewModel extends EntityBase
{
    count!: number
    link: object = {
        next: '',
        previous: ''
    }
    results!: []
    total_pages!: number

    constructor(data?: Partial<ProductReviewModel>) {
        super(data)
    }
}
