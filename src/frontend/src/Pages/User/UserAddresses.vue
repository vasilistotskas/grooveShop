<template>
	<Breadcrumbs :bread-crumb-path="breadCrumbPath" />
	<RouterLink
		:to="{ name: MainRouteNames.USER_ACCOUNT_ADDRESS_NEW }"
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
			:endpoint-url="'address'"
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
import { useMeta } from 'vue-meta'
import { useRouter } from 'vue-router'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import { Address } from '@/Zod/Address/ZodAddress'
import UserModule from '@/State/User/Profile/UserModule'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import AddressCard from '@/Components/Address/AddressCard.vue'
import Pagination from '@/Components/Pagination/Pagination.vue'
import { UsePagination } from '@/State/Pagination/UsePagination'
import { Options as Component, setup } from 'vue-class-component'
import Breadcrumbs from '@/Components/Breadcrumbs/Breadcrumbs.vue'
import PaginatedComponent from '@/Components/Pagination/PaginatedComponent'
import { PaginationRoutesEnum } from '@/State/Pagination/Enum/PaginationRoutesEnum'
import PaginatedComponentInterface from '@/State/Pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'
import { useStore } from 'vuex'

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
	extends PaginatedComponent<Address>
	implements PaginatedComponentInterface<Address>
{
	router = useRouter()
	userModule = getModule(UserModule, this.$store)
	PaginationRoutesEnum = PaginationRoutesEnum
	paginationNamespace = PaginationNamespaceTypesEnum.ADDRESS
	MainRouteNames = MainRouteNames

	myContext = setup(() => {
		const router = useRouter()
		const store = useStore()
		const userModule = getModule(UserModule, store)
		const routerQueryParams = router.currentRoute.value.query
		const paginationOptions = {
			routerQueryParams: routerQueryParams,
			namespace: PaginationNamespaceTypesEnum.ADDRESS,
			endpointUrl: 'address'
		}
		UsePagination<Address>(paginationOptions)

		const meta = useMeta(
			computed(() => ({
				title: `${userModule.getUserProfile?.first_name} ${userModule.getUserProfile?.last_name} | Addresses`,
				description: `${userModule.getUserProfile?.first_name} ${userModule.getUserProfile?.last_name} | Addresses`
			}))
		)
		return {
			meta
		}
	})

	get breadCrumbPath() {
		return this.router.currentRoute.value.meta.breadcrumb
	}
}
</script>

<style lang="scss" scoped>
@import '@/Assets/Styles/Pages/User/UserAddresses.scss';
</style>
