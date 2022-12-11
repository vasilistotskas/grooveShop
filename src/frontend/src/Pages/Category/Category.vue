<template>
	<div v-if="categoryModule.getCategory" class="page-category mt-7 mb-5">
		<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
		<div class="container">
			<div class="content-min-height">
				<div class="col-12">
					<GrooveImage
						v-if="categoryModule.getCategory.category_menu_main_banner_absolute_url"
						:alt="categoryModule.getCategory.name"
						:file-name="categoryModule.getCategory.category_menu_main_banner_filename"
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
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import AppModule from '@/State/App/AppModule'
import { getModule } from 'vuex-module-decorators'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import GrooveImage from '@/Utilities/GrooveImage.vue'
import ProductModel from '@/State/Product/ProductModel'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import CategoryModule from '@/State/Category/CategoryModule'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import ProductCard from '@/Components/Product/ProductCard.vue'
import Pagination from '@/Components/Pagination/Pagination.vue'
import { Options as Component, setup } from 'vue-class-component'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import PaginatedComponent from '@/Components/Pagination/PaginatedComponent'
import { RouteMetaBreadcrumbFunction } from '@/Routes/Type/BreadcrumbItemType'
import { PaginationRoutesEnum } from '@/State/Pagination/Enum/PaginationRoutesEnum'
import PaginatedComponentInterface from '@/State/Pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'
import { useStore } from 'vuex'

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
	router = useRouter()
	categoryModule = getModule(CategoryModule, this.$store)
	appModule = getModule(AppModule, this.$store)
	formEl = document.getElementById('burgerButton') as HTMLFormElement
	ImageTypeOptions = ImageTypeOptions
	ImageFitOptions = ImageFitOptions
	ImagePositionOptions = ImagePositionOptions
	paginationNamespace = PaginationNamespaceTypesEnum.CATEGORY_PRODUCTS
	PaginationRoutesEnum = PaginationRoutesEnum

	myContext = setup(() => {
		const store = useStore()
		const categoryModule = getModule(CategoryModule, store)

		// @TODO THIS NOT WORKING MUST FETCH IN HERE
		const meta = useMeta(
			computed(() => ({
				title: categoryModule.getCategory?.name,
				description: categoryModule.getCategory?.description
			}))
		)
		return { meta }
	})

	get breadCrumbPath() {
		const currentRouteMetaBreadcrumb = this.router.currentRoute.value.meta
			.breadcrumb as RouteMetaBreadcrumbFunction
		return currentRouteMetaBreadcrumb(this.router.currentRoute.value.params)
	}

	created(): void {
		this.$watch(
			() => this.$route,
			(to: RouteLocationNormalized, from: RouteLocationNormalized) => {
				if (to.name === MainRouteNames.CATEGORY) {
					this.fetchPaginationData<ProductModel>()
				}
				if (to.path !== from.path && to.name === MainRouteNames.CATEGORY) {
					this.paginationModule.unsetResults(this.paginationNamespace)
					this.formEl?.classList.toggle('opened')
					this.formEl?.setAttribute(
						'aria-expanded',
						this.formEl?.classList.contains('opened') as unknown as string
					)
					this.appModule.setNavbarMenuHidden(true)
				}
			}
		)

		this.formEl?.classList.remove('opened')
		this.formEl?.setAttribute(
			'aria-expanded',
			this.formEl?.classList.contains('opened') as unknown as string
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

		const categorySlug = this.$route.params.category_slug
		this.categoryModule.fetchCategoryFromRemote(categorySlug)

		this.fetchPaginationData<ProductModel>()
	}

	unmounted(): void {
		this.paginationModule.unsetResults(this.paginationNamespace)
		this.formEl?.classList.remove('opened')
		this.formEl?.setAttribute(
			'aria-expanded',
			this.formEl?.classList.contains('opened') as unknown as string
		)
	}

	fetchPaginationData<T>(): Promise<void | PaginatedModel<T>> {
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
@import '@/Assets/Styles/Pages/Category/Category.scss';
</style>
