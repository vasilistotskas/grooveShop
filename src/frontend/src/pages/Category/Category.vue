<template>
  <div class="page-category mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="container">
      <div class="content-min-height">
        <div class="col-12">
          <GrooveImage
            v-if="category.category_menu_main_banner_absolute_url"
            :alt="category.name"
            :file-name="category.category_menu_main_banner_filename"
            :use-media-stream="true"
            :img-type="ImageTypeOptions.CATEGORIES"
            :img-width="1920"
            :img-height="370"
            :img-fit="ImageFitOptions.cover"
            :img-position="ImagePositionOptions.entropy"
          />
        </div>

        <Pagination
          v-if="Object.keys(allPaginatedResults).length !== 0"
          :endpoint-url="buildEndPointUrlForPaginatedResults()"
          :max-visible-buttons="3"
          :route="PaginationRoutesEnum.CATEGORY"
          :total-pages="allPaginatedResultsTotalPages"
          :namespace="paginationNamespace"
        />

        <div class="product-listing-grid mt-3 mb-3">
          <ProductCard v-for="product in allPaginatedResults" :key="product.id" :product="product" class="col-sm-3" />
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
import CategoryModel from '@/state/category/CategoryModel'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import ProductCard from '@/components/Product/ProductCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import GrooveImage from '@/components/Utilities/GrooveImage.vue'
import { RouteLocationNormalized, RouteParams } from 'vue-router'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import PaginationBase from '@/components/Pagination/PaginationBase'
import { PaginationModel } from '@/state/pagination/Model/PaginationModel'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import { PaginationRoutesEnum } from '@/state/pagination/Enum/PaginationRoutesEnum'
import { PaginationNamespaceTypesEnum } from '@/state/pagination/Enum/PaginationNamespaceTypesEnum'
import { ImageFitOptions, ImagePositionOptions, ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Component({
  name: 'Category',
  extends: PaginationBase,
  components: {
    ProductCard,
    Breadcrumbs,
    Pagination,
    GrooveImage,
  },
  props: {
    category_slug: String,
  },
})
export default class Category extends PaginationBase<ProductModel> implements PaginatedInterface<ProductModel> {
  formEl = document.getElementById('burgerButton') as HTMLFormElement
  ImageTypeOptions = ImageTypeOptions
  ImageFitOptions = ImageFitOptions
  ImagePositionOptions = ImagePositionOptions
  paginationNamespace = PaginationNamespaceTypesEnum.CATEGORY_PRODUCTS

  PaginationRoutesEnum = PaginationRoutesEnum

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: (data: RouteParams) => Array<BreadcrumbItemInterface> = router.currentRoute.value.meta.breadcrumb as () => Array<BreadcrumbItemInterface>
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get category(): CategoryModel {
    return store.getters['category/getCategory']
  }

  async created(): Promise<void> {
    document.title = this.$route.params.category_slug + ' Category'
    this.$watch(
      () => this.$route,
      (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        if (to.name === 'Category') {
          this.fetchCategory()
          this.fetchPaginationData()
        }
        if (to.path !== from.path && to.name === 'Category') {
          store.commit('pagination/unsetResults', this.paginationNamespace)
          this.formEl.classList.toggle('opened')
          this.formEl.setAttribute('aria-expanded', this.formEl.classList.contains('opened') as unknown as string)
          store.commit('app/setNavbarMenuHidden', true)
        }
      }
    )

    this.formEl.classList.remove('opened')
    this.formEl.setAttribute('aria-expanded', this.formEl.classList.contains('opened') as unknown as string)
    store.commit('app/setNavbarMenuHidden', true)

    if (this.params.query) {
      await store.commit('pagination/setCurrentQuery', { currentQuery: this.params.query, namespace: this.paginationNamespace })
    }

    await store.commit('pagination/setCurrentPageNumber', { pageNumber: 1, namespace: this.paginationNamespace })

    if (this.params.page) {
      await store.commit('pagination/setCurrentPageNumber', { pageNumber: Number(this.params.page), namespace: this.paginationNamespace })
    }

    await this.fetchCategory()
    await this.fetchPaginationData()
  }

  unmounted(): void {
    store.commit('pagination/unsetResults', this.paginationNamespace)
    this.formEl.classList.remove('opened')
    this.formEl.setAttribute('aria-expanded', this.formEl.classList.contains('opened') as unknown as string)
  }

  public fetchCategory(): void {
    const categoryId = this.$route.params.category_slug
    store.dispatch('category/fetchCategoryFromRemote', categoryId)
  }

  async fetchPaginationData(): Promise<void> {
    const paginationQuery = PaginationModel.createPaginationQuery({
      pageNumber: this.currentPageNumber,
      endpointUrl: this.buildEndPointUrlForPaginatedResults(),
      method: ApiBaseMethods.GET,
    })

    await store.dispatch('pagination/fetchPaginatedResults', { params: paginationQuery, namespace: this.paginationNamespace })
  }

  public buildEndPointUrlForPaginatedResults(): string {
    const categoryId = this.$route.params.category_slug
    return 'category_products' + `/${categoryId}`
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/Category/Category';
</style>
