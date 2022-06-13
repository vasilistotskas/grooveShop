<template>
  <div class="page-search mt-8 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="container">
      <div class="content-min-height">
        <div class="col-12 mb-3 mt-3">
          <h2 class="is-size-5 has-text-grey">
            All Products
          </h2>
        </div>

        <Pagination
          v-if="Object.keys(allPaginatedResults).length !== 0"
          :endpoint-url="'products/all'"
          :max-visible-buttons="3"
          :route="PaginationRoutesEnum.ALL_PRODUCTS"
          :total-pages="allPaginatedResultsTotalPages"
          :namespace="paginationNamespace"
        />

        <div class="product-listing-grid mt-3 mb-3">
          <ProductCard
            v-for="product in allPaginatedResults"
            :key="product.id"
            :product="product"
            class="grid-item"
          />
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
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import { PaginationRoutesEnum } from '@/state/pagination/Enum/PaginationRoutesEnum'
import { PaginationNamespaceDataEnum } from '@/state/pagination/Enum/PaginationNamespaceDataEnum'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'

@Component({
  name: 'AllProducts',
  extends: PaginationBase,
  components: {
    ProductCard,
    Pagination,
    Breadcrumbs
  }
})

export default class AllProducts extends PaginationBase<ProductModel> implements PaginatedInterface<ProductModel> {

  paginationNamespace = PaginationNamespaceDataEnum.ALL_PRODUCTS
  PaginationRoutesEnum = PaginationRoutesEnum

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  async created(): Promise<void> {
    document.title = 'All Products'

    if (this.params.query) {
      await store.commit('pagination/setCurrentQuery', { currentQuery: this.params.query, namespace: this.paginationNamespace })
    }

    await store.commit('pagination/setCurrentPageNumber', { pageNumber: 1, namespace: this.paginationNamespace })

    if (this.params.page) {
      await store.commit('pagination/setCurrentPageNumber', { pageNumber: Number(this.params.page), namespace: this.paginationNamespace })
    }

    await this.fetchPaginationData()

  }

  async unmounted(): Promise<void> {
    store.commit('pagination/unsetResults', this.paginationNamespace)
  }

  async fetchPaginationData(): Promise<void> {
    const paginationQuery = PaginationQueryParametersModel
      .createPaginationQuery({
        'pageNumber': this.currentPageNumber,
        'endpointUrl': 'products/all',
        'method': ApiBaseMethods.GET
      } )

    await store.dispatch('pagination/fetchPaginatedResults', { params: paginationQuery, namespace: this.paginationNamespace })
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Product/AllProducts"

</style>