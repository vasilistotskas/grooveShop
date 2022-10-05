import {
  CountType,
  CurrentPageNumberType,
  CurrentQueryType,
  NextPageUrlType,
  PaginationResultsType,
  PreviousPageUrlType,
  QueryParamsType,
  ShowNextButtonType,
  ShowPreviousButtonType,
  TotalPagesType,
} from '@/State/Pagination/Type/PaginationTypes'
import store from '@/DynamicStore'
import session from '@/Api/Session'
import { AxiosResponse } from 'axios'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import PaginationNamespaceDirectory from '@/State/Pagination/PaginationNamespaceDirectory'
import PaginationDataInterface from '@/State/Pagination/Interface/PaginationDataInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'pagination',
})
export default class PaginationModule<TPaginatedModel> extends AppBaseModule {
  namespaceData: PaginationDataInterface<TPaginatedModel> = PaginationNamespaceDirectory()

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
  setResults({ namespace, results }: PaginationResultsType<TPaginatedModel>): void {
    this.namespaceData[namespace].results = results
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
  setCount({ namespace, count }: CountType): void {
    this.namespaceData[namespace].resultsCount = count
  }

  @Mutation
  setNextPageUrl({ namespace, nextPageUrl }: NextPageUrlType): void {
    this.namespaceData[namespace].resultsNextPage = nextPageUrl
  }

  @Mutation
  setPreviousPageUrl({ namespace, previousPageUrl }: PreviousPageUrlType): void {
    this.namespaceData[namespace].resultsPreviousPages = previousPageUrl
  }

  @Mutation
  setTotalPages({ namespace, totalPages }: TotalPagesType): void {
    this.namespaceData[namespace].resultsTotalPages = totalPages
  }

  @Mutation
  setCurrentPageNumber({ namespace, pageNumber }: CurrentPageNumberType): void {
    this.namespaceData[namespace].currentPageNumber = pageNumber
  }

  @Mutation
  setCurrentQuery({ namespace, queryParams }: CurrentQueryType): void {
    this.namespaceData[namespace].currentQuery = queryParams
  }

  @Mutation
  setShowNextButton({ namespace, showNextButton }: ShowNextButtonType): void {
    this.namespaceData[namespace].showNextButton = showNextButton
  }

  @Mutation
  setShowPreviousButton({ namespace, showPreviousButton }: ShowPreviousButtonType): void {
    this.namespaceData[namespace].showPreviousButton = showPreviousButton
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
  async buildPaginatedApiUrl(data: {
    params: PaginationModel
    namespace: PaginationNamespaceTypesEnum
  }): Promise<string> {
    const baseUrl = '/Api/v1'
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
    return ApiUrl
  }

  @Action
  async fetchPaginatedResults<T>(data: {
    params: PaginationModel
    namespace: PaginationNamespaceTypesEnum
  }): Promise<void | AxiosResponse<Partial<PaginatedModel<T>>>> {
    await store.commit('App/setLoading', true)

    const ApiUrl = await this.context.dispatch('buildPaginatedApiUrl', data)

    return session({
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
        return response
      })
      .catch((e: Error) => {
        this.context.commit('unsetResults', data.namespace)
        console.log(e)
      })
      .finally(() => store.commit('App/setLoading', false))
  }
}
