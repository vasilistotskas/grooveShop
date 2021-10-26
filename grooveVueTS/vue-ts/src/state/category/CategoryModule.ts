import { Action, Module, Mutation } from 'vuex-module-decorators'
import AppBaseModule from '@/state/common/AppBaseModule'
import api from "@/api/api.service";
import ResponseData from "@/state/types/ResponseData";
import Category from "@/state/category/Category";
import {map} from "lodash";
import Product from "@/state/product/Product";

@Module({ namespaced: true })
export default class CategoryModule
    extends AppBaseModule
{
    categories = new Category(
        0, '', '', '', '', 0, [], '', '',
    )

    get getCategories(): Category {
        return this.categories
    }

    @Mutation
    setCategories(categories: Category): void {
        this.categories = categories
    }

    @Action
    async categoriesFromRemote(): Promise<void> {
        await api.get('products/categories/')
            .then((response: ResponseData) => {
                const data = response.data
                const categories = map(
                    data,
                    category => new Category(
                        category.id,
                        category.description,
                        category.get_absolute_url,
                        category.image_url,
                        category.name,
                        category.parent,
                        category.products,
                        category.slug,
                        category.tags
                    )
                )
                this.context.commit('setCategories', categories)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }


}