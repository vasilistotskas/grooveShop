import axios from 'axios'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class AppModule
    extends AppBaseModule
{
    loading = false

    get getLoading(): boolean {
        return this.loading
    }

    get axiosBaseUrl(): string | undefined {
        return axios.defaults.baseURL
    }

    @Action
    init(): void {
        this.context.commit('setLoading', false)
    }

    @Mutation
    setLoading(shouldBeLoad: boolean): void {
        this.loading = shouldBeLoad
    }

}