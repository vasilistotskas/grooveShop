<script lang="ts" setup>
import { PropType } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { FieldContext, useField, useForm } from 'vee-validate'
import { Review } from '~/zod/product/review'
import { GlobalEvents } from '~/events/global'
import { Product } from '~/zod/product/product'
import { Account } from '~/zod/user/account'

const starSvg =
	'<path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" class=""></path>'
const starHalfSvg =
	'<path fill="currentColor" d="M288 0c-11.4 0-22.8 5.9-28.7 17.8L194 150.2 47.9 171.4c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.1 23 46 46.4 33.7L288 439.6V0z" class=""></path>'

const props = defineProps({
	existingReview: {
		type: Object as PropType<Review>,
		required: false,
		default: undefined
	},
	userHadReviewed: {
		type: Boolean as PropType<boolean | null>,
		required: false,
		default: null
	},
	product: {
		type: Object as PropType<Product>,
		required: true
	},
	user: {
		type: Object as PropType<Account>,
		required: false,
		default: undefined
	},
	isAuthenticated: {
		type: Boolean,
		required: false,
		default: false
	}
})

const { t } = useLang()
const toast = useToast()
const swal = useSwal()

const editingLocked = ref(false)
const reviewCountMax = ref(10)
const starCountMax = ref(5)
const isEditable = ref(false)
const newSelectionRatio = ref(0)
const selectedRatio = ref(0)
const ratingBoard = ref<HTMLElement | null>(null)

const reviewButtonText = computed(() => {
	if (!props.userHadReviewed) {
		return t('components.product.review.write_review')
	}
	return t('components.product.review.update_review')
})

const reviewCount = computed(() => {
	if (
		props.existingReview?.rate !== null &&
		!isNaN(props.existingReview?.rate as unknown as number)
	) {
		return Number(props.existingReview?.rate).toFixed(1)
	}
	return null
})

const liveReviewCountRatio = computed(() => {
	let reviewCount = 0
	if (newSelectionRatio.value !== null) {
		reviewCount = newSelectionRatio.value * reviewCountMax.value
	} else if (reviewCount !== null) {
		reviewCount = reviewCount - 0.01
	}
	if (reviewCount > reviewCountMax.value) reviewCount = reviewCountMax.value
	if (reviewCount < 0) reviewCount = 0
	const liveReviewCountRatio = reviewCount / reviewCountMax.value
	return Number(liveReviewCountRatio.toFixed(1)) - 0.04
})

const liveReviewCount = computed(() => {
	return Math.round(Number(liveReviewCountRatio.value.toFixed(2)) * reviewCountMax.value)
})

const reviewScoreText = computed(() => {
	const breakpoints = [
		{
			threshold: 0.2,
			value: t('components.product.review.rating.bad')
		},
		{
			threshold: 0.3,
			value: t('components.product.review.rating.not_that_good')
		},
		{
			threshold: 0.5,
			value: t('components.product.review.rating.meh')
		},
		{
			threshold: 0.6,
			value: t('components.product.review.rating.its_ok')
		},
		{
			threshold: 0.7,
			value: t('components.product.review.rating.good')
		},
		{
			threshold: 0.9,
			value: t('components.product.review.rating.very_good')
		},
		{
			threshold: 1.0,
			value: t('components.product.review.rating.perfect')
		}
	]
	if (
		liveReviewCountRatio.value < 0.01 ||
		(newSelectionRatio === null &&
			(reviewCount.value === null || props.existingReview?.rate === 0))
	) {
		return ''
	}
	const matches = useFilter(
		breakpoints,
		(breakpoint: { threshold: number; value: string }) =>
			breakpoint.threshold - 0.1 <= liveReviewCountRatio.value
	)
	if (undefined !== useLast(matches)) {
		return useLast(matches)?.value
	}
	return useFirst(breakpoints)?.value
})

const foregroundStars = computed(() => {
	if (!values.rate) return []
	const reviewStarRatio = values.rate * 0.099 * starCountMax.value
	if (reviewStarRatio < 0.1) {
		return []
	}
	const stars: string[] = useTimes(Math.round(reviewStarRatio), useConstant(starSvg))
	if (reviewStarRatio % 1 < 0.5) {
		stars.push(starHalfSvg)
	}
	return stars
})

const backgroundStars = computed(() => {
	return useTimes(starCountMax.value, useConstant(starSvg)) as string[]
})

const lockSelection = (event: TouchEvent | MouseEvent) => {
	updateIsEditable(true)
	updateNewSelectionRatio(event)
	selectedRatio.value = newSelectionRatio.value
	updateIsEditable(false)
}

const reLockSelection = () => {
	updateIsEditable(false)
	newSelectionRatio.value = selectedRatio.value
}

const unlockSelection = () => {
	updateIsEditable(true)
}

const updateIsEditable = (newState: boolean) => {
	if (!editingLocked.value) {
		isEditable.value = newState
	}
}

const updateNewSelectionRatio = (event: TouchEvent | MouseEvent) => {
	if (!isEditable.value) {
		return
	}
	const target = ratingBoard.value
	if (!target) return
	let leftBound = 0
	if ('clientX' in event) {
		leftBound = event.clientX - target?.getBoundingClientRect()?.left
	}
	const rightBound =
		target?.getBoundingClientRect()?.right - target?.getBoundingClientRect()?.left
	newSelectionRatio.value = leftBound / rightBound
}

const bus = useEventBus<string>('productReview')

const deleteReviewHandle = () => {
	if (props.isAuthenticated && props.userHadReviewed) {
		swal
			.fire({
				title: t('components.product.review.delete_review'),
				text: t('components.product.review.delete_review_confirm'),
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: t('components.product.review.delete_review_confirm'),
				cancelButtonText: t('components.product.review.delete_review_cancel'),
				customClass: {
					container: 'z-40'
				}
			})
			.then((result) => {
				if (!result.isConfirmed) {
					return
				}
				bus.emit('delete', {
					id: props.existingReview?.id
				})
				setFieldValue('rate', 0)
				setFieldValue('comment', '')
			})
	} else {
		toast.error(t('components.product.review.must_be_logged_in'))
	}
}

const modalBus = useEventBus<string>(GlobalEvents.GENERIC_MODAL)
const openModal = () => {
	if (props.isAuthenticated) {
		modalBus.emit('modal-open-reviewModal')
	} else {
		toast.error(t('components.product.review.must_be_logged_in'))
	}
}
modalBus.on((event: string) => {
	//
})

const ZodReviewSchema = z.object({
	comment: z
		.string()
		.min(10, {
			message: t('components.product.review.validation.comment.min', { min: 10 })
		})
		.max(1000, {
			message: t('components.product.review.validation.comment.max', { max: 1000 })
		}),
	rate: z
		.number()
		.min(1, {
			message: t('components.product.review.validation.rate.min', { min: 1 })
		})
		.max(10, {
			message: t('components.product.review.validation.rate.max', { max: 10 })
		})
})

const validationSchema = toTypedSchema(ZodReviewSchema)
const { values, setFieldValue, handleSubmit, errors, submitCount } = useForm({
	validationSchema,
	initialValues: {
		comment: props.existingReview?.comment || '',
		rate: props.existingReview?.rate || 0
	}
})

const { value: comment }: FieldContext<string> = useField('comment')
const { value: rate }: FieldContext<number> = useField('rate')

const tooManyAttempts = computed(() => {
	return submitCount.value >= 10
})

const onSubmit = handleSubmit((event) => {
	if (props.isAuthenticated) {
		if (!props.userHadReviewed) {
			bus.emit('create', {
				comment: event.comment,
				rate: event.rate,
				productId: props.product?.id,
				userId: props.user?.id,
				status: 'True'
			})
		} else {
			bus.emit('update', {
				id: props.existingReview?.id,
				comment: event.comment,
				rate: event.rate,
				productId: props.product?.id,
				userId: props.user?.id,
				status: 'True'
			})
		}
	} else {
		toast.error(t('components.product.review.must_be_logged_in'))
	}
})

watch(
	() => liveReviewCount.value,
	(to: number | undefined) => {
		if (to !== undefined) {
			setFieldValue('rate', to)
		}
	}
)
</script>

<template>
	<GenericModal
		ref="reviewModal"
		unique-id="reviewModal"
		exit-modal-icon-class="fa fa-times"
		modal-open-trigger-handler-id="modal-open-reviewModal"
		modal-close-trigger-handler-id="modal-close-reviewModal"
		modal-opened-trigger-handler-id="modal-opened-reviewModal"
		modal-closed-trigger-handler-id="modal-closed-reviewModal"
		max-width="700px"
		max-height="100%"
		gap="1rem"
		padding="2rem"
		width="auto"
		height="auto"
		:is-form="true"
		form-id="reviewForm"
		form-name="reviewForm"
		@submit-form="onSubmit"
	>
		<template #header>
			<div class="review_header">
				<!-- eslint-disable vue/no-v-html -->
				<span
					class="review_header__title"
					v-html="
						$t('components.product.review.write_review_for_product', {
							product: product?.name
						})
					"
				></span>
				<!-- eslint-enable -->
				<IconFaSolid:pen />
			</div>
		</template>

		<template #body>
			<div class="review_body">
				<div class="review_body__rating">
					<div class="review_body__rating__title">
						<p>{{ $t('components.product.review.rating.title') }}</p>
					</div>
					<div class="review_body__rating__content">
						<div
							ref="ratingBoard"
							class="rating-board rating-background"
							@click="lockSelection($event)"
							@mouseenter.passive="unlockSelection()"
							@mouseleave.passive="reLockSelection()"
							@mousemove.passive="updateNewSelectionRatio($event)"
							@touchend.passive="reLockSelection()"
							@touchmove.passive="updateNewSelectionRatio($event)"
							@touchstart.passive="unlockSelection()"
						>
							<!-- eslint-disable vue/no-v-html -->
							<svg
								v-for="(star, i) of backgroundStars"
								:key="i"
								aria-hidden="true"
								class="star star-background"
								data-icon="star"
								data-prefix="fas"
								focusable="false"
								role="img"
								viewBox="0 0 576 512"
								xmlns="http://www.w3.org/2000/svg"
								v-html="star"
							/>
							<!-- eslint-enable -->
						</div>
						<div class="rating-board rating-foreground">
							<!-- eslint-disable vue/no-v-html -->
							<svg
								v-for="(star, i) of foregroundStars"
								:key="i"
								aria-hidden="true"
								class="star star-foreground"
								focusable="false"
								role="img"
								viewBox="0 0 576 512"
								xmlns="http://www.w3.org/2000/svg"
								v-html="star"
							/>
							<!-- eslint-enable -->
						</div>
						<span class="px-2">{{ reviewScoreText }}</span>
					</div>
					<span class="review_body__rating__error h-6">{{ errors.rate }}</span>
				</div>

				<div class="review_body__comment">
					<div class="review_body__comment__title">
						<p class="review_body__comment__title__text">
							<label for="comment">{{
								$t('components.product.review.comment.label')
							}}</label>
						</p>
					</div>
					<div class="review_body__comment__content">
						<textarea
							id="comment"
							v-model="comment"
							name="comment"
							class="review_body__comment__content__textarea text-gray-700 dark:text-gray-200 bg-gray-100/[0.8] dark:bg-slate-800/[0.8] border border-gray-200"
							maxlength="10000"
							:placeholder="$t('components.product.review.comment.placeholder')"
							rows="6"
						/>
					</div>
					<span class="review_body__rating__error h-6">{{ errors.comment }}</span>
				</div>

				<input v-model="rate" type="hidden" name="rate" />
			</div>
		</template>
		<template #footer>
			<div class="review_footer">
				<div class="review_footer__content">
					<Button
						v-if="!tooManyAttempts"
						class="review_footer__button"
						:text="reviewButtonText"
						type="input"
						:style="'success'"
					/>
					<Button v-else type="button" disabled>
						{{ $t('components.product.review.too_many_attempts') }}
					</Button>
				</div>
				<div v-if="existingReview" class="review_footer__content">
					<Button
						class="review_footer__button gap-2"
						:text="$t('components.product.review.delete_review')"
						type="button"
						:style="'danger'"
						size="sm"
						@click.prevent="deleteReviewHandle()"
					>
						<template #icon>
							<IconFaSolid:trash />
						</template>
					</Button>
				</div>
			</div>
		</template>
	</GenericModal>
	<Button
		type="button"
		class="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize"
		:text="reviewButtonText"
		@click="openModal"
	>
	</Button>
</template>

<style lang="scss" scoped>
.review {
	&_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		&__title {
			font-size: 1.25rem;
			font-weight: 500;
			line-height: 1.2;
			margin-bottom: 0;
		}
	}
	&_body {
		position: relative;
		display: grid;
		&__rating {
			display: grid;
			gap: 0.5rem;
			&__title {
				font-size: 1.25rem;
				font-weight: 500;
				line-height: 1.2;
				margin-bottom: 0;
			}
			&__content {
				position: relative;
				display: grid;
				grid-template-columns: auto 1fr;
				align-items: center;
			}
			&__error {
				color: #f56565;
				font-size: 0.875rem;
				font-weight: 400;
			}
		}
		&__comment {
			display: grid;
			gap: 0.5rem;
			&__title {
				font-size: 1.25rem;
				font-weight: 500;
				line-height: 1.2;
				margin-bottom: 0;
			}
			&__content {
				position: relative;
				&__textarea {
					width: 100%;
				}
			}
		}
	}
	&_footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		&__content {
			display: grid;
			width: 100%;
		}
		&__button {
			width: 100%;
		}
	}
}
.rating {
	align-items: center;
	display: flex;
	height: 26px;
	position: relative;

	&-background {
		position: relative;
		z-index: 1;
	}

	&-foreground {
		pointer-events: none;
		position: absolute;
		z-index: 2;
	}

	&-board {
		align-content: center;
		align-items: center;
		display: inline-flex;
		flex-direction: row;
		flex-wrap: nowrap;
		height: 26px;
		justify-content: flex-start;
		left: 0;
		top: 0;
	}
}
.star {
	cursor: pointer;
	height: 26px;
	width: 26px;

	&-foreground {
		color: #f68b24;
	}

	&-background {
		color: #e2e8f0;
	}
}
</style>
