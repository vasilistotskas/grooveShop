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
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import ProductModel from '@/State/Product/ProductModel'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import ProductCard from '@/Components/Product/ProductCard.vue'
import Pagination from '@/Components/Pagination/Pagination.vue'
import { Options as Component, setup } from 'vue-class-component'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import PaginatedComponent from '@/Components/Pagination/PaginatedComponent'
import { PaginationRoutesEnum } from '@/State/Pagination/Enum/PaginationRoutesEnum'
import PaginatedComponentInterface from '@/State/Pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
	name: 'AllProducts',
	extends: PaginatedComponent,
	components: {
		ProductCard,
		Pagination,
		Breadcrumbs
	}
})
export default class AllProducts
	extends PaginatedComponent<ProductModel>
	implements PaginatedComponentInterface<ProductModel>
{
	paginationNamespace = PaginationNamespaceTypesEnum.ALL_PRODUCTS
	PaginationRoutesEnum = PaginationRoutesEnum
	MainRoutePaths = MainRoutePaths

	myContext = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: 'Products',
				description: 'Products'
			}))
		)
		return { meta }
	})

	get breadCrumbPath() {
		return router.currentRoute.value.meta.breadcrumb
	}

	created(): void {
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

		this.fetchPaginationData<ProductModel>()
	}

	fetchPaginationData<T>(): Promise<void | PaginatedModel<T>> {
		const paginationQuery = PaginationModel.createPaginationModel({
			pageNumber: this.currentPageNumber,
			endpointUrl: MainRoutePaths.ALL_PRODUCTS,
			method: ApiBaseMethods.GET
		})

		return this.paginationModule.fetchPaginatedResults({
			params: paginationQuery,
			namespace: this.paginationNamespace
		})
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/Product/AllProducts.scss';
</style>
