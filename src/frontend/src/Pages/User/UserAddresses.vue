<template>
	<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
	<RouterLink
		:to="{ name: 'NewAddress' }"
		aria-label="NewAddress"
		class="nav-link"
		title="NewAddress"
	>
		<span>NewAddress</span>
	</RouterLink>
	<div
		v-if="allPaginatedResults && Object.keys(allPaginatedResults).length > 0"
		class="container"
	>
		<div class="product-listing-grid mb-4">
			<AddressCard
				v-for="address in allPaginatedResults"
				:key="address.id"
				:address="address"
				class="grid-item"
			/>
		</div>
		<Pagination
			v-if="Object.keys(allPaginatedResults).length !== 0"
			:endpoint-url="'addresses'"
			:max-visible-buttons="3"
			:route="PaginationRoutesEnum.ADDRESSES"
			:total-pages="allPaginatedResultsTotalPages"
			:namespace="paginationNamespace"
		/>
	</div>
	<div v-else class="user_profile-no-data">
		<h1>NO ADDRESSES</h1>
	</div>
</template>

<script lang="ts">
import router from '@/Routes'
import { useMeta } from 'vue-meta'
import { AxiosResponse } from 'axios'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import AddressModel from '@/State/Address/AddressModel'
import UserModule from '@/State/User/Profile/UserModule'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import AddressCard from '@/Components/Address/AddressCard.vue'
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
	name: 'UserAddresses',
	extends: PaginatedComponent,
	components: {
		Breadcrumbs,
		Pagination,
		AddressCard
	}
})
export default class UserAddresses
	extends PaginatedComponent<AddressModel>
	implements PaginatedComponentInterface<AddressModel>
{
	userModule = getModule(UserModule)
	PaginationRoutesEnum = PaginationRoutesEnum
	paginationNamespace = PaginationNamespaceTypesEnum.ADDRESS
	MainRouteNames = MainRouteNames

	meta = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: `${this.userModule.getUserData?.first_name} ${this.userModule.getUserData?.last_name} | Addresses`,
				description: `${this.userModule.getUserData?.first_name} ${this.userModule.getUserData?.last_name} | Addresses`
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

		this.fetchPaginationData<AddressModel>()
	}

	fetchPaginationData<T>(): Promise<void | AxiosResponse<Partial<PaginatedModel<T>>>> {
		const paginationQuery = PaginationModel.createPaginationModel({
			pageNumber: this.currentPageNumber,
			endpointUrl: 'address',
			method: ApiBaseMethods.GET
		})

		return this.paginationModule.fetchPaginatedResults({
			params: paginationQuery,
			namespace: this.paginationNamespace
		})
	}

	get breadCrumbPath() {
		return router.currentRoute.value.meta.breadcrumb
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/User/UserAddresses';
</style>
