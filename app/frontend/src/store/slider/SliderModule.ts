import api from '@/api/api.service'
import SliderModel from '@/store/slider/SliderModel'

import AppBaseModule from '@/store/common/AppBaseModule'
import { Module, Action, Mutation } from 'vuex-module-decorators'

@Module({
	name: 'Module/SliderModule',
	namespaced: true,
	stateFactory: true
})
export default class SliderModule
	extends AppBaseModule {
	sliders = [new SliderModel()]

	get getSlidersData(): SliderModel[] {
		return this.sliders
	}

	@Mutation
	setSliders(sliders: SliderModel[]): void {
		this.sliders = sliders
	}

	@Action
	async slidersFromRemote(): Promise<void> {
		await api.get('sliders/all/')
			.then((response: any) => {
				const data = response.data
				let slider = new SliderModel(data)
				this.context.commit('setSliders', slider)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}

}
