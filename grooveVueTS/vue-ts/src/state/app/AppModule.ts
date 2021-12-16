import axios from 'axios'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class AppModule
    extends AppBaseModule
{
    loading = false
    windowWidth  = window.innerWidth

    get getLoading(): boolean {
        return this.loading
    }

    get axiosBaseUrl(): string | undefined {
        return axios.defaults.baseURL
    }

    get getWindowWidth(): number {
        return this.windowWidth
    }

    get isMobile(): boolean {
        return this.windowWidth <= 990
    }

    @Mutation
    setWindowWidth(width: number): void {
        this.windowWidth = width
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
    updateMetaTagElement(metaData: any): void {
        const metaTagElement = <Element> document.querySelector(`meta[name=${metaData.metaName}]`);
        metaTagElement.setAttribute(metaData.metaAttribute, metaData.newValue);
    }
}