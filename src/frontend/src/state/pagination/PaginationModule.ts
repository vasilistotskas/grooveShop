import store from '@/store'
import session from '@/api/session'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import PaginationNamespaceDirectory from '@/state/pagination/PaginationNamespaceDirectory'
import PaginationDataInterface from '@/state/pagination/Interface/PaginationDataInterface'
import { PaginationNamespaceDataEnum } from '@/state/pagination/Enum/PaginationNamespaceDataEnum'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'

@Module({ namespaced: true })
export default class PaginationModule extends AppBaseModule {

	namespaceData: PaginationDataInterface = PaginationNamespaceDirectory()

	alternativeToken = ''

	get getUserToken(): string | null {
		return this.alternativeToken || localStorage.getItem('TOKEN_STORAGE_KEY')
	}

	get getResultData() {
		return (namespace: PaginationNamespaceDataEnum) => {
			return this.namespaceData[namespace].results
		}
	}

	get getResultCountData() {
		return (namespace: PaginationNamespaceDataEnum) => {
			return this.namespaceData[namespace].results_count
		}
	}

	get getResultNextPageUrl() {
		return (namespace: PaginationNamespaceDataEnum) => {
			return this.namespaceData[namespace].results_next_page
		}
	}

	get getResultPreviousPageUrl() {
		return (namespace: PaginationNamespaceDataEnum) => {
			return this.namespaceData[namespace].results_previous_page
		}
	}

	get getResultTotalPages() {
		return (namespace: PaginationNamespaceDataEnum) => {
			return this.namespaceData[namespace].results_total_pages
		}
	}

	get getCurrentPageNumber() {
		return (namespace: PaginationNamespaceDataEnum) => {
			return this.namespaceData[namespace].current_page_number
		}
	}

	get getCurrentQuery() {
		return (namespace: PaginationNamespaceDataEnum) => {
			return this.namespaceData[namespace].current_query
		}
	}

	get getShowNextButton() {
		return (namespace: PaginationNamespaceDataEnum) => {
			return this.namespaceData[namespace].show_next_button
		}
	}

	get getShowPreviousButton() {
		return (namespace: PaginationNamespaceDataEnum) => {
			return this.namespaceData[namespace].show_previous_button
		}
	}

	@Mutation
	setResults(data: Partial<any>): void {
		this.namespaceData[data.namespace].results = data.results
	}

	@Mutation
	unsetResults(namespace: PaginationNamespaceDataEnum): void {
		this.namespaceData[namespace].results = []
		this.namespaceData[namespace].results_count = 0

		this.namespaceData[namespace].results_next_page = ''
		this.namespaceData[namespace].results_previous_page = ''
		this.namespaceData[namespace].results_total_pages = 0

		this.namespaceData[namespace].current_page_number = 1
		this.namespaceData[namespace].current_query = ''

		this.namespaceData[namespace].show_next_button = false
		this.namespaceData[namespace].show_previous_button = false
	}

	@Mutation
	setCount(data: Partial<any>): void {
		this.namespaceData[data.namespace].results_count = data.count
	}

	@Mutation
	setNextPageUrl(data: Partial<any>): void {
		this.namespaceData[data.namespace].results_next_page = data.nextPageUrl
	}

	@Mutation
	setPreviousPageUrl(data: Partial<any>): void {
		this.namespaceData[data.namespace].results_previous_page = data.previousPageUrl
	}

	@Mutation
	setTotalPages(data: Partial<any>): void {
		this.namespaceData[data.namespace].results_total_pages = data.totalPages
	}

	@Mutation
	setCurrentPageNumber(data: Partial<any>): void {
		this.namespaceData[data.namespace].current_page_number = data.pageNumber
	}

	@Mutation
	setCurrentQuery(data: Partial<any>): void {
		this.namespaceData[data.namespace].current_query = data.currentQuery
	}

	@Mutation
	setShowNextButton(data: Partial<any>): void {
		this.namespaceData[data.namespace].show_next_button = data.showNextButton
	}

	@Mutation
	setShowPreviousButton(data: Partial<any>): void {
		this.namespaceData[data.namespace].show_previous_button = data.showPreviousButton
	}

	@Action
	async fetchPaginatedResults(data: { params: PaginationQueryParametersModel, namespace: PaginationNamespaceDataEnum }): Promise<void> {
		await store.commit('app/setLoading', true)
		const baseUrl = '/api/v1'

		let ApiUrl = ''

		if (!data.params.queryParams && !data.params.pageNumber) {
			ApiUrl = `${ baseUrl }/${ data.params.endpointUrl }`
		} else if (!data.params.queryParams) {
			ApiUrl = `${ baseUrl }/${ data.params.endpointUrl }/?p=${ data.params.pageNumber }`
		} else {
			ApiUrl = `${ baseUrl }/${ data.params.endpointUrl }?p=${ data.params.pageNumber }&query=${ data.params.queryParams.query['query'] }`
		}

		session({
			url: ApiUrl,
			method: data.params.method,
			data: data.params,
			headers: {
				Authorization: 'Token ' + this.getUserToken
			}
		})
			.then((response: any) => {
				const results = response.data.results
				const count = response.data.count
				const nextPageUrl = response.data.links.next
				const previousPageUrl = response.data.links.previous
				const totalPages = response.data.total_pages

				if (nextPageUrl) {
					this.context.commit('setShowNextButton', { showNextButton: true, namespace: data.namespace })
				} else {
					this.context.commit('setShowNextButton', { showNextButton: false, namespace: data.namespace })
				}

				if (previousPageUrl) {
					this.context.commit('setShowPreviousButton', { showPreviousButton: true, namespace: data.namespace })
				} else {
					this.context.commit('setShowPreviousButton', { showPreviousButton: false, namespace: data.namespace })
				}

				this.context.commit('setResults', { results: results, namespace: data.namespace })
				this.context.commit('setCount', { count: count, namespace: data.namespace })
				this.context.commit('setNextPageUrl', { nextPageUrl: nextPageUrl, namespace: data.namespace })
				this.context.commit('setPreviousPageUrl', { previousPageUrl: previousPageUrl, namespace: data.namespace })
				this.context.commit('setTotalPages', { totalPages: totalPages, namespace: data.namespace })
			})
			.catch((e: Error) => {
				this.context.commit('unsetResults', data.namespace)
				console.log(e)
			})
			.finally(() =>
				store.commit('app/setLoading', false)
			)

	}


}