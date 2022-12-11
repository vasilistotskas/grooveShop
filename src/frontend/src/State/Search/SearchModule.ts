import { Module } from 'vuex-module-decorators'
import AppBaseModule from '@/State/Common/AppBaseModule'

@Module({
	namespaced: true,
	name: 'search'
})
export default class SearchModule extends AppBaseModule {}
