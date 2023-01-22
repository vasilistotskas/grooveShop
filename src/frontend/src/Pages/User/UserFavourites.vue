<template>
	<div
		v-if="allPaginatedResults && Object.keys(allPaginatedResults).length > 0"
		class="container"
	>
		<div class="product-listing-grid mb-4">
			<ProductCard
				v-for="product in allPaginatedResults"
				:key="product.product_object.id"
				:product="product.product_object"
				class="grid-item"
			/>
		</div>
		<Pagination
			v-if="Object.keys(allPaginatedResults).length !== 0"
			:endpoint-url="buildEndPointUrlForPaginatedResults()"
			:max-visible-buttons="3"
			:route="PaginationRoutesEnum.FAVOURITES"
			:total-pages="allPaginatedResultsTotalPages"
			:namespace="paginationNamespace"
		/>
	</div>
	<div v-else class="user_profile-no-data">
		<h1>NO FAVOURITES</h1>
	</div>
</template>

<script lang="ts">
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/State/User/Account/UserModule'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import ProductCard from '@/Components/Product/ProductCard.vue'
import Pagination from '@/Components/Pagination/Pagination.vue'
import { Options as Component, setup } from 'vue-class-component'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import UserFavouriteModel from '@/State/User/Favourite/UserFavouriteModel'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import PaginatedComponent from '@/Components/Pagination/PaginatedComponent'
import { PaginationRoutesEnum } from '@/State/Pagination/Enum/PaginationRoutesEnum'
import PaginatedComponentInterface from '@/State/Pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
	name: 'UserFavourites',
	extends: PaginatedComponent,
	components: {
		ProductCard,
		Pagination
	}
})
export default class UserFavourites
	extends PaginatedComponent<UserFavouriteModel>
	implements PaginatedComponentInterface<UserFavouriteModel>
{
	userModule = getModule(UserModule)
	PaginationRoutesEnum = PaginationRoutesEnum
	paginationNamespace = PaginationNamespaceTypesEnum.USER_FAVOURITES

	myContext = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: `${this.userModule.getUserAccount?.first_name} ${this.userModule.getUserAccount?.last_name} | Favourites`,
				description: `${this.userModule.getUserAccount?.first_name} ${this.userModule.getUserAccount?.last_name} | Favourites`
			}))
		)
		return {
			meta
		}
	})

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

		this.fetchPaginationData<UserFavouriteModel>()
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
		const userId = this.userModule.getUserAccount.id
		return 'favourites/products' + `/${userId}`
	}
}
</script>
<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/User/UserSettings.scss';
</style>
