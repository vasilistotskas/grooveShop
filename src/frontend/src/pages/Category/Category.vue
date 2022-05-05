<template>
  <div class="page-category mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="container">
      <div class="content-min-height">
        <div class="col-12">
          <img
            v-if="category.category_menu_main_banner_absolute_url"
            :alt="category.name"
            :src="mediaStreamImage(ImageTypeOptions.CATEGORIES, category.category_menu_main_banner_filename, '1920', '370', ImageFitOptions.cover, ImagePositionOptions.entropy)"
            class="img-fluid"
            height="370"
            width="1920"
            loading="lazy"
          >
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
          <ProductCard
            v-for="product in allPaginatedResults"
            :key="product.id"
            :product="product"
            class="col-sm-3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import store from '@/store'
import router from '@/routes'
import { Options } from 'vue-class-component'
import ProductModel from '@/state/product/ProductModel'
import CategoryModel from '@/state/category/CategoryModel'
import { ApiBaseMethods } from '@/api/Enums/ApiBaseMethods'
import ProductCard from '@/components/Product/ProductCard.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import ImageUrlModel from '@/helpers/MediaStream/ImageUrlModel'
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue'
import PaginationBase from '@/components/Pagination/PaginationBase'
import ImageUrlInterface from '@/helpers/MediaStream/ImageUrlInterface'
import BreadcrumbItemInterface from '@/routes/Interface/BreadcrumbItemInterface'
import PaginatedInterface from '@/state/pagination/Interface/PaginatedInterface'
import { PaginationRoutesEnum } from '@/state/pagination/Enum/PaginationRoutesEnum'
import { PaginationNamespaceDataEnum } from '@/state/pagination/Enum/PaginationNamespaceDataEnum'
import { PaginationQueryParametersModel } from '@/state/pagination/Model/PaginationQueryParametersModel'
import { ImageFitOptions, ImagePositionOptions, ImageTypeOptions } from '@/helpers/MediaStream/ImageUrlEnum'

@Options({
  name: 'Category',
  extends: PaginationBase,
  components: {
    ProductCard,
    Breadcrumbs,
    Pagination
  },
  props: {
    category_slug: String
  }
})

export default class Category extends PaginationBase<ProductModel> implements PaginatedInterface<ProductModel> {

  formEl = document.getElementById('burgerButton') as HTMLFormElement
  ImageTypeOptions = ImageTypeOptions
  ImageFitOptions = ImageFitOptions
  ImagePositionOptions = ImagePositionOptions
  paginationNamespace = PaginationNamespaceDataEnum.CATEGORY_PRODUCTS

  imageUrl: string = ''
  PaginationRoutesEnum = PaginationRoutesEnum

  get breadCrumbPath(): Array<BreadcrumbItemInterface> {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get category(): CategoryModel {
    return store.getters['category/getCategory']
  }

  async created(): Promise<void> {

    document.title = this.$route.params.category_slug + ' Category'

    this.$watch(
        () => this.$route,
        (to: any, from: any) => {
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

    if (this.params.get('query')) {
      await store.commit('pagination/setCurrentQuery', { currentQuery: this.params.get('query'), namespace: this.paginationNamespace })
    }

    await store.commit('pagination/setCurrentPageNumber', { pageNumber: 1, namespace: this.paginationNamespace })

    if (this.params.get('page')) {
      await store.commit('pagination/setCurrentPageNumber', { pageNumber: Number(this.params.get('page')), namespace: this.paginationNamespace })
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

    const paginationQuery: PaginationQueryParametersModel = PaginationQueryParametersModel
      .createPaginationQuery({
        'pageNumber': this.currentPageNumber,
        'endpointUrl': this.buildEndPointUrlForPaginatedResults(),
        'method': ApiBaseMethods.GET
      } )

    await store.dispatch('pagination/fetchPaginatedResults', { params: paginationQuery, namespace: this.paginationNamespace })
  }

  public buildEndPointUrlForPaginatedResults(): string {
    const categoryId = this.$route.params.category_slug
    return 'category_products' + `/${ categoryId }`
  }

  public mediaStreamImage(
      imageType: string,
      imageName: string,
      width?: string,
      height?: string,
      fit?: ImageFitOptions,
      position?: ImagePositionOptions,
      trimThreshold?: number
  ): string | (() => string) {
    const mediaStreamImageData: ImageUrlInterface = {
      'imageType': imageType,
      'imageName': imageName,
      'width': width,
      'height': height,
      'fit': fit,
      'position': position,
      'trimThreshold': trimThreshold
    }

    const imageModel = new ImageUrlModel(mediaStreamImageData)

    imageModel.buildMediaStreamImageUrl()
        .then((finalUrl: string) => {
          this.imageUrl = finalUrl
        })

    return this.imageUrl

  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/Category/Category"

</style>