import store from '@/DynamicStore'
import api from '@/Api/ApiService'
import { AxiosResponse } from 'axios'
import PayWayModel from '@/State/Payway/PayWayModel'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'payWay',
})
export default class PayWayModule extends AppBaseModule {
  activePayWays: Array<PayWayModel> = []
  selectedPayWay = new PayWayModel()

  get getActivePayWays(): Array<PayWayModel> {
    return this.activePayWays
  }

  get getSelectedPayWay(): PayWayModel {
    return this.selectedPayWay
  }

  get getSelectedPayWayName(): PayWayModel['name'] {
    if (this.selectedPayWay.name === undefined) {
      return ''
    }
    return this.selectedPayWay.name
  }

  get getPayWayChecked(): boolean {
    return this.selectedPayWay.name !== undefined
  }

  get getSelectedPayCost(): (cartTotalPrice: number) => number {
    return (cartTotalPrice: number) => {
      if (
        Number(this.selectedPayWay.free_for_order_amount) < Number(cartTotalPrice) ||
        !this.selectedPayWay.cost
      ) {
        return 0
      }
      return Number(this.selectedPayWay.cost)
    }
  }

  @Mutation
  setActivePayWays(activePayWays: Array<PayWayModel>): void {
    this.activePayWays = activePayWays
  }

  @Mutation
  setSelectedPayWay(selectedPayWay: PayWayModel): void {
    this.selectedPayWay = selectedPayWay
  }

  @Action
  fetchActivePayWaysFromRemote(): Promise<void | Array<PayWayModel>> {
    return api
      .get('pay_way/')
      .then((response: AxiosResponse<Array<PayWayModel>>) => {
        const data: Array<PayWayModel> = response.data
        this.context.commit('setActivePayWays', data)
        return data
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }
}
