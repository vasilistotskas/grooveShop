<template>
	<div>
		<div
			v-if="allPaginatedResults && Object.keys(allPaginatedResults).length > 0"
			class="container"
		>
			<div class="user-reviews-grid mb-4">
				<ReviewProductCard
					v-for="review in allPaginatedResults"
					:key="review.id"
					:class="{
						'current-user-review-card':
							review.userprofile.id === userModule.getUserData.id
					}"
					:review="review"
					:user-id="userModule.getUserData.id"
					class="product-review-main-card"
				/>
			</div>
			<Pagination
				v-if="Object.keys(allPaginatedResults).length !== 0"
				:endpoint-url="buildEndPointUrlForPaginatedResults()"
				:max-visible-buttons="3"
				:route="PaginationRoutesEnum.REVIEWS"
				:total-pages="allPaginatedResultsTotalPages"
				:namespace="paginationNamespace"
			/>
		</div>
		<div v-else class="user_profile-no-data">
			<h1>NO REVIEWS</h1>
		</div>
	</div>
</template>

<script lang="ts">
import { useMeta } from 'vue-meta'
import { AxiosResponse } from 'axios'
import { computed } from '@vue/runtime-core'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/State/User/Profile/UserModule'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import Pagination from '@/Components/Pagination/Pagination.vue'
import { Options as Component, setup } from 'vue-class-component'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import ProductReviewModel from '@/State/Product/Review/ProductReviewModel'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import ReviewProductCard from '@/Components/Reviews/ReviewProductCard.vue'
import PaginatedComponent from '@/Components/Pagination/PaginatedComponent'
import ProductReviewModule from '@/State/Product/Review/ProductReviewModule'
import { PaginationRoutesEnum } from '@/State/Pagination/Enum/PaginationRoutesEnum'
import PaginatedComponentInterface from '@/State/Pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
	name: 'UserReviews',
	extends: PaginatedComponent,
	components: {
		ReviewProductCard,
		Pagination
	}
})
export default class UserReviews
	extends PaginatedComponent<ProductReviewModel>
	implements PaginatedComponentInterface<ProductReviewModel>
{
	userModule = getModule(UserModule)
	productReviewModule = getModule(ProductReviewModule)
	PaginationRoutesEnum = PaginationRoutesEnum
	paginationNamespace = PaginationNamespaceTypesEnum.USER_REVIEWS

	meta = setup(() => {
		const meta = useMeta(
			computed(() => ({
				title: `${this.userModule.getUserData?.first_name} ${this.userModule.getUserData?.last_name} | Reviews`,
				description: `${this.userModule.getUserData?.first_name} ${this.userModule.getUserData?.last_name} | Reviews`
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

		this.productReviewModule.fetchCurrentUserReviews(this.userModule.getUserData.id)
		this.fetchPaginationData<ProductReviewModel>()
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
		const userId = this.userModule.getUserData.id
		return `reviews/user/${userId}`
	}
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Pages/User/UserReviews';
</style>
