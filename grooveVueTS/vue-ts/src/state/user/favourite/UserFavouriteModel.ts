import EntityBase from "@/state/common/EntityBase";

export default class UserFavouriteModel extends EntityBase
{
    id!: number
    user_id!: number
    product_id!: number

    public constructor(data?: Partial<UserFavouriteModel>) {
        super(data)
    }
}
