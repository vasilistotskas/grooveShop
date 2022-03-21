import api from '@/api/api.service'
import PayWayModel from '@/state/payway/PayWayModel'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class PayWayModule extends AppBaseModule {
	active_pay_ways: Array<PayWayModel> = []

	get getActivePayWays(): PayWayModel[] {
		return this.active_pay_ways
	}

	@Mutation
	setActivePayWays(active_pay_ways: Array<PayWayModel>): void {
		this.active_pay_ways = active_pay_ways
	}

	@Action
	async fetchActivePayWaysFromRemote(): Promise<void> {
		return await api.get('payways/')
			.then((response: any) => {
				const data: PayWayModel = response.data
				this.context.commit('setActivePayWays', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}
}
