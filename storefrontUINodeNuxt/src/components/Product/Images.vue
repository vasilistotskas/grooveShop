<script lang="ts" setup>
import { FetchError } from 'ofetch'
import { PropType } from 'vue'
import { Product } from '~/zod/product/product'
import { Image } from '~/zod/product/image'
import { Pagination } from '~/zod/pagination/pagination'

const props = defineProps({
	product: {
		type: Object as PropType<Product>,
		required: true
	},
	productImages: {
		type: Object as PropType<Pagination<Image>>,
		required: true
	},
	pending: {
		type: Boolean,
		required: true
	},
	error: {
		type: Object as PropType<FetchError | null>,
		required: false,
		default: null
	}
})

const mainImage = computed(() => {
	const images = props.productImages?.results || []
	return images.find((image) => image.isMain)
})

const { resolveImageFileExtension } = useImageResolver()

const imageId = useState<number>(`${props.product?.uuid}-imageID`, () => {
	return mainImage.value?.id || props.productImages?.results[0]?.id || 0
})
</script>

<template>
	<div class="grid">
		<div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
			<div
				v-for="(productImage, index) in productImages?.results"
				v-show="imageId === productImage.id"
				:key="index"
				class="product-images-main grid h-64 md:h-80 rounded-lg bg-gray-100 mb-4 items-center justify-center"
				:class="{
					'main-image': imageId === productImage.id
				}"
			>
				<nuxt-img
					preload
					placeholder
					loading="lazy"
					provider="mediaStream"
					class="h-64 md:h-80 rounded-lg bg-gray-100 flex items-center justify-center"
					:style="{ objectFit: 'contain' }"
					:width="592"
					:height="350"
					:fit="'contain'"
					:position="'entropy'"
					:background="'transparent'"
					:trim-threshold="5"
					:format="resolveImageFileExtension(productImage.productImageFilename)"
					sizes="sm:100vw md:50vw lg:592px"
					:src="
						`media/uploads/products/${productImage.productImageFilename}` ||
						'/assets/images/placeholder.png'
					"
					:alt="product?.name || ''"
				/>
			</div>
		</div>

		<div
			v-if="productImages?.results.length > 1"
			class="product-images-others flex -mx-2 mb-4"
		>
			<template v-for="(productImage, index) in productImages?.results" :key="index">
				<div class="flex-1 px-2">
					<button
						:class="{
							'ring-2 ring-indigo-300 ring-inset': imageId === productImage.id
						}"
						type="button"
						class="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center"
						@click="imageId = productImage.id"
					>
						<nuxt-img
							preload
							placeholder
							loading="lazy"
							provider="mediaStream"
							:style="{ objectFit: 'contain' }"
							:width="278"
							:height="128"
							:fit="'contain'"
							:position="'entropy'"
							:background="'transparent'"
							:trim-threshold="5"
							:format="resolveImageFileExtension(productImage.productImageFilename)"
							sizes="sm:100vw md:50vw lg:278px"
							:src="
								`media/uploads/products/${productImage.productImageFilename}` ||
								'/assets/images/placeholder.png'
							"
							:alt="product?.name || ''"
						/>
					</button>
				</div>
			</template>
		</div>
	</div>
</template>
