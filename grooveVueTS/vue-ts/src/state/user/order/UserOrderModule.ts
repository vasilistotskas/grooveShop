import { Action, Module, Mutation } from 'vuex-module-decorators'
import api from "@/api/api.service";
import ResponseData from "@/state/types/ResponseData";
import AppBaseModule from "@/state/common/AppBaseModule";
import ProductModel from "@/state/product/ProductModel";

@Module({ namespaced: true })
export default class UserOrderModule
    extends AppBaseModule
{
    orders = [new ProductModel()]

    get getUserOrders(): ProductModel[] { return this.orders }

    @Mutation
    setUserOrders(orders: Array<any>): void { this.orders = orders }

    @Mutation
    unsetUserOrders() {
        this.orders = []
    }

    @Action
    async userOrdersFromRemote(): Promise<void> {
        await api.get('orders/')
            .then((response: ResponseData) => {
                const data = response.data
                this.context.commit('setUserOrders', data)
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

}
