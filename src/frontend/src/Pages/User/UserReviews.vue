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
					:class="{ 'current-user-review-card': review.user_id === userId }"
					:review="review"
					:user-id="userId"
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
import { PropType } from 'vue'
import { AxiosResponse } from 'axios'
import { getModule } from 'vuex-module-decorators'
import UserModule from '@/State/User/Profile/UserModule'
import { Options as Component } from 'vue-class-component'
import { ApiBaseMethods } from '@/Api/Enums/ApiBaseMethods'
import Pagination from '@/Components/Pagination/Pagination.vue'
import PaginationModule from '@/State/Pagination/PaginationModule'
import UserProfileModel from '@/State/User/Profile/UserProfileModel'
import PaginatedModel from '@/State/Pagination/Model/PaginatedModel'
import ProductReviewModel from '@/State/Product/Review/ProductReviewModel'
import { PaginationModel } from '@/State/Pagination/Model/PaginationModel'
import ReviewProductCard from '@/Components/Reviews/ReviewProductCard.vue'
import PaginatedComponent from '@/Components/Pagination/PaginatedComponent'
import { PaginationRoutesEnum } from '@/State/Pagination/Enum/PaginationRoutesEnum'
import PaginatedComponentInterface from '@/State/Pagination/Interface/PaginatedComponentInterface'
import { PaginationNamespaceTypesEnum } from '@/State/Pagination/Enum/PaginationNamespaceTypesEnum'

@Component({
	name: 'UserReviews',
	extends: PaginatedComponent,
	components: {
		ReviewProductCard,
		Pagination
	},
	props: {
		userData: {
			type: Object as PropType<UserProfileModel>,
			required: true
		}
	}
})
export default class UserReviews
	extends PaginatedComponent<ProductReviewModel>
	implements PaginatedComponentInterface<ProductReviewModel>
{
	userModule = getModule(UserModule)
	paginationModule = getModule<PaginationModule<ProductReviewModel>>(PaginationModule)
	userData = new UserProfileModel()
	PaginationRoutesEnum = PaginationRoutesEnum
	paginationNamespace = PaginationNamespaceTypesEnum.USER_REVIEWS

	get userId(): number | undefined {
		return this.userModule.getUserId
	}

	created(): void {
		document.title = 'My Reviews'

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
		const userId = this.userData.id
		return `reviews/user/${userId}`
	}
}
</script>

<style lang="scss">
@import '@/Assets/Styles/Pages/User/UserReviews';
</style>
