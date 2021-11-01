import EntityBase from "@/state/common/EntityBase";

export default class UserDetailsModel extends EntityBase
{
    id!: number
    user!: number
    address!: string
    city!: string
    country!: string
    email!: string
    first_name!: string
    last_name!: string
    image!: string
    image_url!: string
    phone!: number
    place!: string
    region!: string
    zipcode!: number

    constructor(data?: Partial<UserDetailsModel>) {
        super(data)
    }
}
