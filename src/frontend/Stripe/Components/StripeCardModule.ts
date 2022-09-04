import store from '@/renderer/dynamicStore'
import AppBaseModule from '@/state/common/AppBaseModule'
import initStripeComponent from '@/Stripe/Stripe'
import { StripeElement } from '@/Stripe/StripeElement'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'stripeCard',
})
export default class StripeCardModule extends AppBaseModule {
  stripeKey = 'pk_test_sDva2BtVWsc3nQzcqU5MEWDP008QiK6ae3'
  element!: StripeElement
  selector!: string
  cbOnChange!: (ev: any) => void
  cbError!: (ev: any) => void
  stripeInstance = window as any
  stripeEl!: any
  notifyError!: (ev: any) => void
  cardNumberError!: any
  cardNumberIsCompleted!: any
  cardExpiryError!: (ev: any) => void
  cardNumberEl!: any
  cardExpiryIsCompleted!: any
  cardCvcIsCompleted!: boolean
  cardExpiryEl!: any
  cardCvcEl!: any
  resultToken!: string
  card!: Record<
    string,
    string | number | boolean | readonly string[] | readonly number[] | readonly boolean[]
  >
  cardIsCompleted!: boolean
  cardError!: string

  get getResultToken(): any {
    return this.resultToken
  }

  get getStripeKey(): string {
    return this.stripeKey
  }

  @Mutation
  setCard(initCard: any): void {
    this.stripeInstance = initCard.stripeInstance
    this.card = initCard.stripeEl
  }

  @Mutation
  setCardNumber(initCardNumber: any): void {
    this.stripeInstance = initCardNumber.stripeInstance
    this.cardNumberEl = initCardNumber.stripeEl
  }

  @Mutation
  setCardExpiry(initCardExpiry: any): void {
    this.stripeInstance = initCardExpiry.stripeInstance
    this.cardExpiryEl = initCardExpiry.stripeEl
  }

  @Mutation
  setCardCvc(initCardCvc: any): void {
    this.stripeInstance = initCardCvc.stripeInstance
    this.cardCvcEl = initCardCvc.stripeEl
  }

  @Mutation
  setNotifyError(err: any): void {
    this.notifyError = err
  }

  @Mutation
  setCardNumberIsCompleted(complete: any): void {
    this.cardNumberIsCompleted = complete
  }

  @Mutation
  setCardIsCompleted(complete: boolean): void {
    this.cardIsCompleted = complete
  }

  @Mutation
  setCardCvcIsCompleted(complete: boolean): void {
    this.cardCvcIsCompleted = complete
  }

  @Mutation
  setCardExpiryIsCompleted(complete: any): void {
    this.cardExpiryIsCompleted = complete
  }

  @Mutation
  setCardNumberError(error: any): void {
    this.cardNumberError = error?.message ?? null
  }

  @Mutation
  setCardExpiryError(error: any): void {
    this.cardExpiryError = error?.message ?? null
  }

  @Mutation
  setCardError(error: any): void {
    this.cardError = error?.message ?? null
  }

  @Mutation
  setResultToken(result: any): void {
    this.resultToken = result.token
  }

  @Action
  async createStripeToken(): Promise<void> {
    const elements = this.card
    await this.stripeInstance.createToken(elements).then((result: any) => {
      this.context.commit('setResultToken', result)
    })
  }

  @Action
  async initStripeComponent(): Promise<void> {
    /** Card */
    const initCard = await initStripeComponent(
      this.stripeKey,
      StripeElement.CARD,
      '#stripe-card',
      ({ complete, error }: any) => {
        if (error) {
          this.context.commit('setCardError', error)
        }
        this.context.commit('setCardIsCompleted', complete)
      },
      (err) => this.context.commit('setNotifyError', err)
    )
    if (initCard) {
      this.context.commit('setCard', initCard)
    }

    /** Card Number */
    const cardNumberExists = document.getElementById('stripe-card-number-element')
    if (cardNumberExists) {
      const initCardNumber = await initStripeComponent(
        this.stripeKey,
        StripeElement.CARD_NUMBER,
        '#stripe-card-number-element',
        ({ complete, error }: any) => {
          if (error) {
            this.context.commit('setCardNumberError', error)
          }
          this.context.commit('setCardNumberIsCompleted', complete)
        },
        (err) => this.context.commit('setNotifyError', err)
      )
      if (initCardNumber) {
        this.context.commit('setCardNumber', initCardNumber)
      }
    }

    /** Card Expiry */
    const cardExpiryExists = document.getElementById('stripe-card-expiry-element')
    if (cardExpiryExists) {
      const initCardExpiry = await initStripeComponent(
        this.stripeKey,
        StripeElement.CARD_EXPIRY,
        '#stripe-card-expiry-element',
        ({ complete, error }: any) => {
          if (error) {
            this.context.commit('setCardExpiryError', error)
          }
          this.context.commit('setCardExpiryIsCompleted', complete)
        },
        (err) => this.context.commit('setNotifyError', err)
      )
      if (initCardExpiry) {
        this.context.commit('setCardExpiry', initCardExpiry)
      }
    }

    /** Card CVC */
    const cardCvcExists = document.getElementById('stripe-card-cvc-element')
    if (cardCvcExists) {
      const initCardCvc = await initStripeComponent(
        this.stripeKey,
        StripeElement.CARD_CVC,
        '#stripe-card-cvc-element',
        ({ complete }: any) => {
          this.context.commit('setCardCvcIsCompleted', complete)
        },
        (err) => this.context.commit('setNotifyError', err)
      )
      if (initCardCvc) {
        this.context.commit('setCardCvc', initCardCvc)
      }
    }
  }
}
