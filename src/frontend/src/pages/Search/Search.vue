<template>
  <div class="page-search mt-8 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="container">
      <div class="content-min-height">
        <div class="col-12 mb-3 mt-3">
          <h2 class="is-size-5 has-text-grey">Search term: "{{ currentPageQuery.query }}"</h2>
        </div>

        <Pagination
          v-if="Object.keys(allPaginatedResults).length !== 0"
          :endpoint-url="'search-product'"
          :max-visible-buttons="3"
          :route="PaginationRoutesEnum.SEARCH"
          :total-pages="allPaginatedResultsTotalPages"
          :namespace="paginationNamespace"
        />

        <div class="product-listing-grid mt-3 mb-3">
          <ProductCard v-for="product in allPaginatedResults" :key="product.id" :product="product" class="grid-item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import router from '@/routes'
import ProductModel from '@/state/product/ProductModel'
import { Options as Component } from 'vue-class-component'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import ProductCard from '@/components/Product/ProductCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import PaginationBase from '@/components/Pagination/PaginationBase'
import { PaginationModel } from '@/state/pagination/Model/PaginationModel'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import { PaginationRoutesEnum } from '@/state/pagination/Enum/PaginationRoutesEnum'
import { PaginationNamespaceTypesEnum } from '@/state/pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
  name: 'Search',
  extends: PaginationBase,
  components: {
    ProductCard,
    Pagination,
    Breadcrumbs,
  },
})
export default class Search extends PaginationBase<ProductModel> implements PaginatedInterface<ProductModel> {
  query: string | null = ''
  PaginationRoutesEnum = PaginationRoutesEnum
  paginationNamespace = PaginationNamespaceTypesEnum.SEARCH_PRODUCTS

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  async mounted(): Promise<void> {
    document.title = 'Search'

    if (this.params.query) {
      store.commit('pagination/setCurrentQuery', { currentQuery: this.params, namespace: this.paginationNamespace })
    }

    await store.commit('pagination/setCurrentPageNumber', { pageNumber: 1, namespace: this.paginationNamespace })

    if (this.params.page) {
      store.commit('pagination/setCurrentPageNumber', { pageNumber: Number(this.params.page), namespace: this.paginationNamespace })
    }

    await this.fetchPaginationData()
  }

  async unmounted(): Promise<void> {
    store.commit('pagination/unsetResults', this.paginationNamespace)
  }

  async fetchPaginationData(): Promise<void> {
    const paginationQuery = PaginationModel.createPaginationQuery({
      pageNumber: this.currentPageNumber,
      endpointUrl: `search-product`,
      queryParams: this.currentPageQuery,
      method: ApiBaseMethods.GET,
    })

    await store.dispatch('pagination/fetchPaginatedResults', { params: paginationQuery, namespace: this.paginationNamespace })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Search/Search';
</style>
