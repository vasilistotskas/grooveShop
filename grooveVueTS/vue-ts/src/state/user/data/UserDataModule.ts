import axios from "axios"
import store from '@/store'
import api from "@/api/api.service"
import { useToast } from 'vue-toastification'
import ResponseData from "@/state/types/ResponseData"
import AppBaseModule from "@/state/common/AppBaseModule"
import { Action, Module, Mutation } from 'vuex-module-decorators'

const toast = useToast()

@Module({ namespaced: true })
export default class UserDataModule
    extends AppBaseModule
{

    token!: string;
    isAuthenticated!: boolean;
    user_id!: number|undefined;
    data: object = {}

    get getToken(): string { return this.token }
    get getIsAuthenticated(): boolean { return this.isAuthenticated }
    get getUserId(): number|undefined { return this.user_id }
    get getUserData(): object { return this.data}

    @Mutation
    initializeAuth(): void {
        if (localStorage.getItem('token')) {
            this.token !== null ? localStorage.getItem('token') : []
            this.isAuthenticated = true
        } else {
            this.token = ''
            this.isAuthenticated = false
        }
    }

    @Mutation
    setToken(token: string): void { this.token = token }

    @Mutation
    setUserData(data: object): void { this.data = data }

    @Mutation
    setUserId(user_id: number) { this.user_id = user_id }

    @Mutation
    unsetUserData(): void {
        this.token = ''
        this.isAuthenticated = false
        this.data = []
        this.user_id = undefined
        axios.defaults.headers.common["Authorization"] = ""
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userid")

        store.commit('product/favourite/unsetFavourites')
        store.commit('product/favourite/unsetUserFavourites')
        store.commit('product/review/unsetUserToProductReview')
        store.commit('product/review/unsetUserReviews')
        store.commit('user/order/unsetUserOrders')
        store.commit('country/unsetUserCountryData')
    }

    @Action
    async ensureUserIsAuthenticated(): Promise<void> {
        if (!this.isAuthenticated)
            throw new Error('User not authenticated')
    }

    @Action
    async userDataFromRemote(): Promise<void> {

        if (this.token === undefined) {
            this.token = localStorage.getItem('token') || ''
        } else {
            this.context.commit('setToken', this.token)
        }

        await api.get('userprofile/data')
            .then((response: ResponseData) => {
                const data = response.data
                this.context.commit('setUserData', data[0])
                this.context.commit('setUserId', data[0].id)
                store.dispatch('country/findRegionsBasedOnAlphaForLoggedCustomer')
                store.dispatch('product/favourite/userFavouritesFromRemote', response.data[0].user)
                store.dispatch('product/favourite/userFavouriteProductsFromRemote', response.data[0].user)
                store.dispatch('product/review/getCurrentUserReviews', data[0].id)
                axios.defaults.headers.common["Authorization"] = "Token " + this.token
                localStorage.setItem("token", this.token)
            })
            .catch((e: Error) => {
                console.log(e)
            })
    }

    @Action
    async updateUserDetails(data: any): Promise<void> {
        const user_id = await this.context.getters['getUserId']

        try {
            await api.patch(`userprofile/${user_id}/`, data)
                .then((response: ResponseData) => this.context.commit('setUserData', response.data))
                .catch((e: Error) => {
                    console.log(e)
                })
                toast.success("Profile Updated")
        } catch (error) {
            throw error
        }
    }
}
