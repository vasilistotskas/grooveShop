<script lang="ts" setup>
import { PropType } from 'vue'
import { Review } from '~/zod/product/review'

const props = defineProps({
	review: {
		type: Object as PropType<Review>,
		required: true
	}
})

const userName = computed(() => {
	if (typeof props.review?.user === 'number') return 'Anonymous'
	if (!props.review?.user?.firstName && !props.review?.user?.lastName) return 'Anonymous'
	return props.review?.user?.firstName + ' ' + props.review?.user?.lastName
})

const userAccount = computed(() => {
	if (typeof props.review?.user === 'number') return undefined
	return props.review?.user
})
</script>

<template>
	<div class="reviews_list__item__content">
		<div class="reviews_list__item__content__header">
			<div class="reviews_list__item__content__header__user">
				<div class="reviews_list__item__content__header__user__avatar">
					<UserAvatar :user-account="userAccount" />
				</div>
				<div class="reviews_list__item__content__header__user__name">
					<span>{{ userName }}</span>
				</div>
			</div>
			<div class="reviews_list__item__content__header__rate">
				<Rating :rate="review.rate" />
			</div>
		</div>
		<div class="reviews_list__item__content__body">
			<div class="reviews_list__item__content__body__comment">
				<span>{{ review.comment }}</span>
			</div>
		</div>
		<div class="reviews_list__item__content__footer">
			<div class="reviews_list__item__content__footer__date">
				<span>{{ review.createdAt }}</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.reviews_list__item__content {
	&__header {
		display: grid;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		@media screen and (min-width: 768px) {
			display: flex;
		}
		&__user {
			display: flex;
			align-items: center;
			&__avatar {
				margin-right: 1rem;
			}
			&__name {
				font-weight: 600;
			}
		}
		&__rate {
			font-size: 1.5rem;
		}
	}
	&__body {
		&__comment {
			font-size: 1.2rem;
		}
	}
	&__footer {
		display: flex;
		justify-content: flex-end;
		&__date {
			font-size: 0.8rem;
		}
	}
}
</style>
