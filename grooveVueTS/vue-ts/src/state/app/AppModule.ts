import { Action, Module, Mutation } from 'vuex-module-decorators'
import AppBaseModule
    from '@/state/common/AppBaseModule'

@Module({ namespaced: true })
export default class AppModule
    extends AppBaseModule
{
    loading = false

    get getLoading(): boolean {
        return this.loading
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