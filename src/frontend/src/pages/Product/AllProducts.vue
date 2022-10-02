<template>
  <div class="page-search mt-8 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="container">
      <div class="content-min-height">
        <div class="col-12 mb-3 mt-3">
          <h2 class="is-size-5 has-text-grey">All Products</h2>
        </div>

        <Pagination
          v-if="Object.keys(allPaginatedResults).length !== 0"
          :endpoint-url="MainRoutePaths.ALL_PRODUCTS"
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
import router from '@/routes'
import { AxiosResponse } from 'axios'
import { getModule } from 'vuex-module-decorators'
import ProductModel from '@/state/product/ProductModel'
import { Options as Component } from 'vue-class-component'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import { MainRoutePaths } from '@/routes/Enum/MainRoutePaths'
import ProductCard from '@/components/Product/ProductCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import PaginationModule from '@/state/pagination/PaginationModule'
import PaginatedModel from '@/state/pagination/Model/PaginatedModel'
import { PaginationModel } from '@/state/pagination/Model/PaginationModel'
import PaginatedComponent from '@/components/Pagination/PaginatedComponent'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import { PaginationRoutesEnum } from '@/state/pagination/Enum/PaginationRoutesEnum'
import PaginatedComponentInterface from '@/state/pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/state/pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
  name: 'AllProducts',
  extends: PaginatedComponent,
  components: {
    ProductCard,
    Pagination,
    Breadcrumbs,
  },
})
export default class AllProducts
  extends PaginatedComponent<ProductModel>
  implements PaginatedComponentInterface<ProductModel>
{
  paginationModule = getModule<PaginationModule<ProductModel>>(PaginationModule)
  paginationNamespace = PaginationNamespaceTypesEnum.ALL_PRODUCTS
  PaginationRoutesEnum = PaginationRoutesEnum
  MainRoutePaths = MainRoutePaths

  get breadCrumbPath() {
    return router.currentRoute.value.meta.breadcrumb
  }

  created(): void {
    document.title = 'All Products'

    if (this.params.query) {
      this.paginationModule.setCurrentQuery({
        queryParams: this.params.query,
        namespace: this.paginationNamespace,
      })
    }

    this.paginationModule.setCurrentPageNumber({
      pageNumber: 1,
      namespace: this.paginationNamespace,
    })

    if (this.params.page) {
      this.paginationModule.setCurrentPageNumber({
        pageNumber: Number(this.params.page),
        namespace: this.paginationNamespace,
      })
    }

    this.fetchPaginationData<ProductModel>()
  }

  fetchPaginationData<T>(): Promise<void | AxiosResponse<Partial<PaginatedModel<T>>>> {
    const paginationQuery = PaginationModel.createPaginationModel({
      pageNumber: this.currentPageNumber,
      endpointUrl: 'products/all',
      method: ApiBaseMethods.GET,
    })

    return this.paginationModule.fetchPaginatedResults({
      params: paginationQuery,
      namespace: this.paginationNamespace,
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Product/AllProducts';
</style>
