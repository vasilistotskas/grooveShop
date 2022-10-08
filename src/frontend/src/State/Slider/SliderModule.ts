import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import SliderModel from '@/State/Slider/SliderModel'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Module, Action, Mutation } from 'vuex-module-decorators'

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'slider',
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
  fetchSlidersFromRemote(): Promise<void> {
    return api
      .get('sliders/all/')
      .then((response: AxiosResponse<SliderModel>) => {
        const data = response.data
        const slider = new SliderModel(data)
        this.context.commit('setSliders', slider)
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }
}