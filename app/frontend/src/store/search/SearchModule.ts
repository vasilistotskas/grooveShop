import { Module } from 'vuex-module-decorators'
import AppBaseModule from '@/store/common/AppBaseModule'

@Module({
	name: 'Module/SearchModule',
	namespaced: true,
	stateFactory: true
})
export default class SearchModule
	extends AppBaseModule {

}