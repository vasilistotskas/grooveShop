import { Action, Module, Mutation } from 'vuex-module-decorators'
import api from "@/api/api.service";
import ResponseData from "@/state/types/ResponseData";
import axios from "axios";
import AppBaseModule from "@/state/common/AppBaseModule";

@Module({ namespaced: true })
export default class UserDataModule
    extends AppBaseModule
{

    token!: string;
    isAuthenticated!: boolean;
    data: Array<any> = []

    get getToken(): string { return this.token }
    get getIsAuthenticated(): boolean { return this.isAuthenticated }
    get getUserData(): Array<any> { return this.data}

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
    unsetUserData() {
        this.token = ''
        this.isAuthenticated = false
        this.data = []
        axios.defaults.headers.common["Authorization"] = ""
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userid")
        // this.reviews = []
        // this.favourites = []
        // this.orders = []
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
}
