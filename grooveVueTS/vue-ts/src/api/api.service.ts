import axios from 'axios'
import store from '@/store'
import qs from 'querystring'
import { isEmpty, isObject, keys, each, isDate, isNull } from 'lodash'

const baseUrl = '/api/v1'
export default {
    alternativeToken: null,

    getUserToken(): string| null {
        return this.alternativeToken || localStorage.getItem('token');
    },

    beforeRequest(): void {
        store.commit('app/setLoading', true)
    },

    afterResponse(): void {
        store.commit('app/setLoading', false)
    },

    get: function(endpoint: string, data?: Record<string, string | number | boolean | readonly string[] | readonly number[] | readonly boolean[]>): Promise<unknown> {
        this.beforeRequest()
        return axios({
            url: `${baseUrl}/${endpoint}`,
            method: 'get',
            params: data,
            headers: {
                Authorization: "Token " + this.getUserToken()
            }
        }).finally(() => this.afterResponse())
    },

    post: function(endpoint: string, data: object): Promise<unknown> {
        this.beforeRequest()
        return axios({
            url: `${baseUrl}/${endpoint}`,
            method: 'post',
            data: data,
            headers: {
                Authorization: "Token " + this.getUserToken()
            }
        }).finally(() => this.afterResponse())
    },

    put: function(endpoint: string, data: Record<string, string | number | boolean | readonly string[] | readonly number[] | readonly boolean[]>): Promise<unknown> {
        this.beforeRequest()
        return axios({
            url: `${baseUrl}/${endpoint}`,
            method: 'put',
            data: qs.stringify(data),
            headers: {
                Authorization: "Token " + this.getUserToken()
            }
        }).finally(() => this.afterResponse())
    },

    patch: function(endpoint: string, data?: Record<string, string | number | boolean | readonly string[] | readonly number[] | readonly boolean[]>): Promise<unknown> {
        this.beforeRequest()
        return axios({
            url: `${baseUrl}/${endpoint}`,
            method: 'patch',
            data: data,
            headers: {
                Authorization: "Token " + this.getUserToken()
            }
        }).finally(() => this.afterResponse())
    },

    delete: function(endpoint: string): Promise<unknown> {
        this.beforeRequest()
        return axios({
            url: `${baseUrl}/${endpoint}`,
            method: 'delete',
            headers: {
                Authorization: "Token " + this.getUserToken()
            }
        }).finally(() => this.afterResponse())
    },

}
