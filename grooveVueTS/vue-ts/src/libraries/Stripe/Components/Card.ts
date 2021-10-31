import initStripeComponent from "@/libraries/Stripe/Stripe";
import {Action, Module, Mutation} from "vuex-module-decorators";
import AppBaseModule from "@/state/common/AppBaseModule";
import { StripeElement } from "@/libraries/Stripe/StripeElement"

@Module({ namespaced: true })
export default class StripeCardComponents
    extends AppBaseModule{

    stripeKey: string = 'pk_test_sDva2BtVWsc3nQzcqU5MEWDP008QiK6ae3'
    element!: StripeElement
    selector!: string
    cbOnChange!: (ev: any) => void
    cbError!: (ev: any) => void
    stripeInstance = (window as any)
    stripeEl!: any
    notifyError!: (ev: any) => void
    cardNumberError!: any
    cardNumberIsCompleted!: any
    cardExpiryError!: (ev: any) => void
    cardNumberEl!: any
    cardExpiryIsCompleted!: any
    cardCvcIsCompleted!: any
    cardExpiryEl!: any
    cardCvcEl!: any

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
        this.notifyError(err)
    }

    @Mutation
    setCardNumberIsCompleted(complete: any): void {
        this.cardNumberIsCompleted = complete
    }

    @Mutation
    setCardCvcIsCompleted(complete: any): void {
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

    @Action
    async initStripeComponent(): Promise<void> {
        /** Card Number */
        const initCardNumber = await initStripeComponent(
            this.stripeKey,
            StripeElement.CARD_NUMBER,
            '#stripe-card-number-element',
            ({ complete, error }: any) => {
                if(error) {
                    this.context.commit('setCardNumberError', error)
                }
                this.context.commit('setCardNumberIsCompleted', complete)
            },
            (err) => this.context.commit('setNotifyError', err)
        )
        if (initCardNumber) {
            this.context.commit('setCardNumber', initCardNumber)
        }

        /** Card Expiry */
        const initCardExpiry = await initStripeComponent(
            this.stripeKey,
            StripeElement.CARD_EXPIRY,
            '#stripe-card-expiry-element',
            ({ complete, error }: any) => {
                if(error) {
                    this.context.commit('setCardExpiryError', error)
                }
                this.context.commit('setCardExpiryIsCompleted', complete)
            },
            (err) => this.context.commit('setNotifyError', err)
        )
        if (initCardExpiry) {
            this.context.commit('setCardExpiry', initCardExpiry)
        }
        /** Card CVC */
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