import { Action, Module, Mutation } from 'vuex-module-decorators'
import AppBaseModule from '@/state/common/AppBaseModule'
import api from "@/api/api.service";
import ResponseData from "@/state/types/ResponseData";
import axios from "axios";

@Module({ namespaced: true })
export default class UserModule
    extends AppBaseModule
{
    token!: string;
    isAuthenticated!: boolean;
    data: Array<any> = []
    reviews: Array<any> = []
    favourites: Array<any> = []
    orders: Array<any> = []

    get getToken(): string { return this.token }
    get getIsAuthenticated(): boolean { return this.isAuthenticated }
    get getUserData(): Array<any> { return this.data}
    get getUserReviews(): Array<any> { return this.reviews }
    get getUserFavourites(): Array<any> { return this.favourites }
    get getUserOrders(): Array<any> { return this.orders }

    async ensureUserIsAuthenticated() {
        if (!this.isAuthenticated)
            throw new Error('User not authenticated')
    }

    @Mutation
    initializeAuth() {
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
    setUserData(data: Array<any>): void { this.data = data }

    @Mutation
    setUserOrders(orders: Array<any>): void { this.orders = orders }

    @Mutation
    setUserReviews(reviews: Array<any>): void { this.reviews = reviews }

    @Mutation
    setUserFavourites(favourites: Array<any>): void { this.favourites = favourites }

    @Mutation
    unsetUserData() {
        axios.defaults.headers.common["Authorization"] = ""
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userid")
        this.token = ''
        this.isAuthenticated = false
        this.data = []
        this.reviews = []
        this.favourites = []
        this.orders = []
    }

    @Action
    async userDataFromRemote(): Promise<void> {
        let errors: Array<any> = []

        if (this.token === undefined) {
            this.token = localStorage.getItem('token') || ''
        } else {
            this.context.commit('setToken', this.token)
        }

        await this.ensureUserIsAuthenticated
        await api.get('userprofile/data')
            .then((response: ResponseData) => {
                const data = response.data
                this.context.commit('setUserData', data[0])
                axios.defaults.headers.common["Authorization"] = "Token " + this.token
                localStorage.setItem("token", this.token)
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    @Action
    async userOrdersFromRemote(): Promise<void> {
        await api.get('orders/')
            .then((response: ResponseData) => {
                const data = response.data
                console.log('eww')
                this.context.commit('setUserOrders', data[0])
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    @Action
    async userLogIn(formData: object){
        await api.post('djoser/token/login', formData)
            .then((response: ResponseData) => {
                const token: string = response.data.auth_token
                localStorage.setItem("token", token)
                this.context.commit('setToken', token)
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

}