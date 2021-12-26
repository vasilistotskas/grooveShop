import router from "@/routes"
import api from "@/api/api.service"
import { useToast } from "vue-toastification"
import ResponseData from "@/state/types/ResponseData"
import { Action, Module } from 'vuex-module-decorators'
import AppBaseModule from '@/state/common/AppBaseModule'

const toast = useToast()

@Module({ namespaced: true })
export default class UserModule
    extends AppBaseModule {}
