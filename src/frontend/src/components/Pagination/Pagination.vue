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
        :key="page.number"
        :aria-label="`Go to page number ${page.number}`"
        :class="{ active: isPageActive(page.number) }"
        :disabled="page.isDisabled"
        :title="`Go to page number ${page.number}`"
        class="btn-outline-primary-one"
        type="button"
        @click="onClickPage(page.number)"
      >
        {{ page.number }}
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
import router from '@/routes'
import { LocationQueryValue } from 'vue-router'
import { getModule } from 'vuex-module-decorators'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import { Options as Component, Vue } from 'vue-class-component'
import PaginationModule from '@/state/pagination/PaginationModule'
import { QueryParamsType } from '@/state/pagination/Type/PaginationTypes'
import { PaginationModel } from '@/state/pagination/Model/PaginationModel'
import PaginationPageInterface from '@/state/pagination/Interface/PaginationPageInterface'
import { PaginationNamespaceTypesEnum } from '@/state/pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
  name: 'Pagination',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    endpointUrl: {
      type: String,
      required: true,
    },
    routerReplace: {
      type: Boolean,
      default: true,
      required: false,
    },
    namespace: {
      type: String,
      default: false,
      required: true,
    },
  },
})
export default class Pagination extends Vue {
  paginationModule = getModule(PaginationModule)
  query?: Record<string, string | LocationQueryValue[] | number>
  uri = window.location.search.substring(1)
  params = router.currentRoute.value.query
  maxVisibleButtons!: number
  totalPages!: number
  route!: string
  endpointUrl!: string
  routerReplace!: boolean
  namespace!: PaginationNamespaceTypesEnum

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

  get pages(): Array<PaginationPageInterface> {
    const range = []

    let endPageNumber: number
    if (this.totalPages < this.maxVisibleButtons) {
      endPageNumber = this.totalPages
    } else {
      endPageNumber = this.endPage
    }

    for (let i = this.startPage; i <= endPageNumber; i += 1) {
      range.push({
        number: i as never,
        isDisabled: (this.currentPageNumber === i) as never,
      } as never)
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
    return this.paginationModule.getCurrentPageNumber(this.namespace)
  }

  get currentPageQuery(): QueryParamsType {
    return this.paginationModule.getCurrentQuery(this.namespace)
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
    await this.paginationModule.setCurrentPageNumber({
      pageNumber: this.currentPageNumber + 1,
      namespace: this.namespace,
    })

    const paginationQuery = PaginationModel.createPaginationModel({
      pageNumber: this.currentPageNumber,
      endpointUrl: `${this.endpointUrl}`,
      queryParams: this.currentPageQuery,
      method: ApiBaseMethods.GET,
    })

    await this.paginationModule.fetchPaginatedResults({
      params: paginationQuery,
      namespace: this.namespace,
    })

    if (this.routerReplace) await router.replace({ name: `${this.route}`, query: this.query })
  }

  async onClickPreviousPage(): Promise<void> {
    await this.paginationModule.setCurrentPageNumber({
      pageNumber: this.currentPageNumber - 1,
      namespace: this.namespace,
    })

    const paginationQuery = PaginationModel.createPaginationModel({
      pageNumber: this.currentPageNumber,
      endpointUrl: `${this.endpointUrl}`,
      queryParams: this.currentPageQuery,
      method: ApiBaseMethods.GET,
    })

    await this.paginationModule.fetchPaginatedResults({
      params: paginationQuery,
      namespace: this.namespace,
    })

    if (this.routerReplace) await router.replace({ name: `${this.route}`, query: this.query })
  }

  async onClickPage(pageNumber: number) {
    await this.paginationModule.setCurrentPageNumber({
      pageNumber: pageNumber,
      namespace: this.namespace,
    })

    const paginationQuery = PaginationModel.createPaginationModel({
      pageNumber: pageNumber,
      endpointUrl: `${this.endpointUrl}`,
      queryParams: this.currentPageQuery,
      method: ApiBaseMethods.GET,
    })

    await this.paginationModule.fetchPaginatedResults({
      params: paginationQuery,
      namespace: this.namespace,
    })

    if (this.routerReplace) await router.replace({ name: `${this.route}`, query: this.query })
  }

  async onClickFirstPage(): Promise<void> {
    await this.paginationModule.setCurrentPageNumber({
      pageNumber: 1,
      namespace: this.namespace,
    })

    const paginationQuery = PaginationModel.createPaginationModel({
      pageNumber: this.currentPageNumber,
      endpointUrl: `${this.endpointUrl}`,
      queryParams: this.currentPageQuery,
      method: ApiBaseMethods.GET,
    })

    await this.paginationModule.fetchPaginatedResults({
      params: paginationQuery,
      namespace: this.namespace,
    })

    if (this.routerReplace) await router.replace({ name: `${this.route}`, query: this.query })
  }

  async onClickLastPage(): Promise<void> {
    await this.paginationModule.setCurrentPageNumber({
      pageNumber: this.totalPages,
      namespace: this.namespace,
    })

    const paginationQuery = PaginationModel.createPaginationModel({
      pageNumber: this.totalPages,
      endpointUrl: `${this.endpointUrl}`,
      queryParams: this.currentPageQuery,
      method: ApiBaseMethods.GET,
    })

    await this.paginationModule.fetchPaginatedResults({
      params: paginationQuery,
      namespace: this.namespace,
    })

    if (this.routerReplace) await router.replace({ name: `${this.route}`, query: this.query })
  }

  public initializeRouterQuery(): void {
    if (this.params.query) {
      this.query = { ...this.$route.query, query: this.params.query, page: this.currentPageNumber }
    } else {
      this.query = { ...this.$route.query, page: this.currentPageNumber }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Pagination/Pagination';
</style>
