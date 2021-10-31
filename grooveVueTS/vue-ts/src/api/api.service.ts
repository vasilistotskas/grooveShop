// @ts-ignore
import { isEmpty, isObject, keys, each, isDate, isNull } from 'lodash'
import axios from 'axios'
import store from '@/store'
// @ts-ignore
import qs from 'querystring'

const baseUrl = '/api/v1'
export default {
    alternativeToken: null,

    getUserToken() {
        return this.alternativeToken || localStorage.getItem('token');
    },

    beforeRequest() {
        store.commit('app/setLoading', true)
    },

    afterResponse() {
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
            data: qs.stringify(data),
            headers: {
                Authorization: "Token " + this.getUserToken()
            }
        }).finally(() => this.afterResponse())
    },

    postRaw: function(endpoint: string, data: unknown): Promise<unknown> {
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

    buildFormData: function (formData: FormData, data: never, parentKey?: string | number): void {
        if (
            !isEmpty(data)
            && isObject(data)
            && !(isDate(data))
            && !((data as File) instanceof File)
            && !((data as Blob) instanceof Blob)
        ) {
            each(keys(data), (key: string | number) => {
                this.buildFormData(
                    formData,
                    data[key],
                    parentKey ? `${parentKey}[${key}]` : key
                )
            })
        } else {
            if (typeof parentKey === "string") {
                formData.append(
                    parentKey,
                    isNull(data) ? '' : data
                )
            }
        }
    }

}