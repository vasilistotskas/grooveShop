import store from '@/renderer/dynamicStore'
import { Module } from 'vuex-module-decorators'
import AppBaseModule from '@/state/common/AppBaseModule'

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'search',
})
export default class SearchModule extends AppBaseModule {}
