import { Module } from 'vuex-module-decorators';
import AppBaseModule from '@/state/common/AppBaseModule';

@Module({ namespaced: true })
export default class UserModule
  extends AppBaseModule {
}
