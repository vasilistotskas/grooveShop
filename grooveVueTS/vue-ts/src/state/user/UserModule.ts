import router from "@/routes"
import api from "@/api/api.service"
import { useToast } from "vue-toastification"
import ResponseData from "@/state/types/ResponseData"
import { Action, Module } from 'vuex-module-decorators'
import AppBaseModule from '@/state/common/AppBaseModule'

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
                    toast.error('Please enter a valid username and password. Note that both fields may be case-sensitive.')
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
                    toast.success('Success, you can log in!')
                    router.push('/log-in')
                })
                .catch((error: Error) => {
                    toast.error('This name is already taken')
                })
        } catch (e) {
            toast.error(e)
        }
    }

}
