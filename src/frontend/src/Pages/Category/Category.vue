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
import {
	ImageFitOptions,
	ImagePositionOptions,
	ImageTypeOptions
} from '@/Helpers/MediaStream/ImageUrlEnum'
import router from '@/Routes'
import { AxiosResponse } from 'axios'
import AppModule from '@/State/App/AppModule'
import { getModule } from 'vuex-module-decorators'
import { RouteLocationNormalized } from 'vue-router'
import ProductModel from '@/State/Product/ProductModel'
import { Options as Component } from 'vue-class-component'
import CategoryModel from '@/State/Category/CategoryModel'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import CategoryModule from '@/State/Category/CategoryModule'
import ProductCard from '@/Components/Product/ProductCard.vue'
import Pagination from '@/Components/Pagination/Pagination.vue'
import GrooveImage from '@/Components/Utilities/GrooveImage.vue'
import PaginationModule from '@/State/Pagination/PaginationModule'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import PaginatedComponent from '@/Components/Pagination/PaginatedComponent'
import { RouteMetaBreadcrumbFunction } from '@/Routes/Type/BreadcrumbItemType'
import { PaginationRoutesEnum } from '@/State/Pagination/Enum/PaginationRoutesEnum'
import PaginatedComponentInterface from '@/State/Pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
	name: 'Category',
	extends: PaginatedComponent,
	components: {
		ProductCard,
		Breadcrumbs,
		Pagination,
		GrooveImage
	},
	props: {
		category_slug: String
	}
})
export default class Category
	extends PaginatedComponent<ProductModel>
	implements PaginatedComponentInterface<ProductModel>
{
	categoryModule = getModule(CategoryModule)
	appModule = getModule(AppModule)
	paginationModule = getModule<PaginationModule<ProductModel>>(PaginationModule)
	formEl = document.getElementById('burgerButton') as HTMLFormElement
	ImageTypeOptions = ImageTypeOptions
	ImageFitOptions = ImageFitOptions
	ImagePositionOptions = ImagePositionOptions
	paginationNamespace = PaginationNamespaceTypesEnum.CATEGORY_PRODUCTS

	PaginationRoutesEnum = PaginationRoutesEnum

	get breadCrumbPath() {
		const currentRouteMetaBreadcrumb = router.currentRoute.value.meta
			.breadcrumb as RouteMetaBreadcrumbFunction
		return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
	}

	get category(): CategoryModel {
		return this.categoryModule.getCategory
	}

	created(): void {
		document.title = this.$route.params.category_slug + ' Category'
		this.$watch(
			() => this.$route,
			(to: RouteLocationNormalized, from: RouteLocationNormalized) => {
				if (to.name === 'Category') {
					this.fetchCategory()
					this.fetchPaginationData<ProductModel>()
				}
				if (to.path !== from.path && to.name === 'Category') {
					this.paginationModule.unsetResults(this.paginationNamespace)
					this.formEl.classList.toggle('opened')
					this.formEl.setAttribute(
						'aria-expanded',
						this.formEl.classList.contains('opened') as unknown as string
					)
					this.appModule.setNavbarMenuHidden(true)
				}
			}
		)

		this.formEl.classList.remove('opened')
		this.formEl.setAttribute(
			'aria-expanded',
			this.formEl.classList.contains('opened') as unknown as string
		)
		this.appModule.setNavbarMenuHidden(true)

		if (this.params.query) {
			this.paginationModule.setCurrentQuery({
				queryParams: this.params.query,
				namespace: this.paginationNamespace
			})
		}

		this.paginationModule.setCurrentPageNumber({
			pageNumber: 1,
			namespace: this.paginationNamespace
		})

		if (this.params.page) {
			this.paginationModule.setCurrentPageNumber({
				pageNumber: Number(this.params.page),
				namespace: this.paginationNamespace
			})
		}

		this.fetchCategory()
		this.fetchPaginationData<ProductModel>()
	}

	unmounted(): void {
		this.paginationModule.unsetResults(this.paginationNamespace)
		this.formEl.classList.remove('opened')
		this.formEl.setAttribute(
			'aria-expanded',
			this.formEl.classList.contains('opened') as unknown as string
		)
	}

	public fetchCategory(): void {
		const categoryId = this.$route.params.category_slug
		this.categoryModule.fetchCategoryFromRemote(categoryId as string)
	}

	fetchPaginationData<T>(): Promise<void | AxiosResponse<Partial<PaginatedModel<T>>>> {
		const paginationQuery = PaginationModel.createPaginationModel({
			pageNumber: this.currentPageNumber,
			endpointUrl: this.buildEndPointUrlForPaginatedResults(),
			method: ApiBaseMethods.GET
		})

		return this.paginationModule.fetchPaginatedResults({
			params: paginationQuery,
			namespace: this.paginationNamespace
		})
	}

	public buildEndPointUrlForPaginatedResults(): string {
		const categoryId = this.$route.params.category_slug
		return 'category_products' + `/${categoryId}`
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Category/Category';
</style>
