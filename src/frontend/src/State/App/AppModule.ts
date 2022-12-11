import AppBaseModule from '@/State/Common/AppBaseModule'
import MetaData from '@/State/Common/Interface/MetaData'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({
	namespaced: true,
	name: 'app'
})
export default class AppModule extends AppBaseModule {
	loading = false
	navbarMenuHidden = true

	get getLoading(): boolean {
		return this.loading
	}

	get getNavbarMenuHidden(): boolean {
		return this.navbarMenuHidden
	}

	get backendBaseUrl(): string | undefined {
		return process.env.VITE_APP_BASE_URL
	}

	get isMobile(): boolean {
		const media = window.matchMedia('pointer: coarse')
		return media.matches
	}

	get getInstagramApiToken(): string | undefined {
		return process.env.INSTAGRAM_API_TOKEN
	}

	@Mutation
	setNavbarMenuHidden(shouldBeLoad: boolean): void {
		this.navbarMenuHidden = shouldBeLoad
	}

	@Mutation
	setLoading(shouldBeLoad: boolean): void {
		this.loading = shouldBeLoad
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
		if (metaTagElement) {
			metaTagElement.setAttribute(metaData.metaAttribute, metaData.newValue)
		}
	}
}
