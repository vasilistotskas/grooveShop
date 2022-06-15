import store from '@/store'
import session from './session'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'

const baseUrl = '/api/v1'

export default {
  alternativeToken: null,

  getUserToken(): string | null {
    return this.alternativeToken || localStorage.getItem('TOKEN_STORAGE_KEY')
  },

  beforeRequest(): void {
    store.commit('app/setLoading', true)
  },

  afterResponse(): void {
    store.commit('app/setLoading', false)
  },

  get(endpoint: string, data?: Record<string, string | number | boolean | readonly string[] | readonly number[] | readonly boolean[]>): Promise<unknown> {
    this.beforeRequest()
    return session({
      url: `${baseUrl}/${endpoint}`,
      method: ApiBaseMethods.GET,
      params: data,
      headers: {
        Authorization: 'Token ' + this.getUserToken(),
      },
    }).finally(() => this.afterResponse())
  },

  post(endpoint: string, data: Record<string, unknown>): Promise<unknown> {
    this.beforeRequest()
    return session({
      url: `${baseUrl}/${endpoint}`,
      method: ApiBaseMethods.POST,
      data,
      headers: {
        Authorization: 'Token ' + this.getUserToken(),
      },
    }).finally(() => this.afterResponse())
  },

  put(endpoint: string, data: Record<string, string | number | boolean | readonly string[] | readonly number[] | readonly boolean[]>): Promise<unknown> {
    this.beforeRequest()
    return session({
      url: `${baseUrl}/${endpoint}`,
      method: ApiBaseMethods.PUT,
      data,
      headers: {
        Authorization: 'Token ' + this.getUserToken(),
      },
    }).finally(() => this.afterResponse())
  },

  patch(endpoint: string, data?: Record<string, string | number | boolean | readonly string[] | readonly number[] | readonly boolean[]>): Promise<unknown> {
    this.beforeRequest()
    return session({
      url: `${baseUrl}/${endpoint}`,
      method: ApiBaseMethods.PATCH,
      data,
      headers: {
        Authorization: 'Token ' + this.getUserToken(),
      },
    }).finally(() => this.afterResponse())
  },

  delete(endpoint: string): Promise<unknown> {
    this.beforeRequest()
    return session({
      url: `${baseUrl}/${endpoint}`,
      method: ApiBaseMethods.DELETE,
      headers: {
        Authorization: 'Token ' + this.getUserToken(),
      },
    }).finally(() => this.afterResponse())
  },
}
