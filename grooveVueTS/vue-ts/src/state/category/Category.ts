export default class Category
{
    id: number
    description: string
    get_absolute_url: string
    image_url: string
    name: string
    parent: number
    products: Array<any>
    slug: string
    tags: string

    constructor(
        id : number,
        description : string,
        get_absolute_url : string,
        image_url : string,
        name : string,
        parent : number,
        products: Array<any>,
        slug : string,
        tags : string

    ) {
        this.id = id
        this.description = description
        this.get_absolute_url = get_absolute_url
        this.image_url = image_url
        this.name = name
        this.parent = parent
        this.products = products
        this.slug = slug
        this.tags = tags
    }
}
