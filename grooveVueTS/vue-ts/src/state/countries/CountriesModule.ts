import {Module, Action, Mutation} from 'vuex-module-decorators'
import AppBaseModule from "@/state/common/AppBaseModule";
import api from "@/api/api.service";
import ResponseData from "@/state/types/ResponseData";

@Module({ namespaced: true })
export default class CountriesModule
    extends AppBaseModule
{

}
