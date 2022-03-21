import api from '@/api/api.service'

import ProductModel from '@/state/product/ProductModel'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class UserOrderModule extends AppBaseModule {
	orders = [new ProductModel()]

	get getUserOrders(): ProductModel[] {
		return this.orders
	}

	@Mutation
	setUserOrders(orders: Array<any>): void {
		this.orders = orders
	}

	@Mutation
	unsetUserOrders() {
		this.orders = []
	}

	@Action
	fetchUserOrdersFromRemote(): Promise<void> {
		return api.get('orders/')
			.then((response: any) => {
				const data = response.data
				this.context.commit('setUserOrders', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

}
