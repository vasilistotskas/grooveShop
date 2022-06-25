import store from '@/store'
import api from '@/api/api.service'
import { AxiosResponse } from 'axios'
import PayWayModel from '@/state/payway/PayWayModel'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
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

  get getSelectedPayCost(): PayWayModel['cost'] {
    const cartTotalPrice = store.getters['cart/getCartTotalPrice']
    if (Number(this.selectedPayWay.free_for_order_amount) < Number(cartTotalPrice) || !this.selectedPayWay.cost) {
      return 0
    }
    return Number(this.selectedPayWay.cost)
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
