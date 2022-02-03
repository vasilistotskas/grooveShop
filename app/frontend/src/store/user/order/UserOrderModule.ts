import api from '@/api/api.service'

import ProductModel from '@/store/product/ProductModel'
import AppBaseModule from '@/store/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({
	name: 'Module/UserOrderModule',
	namespaced: true,
	stateFactory: true
})
export default class UserOrderModule
	extends AppBaseModule {
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
	async userOrdersFromRemote(): Promise<void> {
		await api.get('orders/')
			.then((response: any) => {
				const data = response.data
				this.context.commit('setUserOrders', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

}
