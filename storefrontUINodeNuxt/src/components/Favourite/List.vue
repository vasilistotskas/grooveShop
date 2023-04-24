<script lang="ts" setup>
import { PropType } from 'vue'
import { Favourite } from '~/zod/product/favourite'

const props = defineProps({
	favourites: {
		type: Array as PropType<Favourite[]>,
		required: true
	}
})

const { t } = useLang()
</script>

<template>
	<div class="favourite__list">
		<slot class="header"></slot>
		<slot>
			<ul class="favourite__list__body">
				<template v-for="favourite in favourites" :key="favourite.id">
					<ProductCard
						v-if="typeof favourite.product !== 'number'"
						:product="favourite.product"
						:show-add-to-cart-button="false"
						:img-width="120"
						:img-height="150"
					/>
				</template>
			</ul>
		</slot>
		<slot class="footer"></slot>
	</div>
</template>

<style lang="scss" scoped>
.favourite__list {
	width: 100%;
	display: grid;
	align-items: start;
	&__body {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(4, 1fr);
		@media screen and (max-width: 1199px) {
			grid-template-columns: repeat(3, 1fr);
		}
		@media screen and (max-width: 991px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media screen and (max-width: 767px) {
			grid-template-columns: repeat(1, 1fr);
		}
	}
}
</style>
