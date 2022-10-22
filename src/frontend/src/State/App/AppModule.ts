import { ComputedRef } from 'vue'
import store from '@/DynamicStore'
import AppBaseModule from '@/State/Common/AppBaseModule'
import MetaData from '@/State/Common/Interface/MetaData'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({
	dynamic: true,
	namespaced: true,
	store: store,
	stateFactory: true,
	name: 'app'
})
export default class AppModule extends AppBaseModule {
	loading = false
	windowWidth: number = window.innerWidth
	navbarMenuHidden = true
	checkoutErrors!: ComputedRef

	get getLoading(): boolean {
		return this.loading
	}

	get getNavbarMenuHidden(): boolean {
		return this.navbarMenuHidden
	}

	get backendBaseUrl(): string | undefined {
		return process.env.VITE_APP_BASE_URL
	}

	get getWindowWidth(): number {
		return this.windowWidth
	}

	get isMobile(): boolean {
		return this.windowWidth <= 990
	}

	get getCheckoutErrors(): ComputedRef {
		return this.checkoutErrors
	}

	get getInstagramApiToken(): string {
		return 'IGQVJYTlhTQzlKYXBTY2RXRkp5YzRwalNpR1VJVm5QY0toZAzhKVWpabDBLWGk1VUdfZAEU2Nzhrd3B2ZAFJ3bV9IdzRNaGhjbThDNDJrcVA5Si1CTzloVnBxQzhOZA2ZAzQXNOcE9WbVE2UWtsX0VGTEltMQZDZD'
	}

	@Mutation
	setNavbarMenuHidden(shouldBeLoad: boolean): void {
		this.navbarMenuHidden = shouldBeLoad
	}

	@Mutation
	setLoading(shouldBeLoad: boolean): void {
		this.loading = shouldBeLoad
	}

	@Mutation
	setWindowWidth(width: number): void {
		this.windowWidth = width
	}

	@Mutation
	setCheckoutErrors(errors: ComputedRef): void {
		this.checkoutErrors = errors
	}

	@Action
	init(): void {
		this.context.commit('setLoading', false)
	}

	@Action
	updateMetaTagElement(metaData: MetaData): void {
		const metaTagElement = <Element>(
			document.querySelector(`meta[name=${metaData.metaName}]`)
		)
		metaTagElement.setAttribute(metaData.metaAttribute, metaData.newValue)
	}
}
