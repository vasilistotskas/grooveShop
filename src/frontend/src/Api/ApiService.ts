import session from './Session'
import AppModule from '@/State/App/AppModule'
import { getModule } from 'vuex-module-decorators'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import { ApiGetData, ApiPatchData, ApiPostData, ApiPutData } from '@/Api/Type/ApiData'

const baseUrl = '/api/v1'
const appModule = getModule(AppModule)

export default {
	alternativeToken: null,

	getUserToken(): string | null {
		return this.alternativeToken || localStorage.getItem('TOKEN_STORAGE_KEY')
	},

	beforeRequest(): void {
		appModule.setLoading(true)
	},

	afterResponse(): void {
		appModule.setLoading(false)
	},

	get(endpoint: string, data?: ApiGetData): Promise<unknown> {
		this.beforeRequest()
		return session({
			url: `${baseUrl}/${endpoint}`,
			method: ApiBaseMethods.GET,
			params: data,
			headers: {
				Authorization: 'Token ' + this.getUserToken()
			}
		}).finally(() => this.afterResponse())
	},

	post<T>(endpoint: string, data: ApiPostData<T>): Promise<unknown> {
		this.beforeRequest()
		return session({
			url: `${baseUrl}/${endpoint}`,
			method: ApiBaseMethods.POST,
			data,
			headers: {
				Authorization: 'Token ' + this.getUserToken()
			}
		}).finally(() => this.afterResponse())
	},

	put(endpoint: string, data: ApiPutData): Promise<unknown> {
		this.beforeRequest()
		return session({
			url: `${baseUrl}/${endpoint}`,
			method: ApiBaseMethods.PUT,
			data,
			headers: {
				Authorization: 'Token ' + this.getUserToken()
			}
		}).finally(() => this.afterResponse())
	},

	patch<T>(endpoint: string, data?: ApiPatchData<T>): Promise<unknown> {
		this.beforeRequest()
		return session({
			url: `${baseUrl}/${endpoint}`,
			method: ApiBaseMethods.PATCH,
			data,
			headers: {
				Authorization: 'Token ' + this.getUserToken()
			}
		}).finally(() => this.afterResponse())
	},

	delete(endpoint: string): Promise<unknown> {
		this.beforeRequest()
		return session({
			url: `${baseUrl}/${endpoint}`,
			method: ApiBaseMethods.DELETE,
			headers: {
				Authorization: 'Token ' + this.getUserToken()
			}
		}).finally(() => this.afterResponse())
	}
}
