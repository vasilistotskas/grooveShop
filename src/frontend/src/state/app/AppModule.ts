import session from '@/api/session'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class AppModule extends AppBaseModule {
	loading: boolean = false
	windowWidth: number = window.innerWidth
	navbarMenuHidden: boolean = true

	get getLoading(): boolean {
		return this.loading
	}

	get getNavbarMenuHidden(): boolean {
		return this.navbarMenuHidden
	}

	get axiosBaseUrl(): string | undefined {
		return session.defaults.baseURL
	}

	get getWindowWidth(): number {
		return this.windowWidth
	}

	get isMobile(): boolean {
		return this.windowWidth <= 990
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

	@Action
	init(): void {
		this.context.commit('setLoading', false)
	}

	@Action
	updateMetaTagElement(metaData: any): void {
		const metaTagElement = <Element>document.querySelector(`meta[name=${ metaData.metaName }]`)
		metaTagElement.setAttribute(metaData.metaAttribute, metaData.newValue)
	}
}