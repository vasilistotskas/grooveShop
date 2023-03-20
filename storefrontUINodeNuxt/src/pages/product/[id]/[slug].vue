<script lang="ts" setup>
import { useProductStore } from '~/stores/product/product'
import { capitalize } from '~/utils/str'

const route = useRoute()
const config = useRuntimeConfig()
const store = useProductStore()

const fullPath = config.public.baseUrl + route.fullPath
const productId = route.params.id

const { pending, refresh } = await useAsyncData('product', () =>
	store.fetchProduct(productId)
)
const { product, error } = storeToRefs(store)

const productTitle = computed(() => {
	return capitalize(product.value?.seoTitle || product.value?.name || '')
})

const imageFilename = computed(() => {
	if (!product.value?.mainImageFilename) return undefined
	return product.value.mainImageFilename.split('.').slice(0, -1).join('.')
})
const resolveImageFileExtension = computed(() => {
	if (!product.value?.mainImageFilename) return undefined
	return product.value.mainImageFilename.split('.').pop()
})

const image = ref(1)
const selectorQuantity = ref(1)

definePageMeta({
	middleware: ['product', 'product-breadcrumbs'],
	layout: 'page'
})
const i18nHead = useLocaleHead({
	addDirAttribute: true,
	addSeoAttributes: true,
	identifierAttribute: 'id'
})
useHead(() => ({
	title: productTitle.value,
	htmlAttrs: {
		lang: i18nHead.value.htmlAttrs!.lang
	},
	meta: [
		{
			name: 'description',
			content: product.value?.seoDescription || ''
		},
		{
			name: 'keywords',
			content: product.value?.seoKeywords || ''
		},
		{
			property: 'og:title',
			content: product.value?.seoTitle || ''
		},
		{
			property: 'og:description',
			content: product.value?.seoDescription || ''
		},
		{
			property: 'og:image',
			content: ''
		},
		{
			property: 'og:url',
			content: fullPath
		},
		{
			property: 'og:type',
			content: 'website'
		},
		{
			property: 'og:site_name',
			content: 'Groove Shop'
		},
		{
			property: 'twitter:card',
			content: 'summary_large_image'
		},
		{
			property: 'twitter:title',
			content: product.value?.seoTitle || ''
		},
		{
			property: 'twitter:description',
			content: product.value?.seoDescription || ''
		},
		{
			property: 'twitter:image',
			content: ''
		},
		{
			property: 'twitter:url',
			content: fullPath
		}
	]
}))
</script>

<template>
	<PageWrapper class="flex flex-col">
		<PageBody>
			<PageError v-if="error" :error="error"></PageError>
			<LoadingSkeleton
				:loading="pending"
				:class="pending ? 'block' : 'hidden'"
			></LoadingSkeleton>
			<div class="product">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
					<div class="grid grid-cols-2 gap-2">
						<div class="md:flex-1 px-4">
							<div class="grid">
								<div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
									<nuxt-img
										v-show="image === 1"
										preload
										placeholder
										loading="lazy"
										provider="mediaStream"
										class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
										:width="592"
										:height="320"
										:fit="'contain'"
										:position="'entropy'"
										:background="'transparent'"
										:trim-threshold="5"
										:format="resolveImageFileExtension"
										sizes="sm:100vw md:50vw lg:592px"
										:src="
											`media/uploads/products/${imageFilename}` ||
											'/images/placeholder.png'
										"
										:alt="product?.name"
									/>

									<div
										v-show="image === 2"
										class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
									>
										<span class="text-5xl">2</span>
									</div>

									<div
										v-show="image === 3"
										class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
									>
										<span class="text-5xl">3</span>
									</div>

									<div
										v-show="image === 4"
										class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
									>
										<span class="text-5xl">4</span>
									</div>
								</div>

								<div class="flex -mx-2 mb-4">
									<template v-for="i in 4" :key="i">
										<div class="flex-1 px-2">
											<button
												:class="{ 'ring-2 ring-indigo-300 ring-inset': image === i }"
												class="focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center"
												@click="image = i"
											>
												<span class="text-2xl" v-text="i"></span>
											</button>
										</div>
									</template>
								</div>
							</div>
						</div>
						<div class="md:flex-1 px-4">
							<h2
								class="mb-2 leading-tight tracking-tight font-bold text-gray-700 dark:text-gray-200 text-2xl md:text-3xl"
							>
								{{ product.name }}
							</h2>
							<p class="text-gray-700 dark:text-gray-200 text-sm">
								By <a href="#" class="text-indigo-600 hover:underline">ABC Company</a>
							</p>

							<div class="flex items-center space-x-4 my-4">
								<div>
									<div class="rounded-lg bg-gray-100 flex py-2 px-3">
										<span class="text-indigo-400 mr-1 mt-1">$</span>
										<span class="font-bold text-indigo-600 text-3xl">{{
											product.finalPrice
										}}</span>
									</div>
								</div>
								<div class="flex-1">
									<p class="text-green-500 text-xl font-semibold">
										Save {{ product.priceSavePercent }}%
									</p>
									<p class="text-gray-700 dark:text-gray-200 text-sm">
										Inclusive of all Taxes.
									</p>
								</div>
							</div>

							<p
								class="text-gray-700 dark:text-gray-200"
								v-text="product.description"
							></p>

							<div class="flex py-4 space-x-4">
								<div class="relative">
									<div
										class="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-700 dark:text-gray-200 tracking-wide font-semibold"
									>
										Qty
									</div>
									<select
										v-model="selectorQuantity"
										class="text-gray-700 dark:text-gray-200 cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1"
									>
										<option
											v-for="i in product.stock"
											:key="i"
											class="text-gray-700 dark:text-gray-200"
											:value="i"
											:selected="i === selectorQuantity"
										>
											{{ i }}
										</option>
									</select>

									<svg
										class="w-5 h-5 text-gray-700 dark:text-gray-200 absolute right-0 bottom-0 mb-2 mr-2"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 9l4-4 4 4m0 6l-4 4-4-4"
										/>
									</svg>
								</div>

								<AddToCartButton
									:product="product"
									:quantity="selectorQuantity"
									:text="$t('components.product.card.add_to_cart')"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageBody>
	</PageWrapper>
</template>
