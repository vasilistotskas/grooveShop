import api from "@/api/api.service"
import ResponseData from "@/state/types/ResponseData"
import ProductModel from "@/state/product/ProductModel"
import AppBaseModule from "@/state/common/AppBaseModule"
import {Module, Action, Mutation} from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class ProductModule
    extends AppBaseModule
{
    results = [new ProductModel()]
    results_count: number = 0
    results_next_page: string = ''
    results_previous_page: string = ''
    results_total_pages: number = 0

    current_page_number: number = 1
    current_query: string = ''

    show_next_button = false
    show_previous_button = false

    get getResultData(): ProductModel[] {
        return this.results
    }

    get getResultCountData(): number {
        return this.results_count
    }

    get getResultNextPageUrl(): string {
        return this.results_next_page
    }

    get getResultPreviousPageUrl(): string {
        return this.results_previous_page
    }

    get getResultTotalPages(): number {
        return this.results_total_pages
    }

    get getCurrentPageNumber(): number {
        return this.current_page_number
    }

    get getCurrentQuery(): string {
        return this.current_query
    }

    get getShowNextButton(): boolean {
        return this.show_next_button
    }

    get getShowPreviousButton(): boolean {
        return this.show_previous_button
    }

    @Mutation
    setSearchResults(data: ProductModel[]): void {
        this.results = data
    }

    @Mutation
    unsetSearchResults(): void {
        this.results = []
        this.results_count = 0

        this.results_next_page = ''
        this.results_previous_page = ''
        this.results_total_pages = 0

        this.current_page_number = 1
        this.current_query = ''

        this.show_next_button = false
        this.show_previous_button = false
    }

    @Mutation
    setSearchCountResults(data: number): void {
        this.results_count = data
    }

    @Mutation
    setSearchNextPageUrl(data: string): void {
        this.results_next_page = data
    }

    @Mutation
    setSearchPreviousPageUrl(data: string): void {
        this.results_previous_page = data
    }

    @Mutation
    setSearchTotalPages(data: number): void {
        this.results_total_pages = data
    }

    @Mutation
    setCurrentPageNumber(data: number): void {
        this.current_page_number = data
    }

    @Mutation
    setCurrentQuery(data: string): void {
        this.current_query = data
    }

    @Mutation
    setShowNextButton(data: boolean): void {
        this.show_next_button = data
    }

    @Mutation
    setShowPreviousButton(data: boolean): void {
        this.show_previous_button = data
    }
    
    @Action
    async getSearchResults(params: any): Promise<void> {

        await api.post(`search/${params.query}?p=${params.page_number}`, params)
            .then((response: ResponseData) => {

                const results_data = response.data.results
                const count_data = response.data.count
                const next_url_data = response.data.links.next
                const previous_url_data = response.data.links.previous
                const total_pages_data = response.data.total_pages

                if (next_url_data) {
                    this.context.commit('setShowNextButton', true)
                } else {
                    this.context.commit('setShowNextButton', false)
                }

                if (previous_url_data) {
                    this.context.commit('setShowPreviousButton', true)
                } else {
                    this.context.commit('setShowPreviousButton', false)
                }

                let results_products = new ProductModel(results_data)

                this.context.commit('setSearchResults', results_products)
                this.context.commit('setSearchCountResults', count_data)
                this.context.commit('setSearchNextPageUrl', next_url_data)
                this.context.commit('setSearchPreviousPageUrl', previous_url_data)
                this.context.commit('setSearchTotalPages', total_pages_data)
            })
            .catch((e: Error) => {
                this.context.commit('unsetSearchResults')
                console.log(e)
            })
    }

}