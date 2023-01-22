import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import SliderModel from '@/State/Slider/SliderModel'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Module, Action, Mutation } from 'vuex-module-decorators'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'

@Module({
	dynamic: true,
	namespaced: true,
	store: store,
	stateFactory: true,
	name: 'slider'
})
export default class SliderModule extends AppBaseModule {
	sliders: Array<SliderModel> = []

	get getSlidersData(): SliderModel[] {
		return this.sliders
	}

	@Mutation
	setSliders(sliders: SliderModel[]): void {
		this.sliders = sliders
	}

	@Action
	async fetchSlidersFromRemote(): Promise<void> {
		return await api
			.get('slider/')
			.then((response: AxiosResponse<PaginatedModel<SliderModel>>) => {
				const data = response.data
				this.context.commit('setSliders', data)
			})
			.catch((e: Error) => {
				console.log(e)
			})
	}
}
