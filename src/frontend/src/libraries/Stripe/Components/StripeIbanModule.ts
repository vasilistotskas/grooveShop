import store from '@/dynamicStore'
import AppBaseModule from '@/state/common/AppBaseModule'
import initStripeComponent from '@/libraries/Stripe/Stripe'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import { StripeElement } from '@/libraries/Stripe/StripeElement'

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'stripeIban',
})
export default class StripeIbanModule extends AppBaseModule {
  stripeKey = 'pk_test_sDva2BtVWsc3nQzcqU5MEWDP008QiK6ae3'
  ibanError!: any
  ibanIsCompleted!: any
  ibanEl!: any
  stripeInstance = window as any
  notifyError!: (ev: any) => void

  @Mutation
  setInstance(init: any): void {
    this.stripeInstance = init.stripeInstance
    this.ibanEl = init.stripeEl
  }

  @Mutation
  setNotifyError(err: any): void {
    this.notifyError = err
  }

  @Mutation
  setIbanCompleted(complete: any): void {
    this.ibanIsCompleted = complete
  }

  @Mutation
  setIbanError(error: any): void {
    this.ibanError = error?.message ?? null
  }

  @Action
  async initIBANComponent(): Promise<void> {
    const ibanElementExists = document.getElementById('stripe-iban-element')
    if (ibanElementExists) {
      const init = await initStripeComponent(
        this.stripeKey,
        StripeElement.IBAN,
        '#stripe-iban-element',
        ({ complete, error }: any) => {
          if (error) {
            this.context.commit('setIbanError', error)
          }
          this.context.commit('setIbanCompleted', complete)
        },
        (err) => this.context.commit('setNotifyError', err)
      )
      if (init) {
        this.context.commit('setInstance', init)
      }
    }
  }
}
