import { ComputedRef } from 'vue'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
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

  get axiosBaseUrl(): string | undefined {
    return 'http://localhost:8010'
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
  updateMetaTagElement(metaData: any): void {
    const metaTagElement = <Element>document.querySelector(`meta[name=${metaData.metaName}]`)
    metaTagElement.setAttribute(metaData.metaAttribute, metaData.newValue)
  }
}
