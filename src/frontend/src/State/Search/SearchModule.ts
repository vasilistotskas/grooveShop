import store from '@/DynamicStore'
import { Module } from 'vuex-module-decorators'
import AppBaseModule from '@/State/Common/AppBaseModule'

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'search',
})
export default class SearchModule extends AppBaseModule {}
