import { Module } from 'vuex-module-decorators'
import AppBaseModule from '@/store/common/AppBaseModule'

@Module({
	name: 'Module/UserModule',
	namespaced: true,
	stateFactory: true
})
export default class UserModule
	extends AppBaseModule {
}
