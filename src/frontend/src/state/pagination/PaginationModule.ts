import store from '@/dynamicStore'
import session from '@/api/session'
import { AxiosResponse } from 'axios'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import PaginatedModel from '@/state/pagination/Model/PaginatedModel'
import { PaginationModel } from '@/state/pagination/Model/PaginationModel'
import NamespacedResults from '@/state/common/Interface/NamespacedResults'
import PaginatedDataInterface from '@/state/pagination/Interface/PaginatedDataInterface'
import PaginationNamespaceDirectory from '@/state/pagination/PaginationNamespaceDirectory'
import PaginationDataInterface from '@/state/pagination/Interface/PaginationDataInterface'
import { PaginationNamespaceTypesEnum } from '@/state/pagination/Enum/PaginationNamespaceTypesEnum'
import {
  CurrentPageNumberType,
  CurrentQueryType,
  QueryParamsType,
} from '@/state/pagination/Type/PaginationTypes'

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'pagination',
})
export default class PaginationModule extends AppBaseModule {
  namespaceData: PaginationDataInterface = PaginationNamespaceDirectory()

  alternativeToken = ''

  get getUserToken(): string | null {
    return this.alternativeToken || localStorage.getItem('TOKEN_STORAGE_KEY')
  }

  get getResultData() {
    return (namespace: PaginationNamespaceTypesEnum) => {
      return this.namespaceData[namespace].results
    }
  }

  get getResultCountData() {
    return (namespace: PaginationNamespaceTypesEnum) => {
      return this.namespaceData[namespace].resultsCount
    }
  }

  get getResultNextPageUrl() {
    return (namespace: PaginationNamespaceTypesEnum) => {
      return this.namespaceData[namespace].resultsNextPage
    }
  }

  get getResultPreviousPageUrl() {
    return (namespace: PaginationNamespaceTypesEnum) => {
      return this.namespaceData[namespace].resultsPreviousPages
    }
  }

  get getResultTotalPages() {
    return (namespace: PaginationNamespaceTypesEnum) => {
      return this.namespaceData[namespace].resultsTotalPages
    }
  }

  get getCurrentPageNumber() {
    return (namespace: PaginationNamespaceTypesEnum) => {
      return this.namespaceData[namespace].currentPageNumber
    }
  }

  get getCurrentQuery() {
    return (namespace: PaginationNamespaceTypesEnum) => {
      return this.namespaceData[namespace].currentQuery
    }
  }

  get getShowNextButton() {
    return (namespace: PaginationNamespaceTypesEnum) => {
      return this.namespaceData[namespace].showNextButton
    }
  }

  get getShowPreviousButton() {
    return (namespace: PaginationNamespaceTypesEnum) => {
      return this.namespaceData[namespace].showPreviousButton
    }
  }

  @Mutation
  setResults(data: NamespacedResults): void {
    this.namespaceData[data.namespace].results = data.results
  }

  @Mutation
  unsetResults(namespace: PaginationNamespaceTypesEnum): void {
    this.namespaceData[namespace].results = []
    this.namespaceData[namespace].resultsCount = 0

    this.namespaceData[namespace].resultsNextPage = ''
    this.namespaceData[namespace].resultsPreviousPages = ''
    this.namespaceData[namespace].resultsTotalPages = 0

    this.namespaceData[namespace].currentPageNumber = 1
    this.namespaceData[namespace].currentQuery = ''

    this.namespaceData[namespace].showNextButton = false
    this.namespaceData[namespace].showPreviousButton = false
  }

  @Mutation
  setCount(data: PaginatedDataInterface): void {
    this.namespaceData[data.namespace].resultsCount = data.count
  }

  @Mutation
  setNextPageUrl(data: PaginatedDataInterface): void {
    this.namespaceData[data.namespace].resultsNextPage = data.nextPageUrl
  }

  @Mutation
  setPreviousPageUrl(data: PaginatedDataInterface): void {
    this.namespaceData[data.namespace].resultsPreviousPages = data.previousPageUrl
  }

  @Mutation
  setTotalPages(data: PaginatedDataInterface): void {
    this.namespaceData[data.namespace].resultsTotalPages = data.totalPages
  }

  @Mutation
  setCurrentPageNumber({ namespace, pageNumber }: CurrentPageNumberType): void {
    this.namespaceData[namespace].currentPageNumber = pageNumber
  }

  setCurrentQuery({ namespace, queryParams }: CurrentQueryType): void {
    this.namespaceData[namespace].currentQuery = queryParams
  }

  @Mutation
  setShowNextButton(data: PaginatedDataInterface): void {
    this.namespaceData[data.namespace].showNextButton = data.showNextButton
  }

  @Mutation
  setShowPreviousButton(data: PaginatedDataInterface): void {
    this.namespaceData[data.namespace].showPreviousButton = data.showPreviousButton
  }

  @Action
  buildPaginationQueryString(queryParams: QueryParamsType): string {
    let finalQueryString = ''

    let i = 0
    for (const [filterKey, filterValue] of Object.entries(queryParams)) {
      if (i < Object.entries(queryParams).length - 1) {
        finalQueryString += filterKey + '=' + filterValue + '&'
      } else {
        finalQueryString += filterKey + '=' + filterValue
      }
      i++
    }

    return finalQueryString
  }

  @Action
  async fetchPaginatedResults<T>(data: {
    params: PaginationModel
    namespace: PaginationNamespaceTypesEnum
  }): Promise<void> {
    await store.commit('app/setLoading', true)
    const baseUrl = '/api/v1'

    let ApiUrl = ''

    if (!data.params.queryParams && !data.params.pageNumber) {
      ApiUrl = `${baseUrl}/${data.params.endpointUrl}`
    } else if (!data.params.queryParams) {
      ApiUrl = `${baseUrl}/${data.params.endpointUrl}/?p=${data.params.pageNumber}`
    } else {
      const queryStringBuild = await this.context.dispatch(
        'buildPaginationQueryString',
        data.params.queryParams
      )
      ApiUrl = `${baseUrl}/${data.params.endpointUrl}?p=${data.params.pageNumber}&${queryStringBuild}`
    }

    session({
      url: ApiUrl,
      method: data.params.method,
      data: data.params,
      headers: {
        Authorization: 'Token ' + this.getUserToken,
      },
    })
      .then((response: AxiosResponse<Partial<PaginatedModel<T>>>) => {
        const results = response.data.results
        const count = response.data.count
        const nextPageUrl = response.data.links?.next
        const previousPageUrl = response.data.links?.previous
        const totalPages = response.data.total_pages

        if (nextPageUrl) {
          this.context.commit('setShowNextButton', {
            showNextButton: true,
            namespace: data.namespace,
          })
        } else {
          this.context.commit('setShowNextButton', {
            showNextButton: false,
            namespace: data.namespace,
          })
        }

        if (previousPageUrl) {
          this.context.commit('setShowPreviousButton', {
            showPreviousButton: true,
            namespace: data.namespace,
          })
        } else {
          this.context.commit('setShowPreviousButton', {
            showPreviousButton: false,
            namespace: data.namespace,
          })
        }

        this.context.commit('setResults', { results: results, namespace: data.namespace })
        this.context.commit('setCount', { count: count, namespace: data.namespace })
        this.context.commit('setNextPageUrl', {
          nextPageUrl: nextPageUrl,
          namespace: data.namespace,
        })
        this.context.commit('setPreviousPageUrl', {
          previousPageUrl: previousPageUrl,
          namespace: data.namespace,
        })
        this.context.commit('setTotalPages', { totalPages: totalPages, namespace: data.namespace })
      })
      .catch((e: Error) => {
        this.context.commit('unsetResults', data.namespace)
        console.log(e)
      })
      .finally(() => store.commit('app/setLoading', false))
  }
}
