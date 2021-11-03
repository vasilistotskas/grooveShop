import { Action, Module } from 'vuex-module-decorators'
import AppBaseModule from '@/state/common/AppBaseModule'
import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import router from "@/routes"
import { useToast } from "vue-toastification"

const toast = useToast()

@Module({ namespaced: true })
export default class UserModule
    extends AppBaseModule
{
    @Action
    async userLogIn(formData: object): Promise<void> {
        try {
            await api.post('djoser/token/login', formData)
                .then((response: ResponseData) => {
                    const token: string = response.data.auth_token
                    localStorage.setItem("token", token)
                    this.context.commit('data/setToken', token)
                    router.push('/')
                })
                .catch((e: Error) => {
                    toast.error('Username or Password field is wrong')
                })
        } catch (e) {
            toast.error(e)
        }
    }

    @Action
    async userSignUp(formData: object): Promise<void> {
        try {
            await api.post('djoser/users/', formData)
                .then((response: ResponseData) => {
                    toast.error('Success, you can log in!')
                    router.push('/log-in')
                })
                .catch((error: Error) => {
                    toast.error('Error')
                })
        } catch (e) {
            toast.error(e)
        }
    }

}
