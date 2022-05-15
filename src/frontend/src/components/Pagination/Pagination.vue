<template>
  <div class="col-12 mb-3 mt-3 pagination-grid-content">
    <div class="pagination-buttons">
      <button
        :disabled="isInFirstPage"
        aria-label="Go to first page"
        class="btn-outline-primary-one"
        title="Go to first page"
        type="button"
        @click="onClickFirstPage"
      >
        First
      </button>

      <button
        :disabled="isInFirstPage"
        aria-label="Go to previous page"
        class="btn-outline-primary-one"
        title="Go to previous page"
        type="button"
        @click="onClickPreviousPage"
      >
        Previous
      </button>

      <button
        v-for="page in pages"
        :key="page.id"
        :aria-label="`Go to page number ${page.name}`"
        :class="{ active: isPageActive(page.name) }"
        :disabled="page.isDisabled"
        :title="`Go to page number ${page.name}`"
        class="btn-outline-primary-one"
        type="button"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>

      <button
        :disabled="isInLastPage"
        aria-label="Go to next page"
        class="btn-outline-primary-one"
        title="Go to next page"
        type="button"
        @click="onClickNextPage"
      >
        Next
      </button>

      <button
        :disabled="isInLastPage"
        aria-label="Go to last page"
        class="btn-outline-primary-one"
        title="Go to Last page"
        type="button"
        @click="onClickLastPage"
      >
        Last
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import { Options, Vue } from 'vue-class-component'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import { PaginationNamespaceDataEnum } from '@/state/pagination/Enum/PaginationNamespaceDataEnum'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'

@Options({
  name: 'Pagination',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    endpointUrl: {
      type: String,
      required: true
    },
    routerReplace: {
      type: Boolean,
      default: true,
      required: false
    },
    namespace: {
      type: String,
      default: false,
      required: true
    }
  }
})

export default class Pagination extends Vue {

  query: any
  uri = window.location.search.substring(1)
  params = router.currentRoute.value.query
  maxVisibleButtons!: number
  totalPages!: number
  route!: string
  endpointUrl!: string
  routerReplace!: boolean
  namespace!: typeof PaginationNamespaceDataEnum

  get startPage(): number {
    if (this.currentPageNumber === 1) {
      return 1
    }
    if (this.currentPageNumber === this.totalPages) {
      if (this.totalPages - this.maxVisibleButtons + 1 === 0) {
        return 1
      }
      return this.totalPages - this.maxVisibleButtons + 1
    }
    return this.currentPageNumber - 1
  }

  get endPage(): number {
    return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages)
  }

  get pages(): any {
    const range = []

    let endPageNumber: number
    if (this.totalPages < this.maxVisibleButtons) {
      endPageNumber = this.totalPages
    } else {
      endPageNumber = this.endPage
    }

    for (let i = this.startPage; i <= endPageNumber; i += 1) {
      range.push({
        name: i,
        isDisabled: this.currentPageNumber === i
      })
    }

    return range
  }

  get isInFirstPage(): boolean {
    return this.currentPageNumber === 1
  }

  get isInLastPage(): boolean {
    return this.currentPageNumber === this.totalPages
  }

  get currentPageNumber(): number {
    return store.getters['pagination/getCurrentPageNumber'](this.namespace)
  }

  get currentPageQuery(): string {
    return store.getters['pagination/getCurrentQuery'](this.namespace)
  }

  async mounted(): Promise<void> {
    await this.initializeRouterQuery()
  }

  async updated(): Promise<void> {
    await this.initializeRouterQuery()
  }

  public isPageActive(page: number): boolean {
    return this.currentPageNumber === page
  }

  async onClickNextPage(): Promise<void> {
    await store.commit('pagination/setCurrentPageNumber', { pageNumber: this.currentPageNumber + 1, namespace: this.namespace })

    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
        .createPaginationQuery({
          'pageNumber': this.currentPageNumber,
          'endpointUrl': `${ this.endpointUrl }`,
          'queryParams': this.currentPageQuery,
          'method': ApiBaseMethods.GET
        } )

    await store.dispatch('pagination/fetchPaginatedResults', { params: paginationQuery, namespace: this.namespace })

    if (this.routerReplace) await router.replace({ name: `${ this.route }`, query: this.query })
  }

  async onClickPreviousPage(): Promise<void> {
    await store.commit('pagination/setCurrentPageNumber', { pageNumber: this.currentPageNumber - 1, namespace: this.namespace })

    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
        .createPaginationQuery({
          'pageNumber': this.currentPageNumber,
          'endpointUrl': `${ this.endpointUrl }`,
          'queryParams': this.currentPageQuery,
          'method': ApiBaseMethods.GET
        } )

    await store.dispatch('pagination/fetchPaginatedResults', { params: paginationQuery, namespace: this.namespace })

    if (this.routerReplace) await router.replace({ name: `${ this.route }`, query: this.query })
  }

  async onClickPage(pageNumber: number) {
    await store.commit('pagination/setCurrentPageNumber', { pageNumber: pageNumber, namespace: this.namespace })

    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
        .createPaginationQuery({
          'pageNumber': pageNumber,
          'endpointUrl': `${ this.endpointUrl }`,
          'queryParams': this.currentPageQuery,
          'method': ApiBaseMethods.GET
        } )

    await store.dispatch('pagination/fetchPaginatedResults', { params: paginationQuery, namespace: this.namespace })

    if (this.routerReplace) await router.replace({ name: `${ this.route }`, query: this.query })
  }

  async onClickFirstPage(): Promise<void> {
    await store.commit('pagination/setCurrentPageNumber', { pageNumber: 1, namespace: this.namespace })

    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
        .createPaginationQuery({
          'pageNumber': this.currentPageNumber,
          'endpointUrl': `${ this.endpointUrl }`,
          'queryParams': this.currentPageQuery,
          'method': ApiBaseMethods.GET
        } )

    await store.dispatch('pagination/fetchPaginatedResults', { params: paginationQuery, namespace: this.namespace })

    if (this.routerReplace) await router.replace({ name: `${ this.route }`, query: this.query })
  }

  async onClickLastPage(): Promise<void> {
    await store.commit('pagination/setCurrentPageNumber', { pageNumber: this.totalPages, namespace: this.namespace })

    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
        .createPaginationQuery({
          'pageNumber': this.totalPages,
          'endpointUrl': `${ this.endpointUrl }`,
          'queryParams': this.currentPageQuery,
          'method': ApiBaseMethods.GET
        } )

    await store.dispatch('pagination/fetchPaginatedResults', { params: paginationQuery, namespace: this.namespace })

    if (this.routerReplace) await router.replace({ name: `${ this.route }`, query: this.query })
  }

  public initializeRouterQuery(): void {
    if (this.params.query) {
      this.query = { ...this.$route.query, 'query': this.params.query, 'page': this.currentPageNumber }
    } else {
      this.query = { ...this.$route.query, 'page': this.currentPageNumber }
    }
  }

}

</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Pagination/Pagination"

</style>