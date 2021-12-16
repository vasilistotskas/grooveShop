import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import ProductModel from "@/state/product/ProductModel"
import AppBaseModule from "@/state/common/AppBaseModule"
import {Module, Action, Mutation} from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class ProductModule
    extends AppBaseModule
{

}