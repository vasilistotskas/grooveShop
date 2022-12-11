<template>
	<div
		v-if="allPaginatedResults && Object.keys(allPaginatedResults).length > 0"
		class="user-order-history"
	>
		<div v-for="order in allPaginatedResults" :key="order.id" class="mb-4">
			<h3 class="is-size-4 mb-3">Order #{{ order.id }}</h3>
			<div class="box">
				<div class="card">
					<UserOrderHistoryContainer :order="order" class="col-sm-3" />
				</div>
			</div>
		</div>
		<Pagination
			v-if="Object.keys(allPaginatedResults).length !== 0"
			:endpoint-url="'orders'"
			:max-visible-buttons="3"
			:route="PaginationRoutesEnum.ORDERS"
			:total-pages="allPaginatedResultsTotalPages"
			:namespace="paginationNamespace"
		/>
	</div>
	<div v-else class="user_profile-no-data">
		<h1>NO ORDERS</h1>
	</div>
</template>

<script lang="ts">
import { useMeta } from 'vue-meta'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/State/User/Profile/UserModule'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import UserOrderModel from '@/State/User/Order/UserOrderModel'
import Pagination from '@/Components/Pagination/Pagination.vue'
import { Options as Component, setup } from 'vue-class-component'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import UserFavouriteModel from '@/State/User/Favourite/UserFavouriteModel'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import PaginatedComponent from '@/Components/Pagination/PaginatedComponent'
import { PaginationRoutesEnum } from '@/State/Pagination/Enum/PaginationRoutesEnum'
import UserOrderHistoryContainer from '@/Components/User/UserOrderHistoryContainer.vue'
import PaginatedComponentInterface from '@/State/Pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
	name: 'UserOrderHistory',
	extends: PaginatedComponent,
	components: {
		Pagination,
		UserOrderHistoryContainer
	}
})
export default class UserOrderHistory
	extends PaginatedComponent<UserOrderModel>
	implements PaginatedComponentInterface<UserOrderModel>
{
	userModule = getModule(UserModule, this.$store)
	PaginationRoutesEnum = PaginationRoutesEnum
	paginationNamespace = PaginationNamespaceTypesEnum.USER_ORDER_HISTORY

	myContext = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: `${this.userModule.getUserProfile?.first_name} ${this.userModule.getUserProfile?.last_name} | Order History`,
				description: `${this.userModule.getUserProfile?.first_name} ${this.userModule.getUserProfile?.last_name} | Order History`
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
			endpointUrl: `orders`,
			method: ApiBaseMethods.GET
		})

		return this.paginationModule.fetchPaginatedResults({
			params: paginationQuery,
			namespace: this.paginationNamespace
		})
	}
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Pages/User/UserOrderHistory.scss';
</style>
