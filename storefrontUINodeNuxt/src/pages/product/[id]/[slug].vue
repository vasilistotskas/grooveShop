<script lang="ts" setup>
import { isClient } from '@vueuse/shared'
import { useShare } from '@vueuse/core'
import { useProductStore } from '~/stores/product/product'
import { capitalize } from '~/utils/str'
import { useImagesStore } from '~/stores/product/images'
import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user/user'

const route = useRoute()
const config = useRuntimeConfig()
const productStore = useProductStore()
const productImagesStore = useImagesStore()
const authStore = useAuthStore()
const userStore = useUserStore()
const { t } = useLang()

const fullPath = config.public.baseUrl + route.fullPath
const productId = route.params.id
const isAuthenticated = authStore.isAuthenticated

const { account, favourites } = storeToRefs(userStore)

const { pending: productPending } = await useAsyncData('product', () =>
	productStore.fetchProduct(productId)
)
const { product, error: productError } = storeToRefs(productStore)

const { pending: productImagesPending } = await useAsyncData('productImages', () =>
	productImagesStore.fetchImages({ product: String(productId) })
)

const { images: productImages, error: productImagesError } =
	storeToRefs(productImagesStore)

const productTitle = computed(() => {
	return capitalize(product.value?.seoTitle || product.value?.name || '')
})
const selectorQuantity = ref(1)
const productUrl = computed(() => {
	if (!product.value) return ''
	return `/product/${product.value.id}/${product.value.slug}`
})

const shareOptions = ref({
	title: product.value?.name,
	text: product.value?.description || '',
	url: isClient ? productUrl : ''
})
const { share, isSupported } = useShare(shareOptions)
const startShare = () => share().catch((err) => err)
const productInUserFavourites = computed(() => {
	if (!product.value) return false
	return userStore.getIsProductInFavourites(product.value.id)
})

const userToProductFavourite = computed(() => {
	if (!product.value) return null
	return userStore.getUserToProductFavourite(product.value.id)
})

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
			<PageError v-if="productError" :error="productError"></PageError>
			<LoadingSkeleton
				:loading="productPending"
				:class="productPending ? 'block' : 'hidden'"
			></LoadingSkeleton>
			<template v-if="product">
				<div class="product">
					<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
						<div class="grid grid-cols-2 gap-2">
							<div class="md:flex-1 px-4">
								<ProductImages
									:product="product"
									:product-images="productImages"
									:pending="productImagesPending"
									:error="productImagesError"
								></ProductImages>
							</div>
							<div class="grid gap-6 px-4 items-center content-center">
								<h2
									class="leading-tight tracking-tight font-bold text-gray-700 dark:text-gray-200 text-2xl md:text-3xl"
								>
									{{ product.name }}
								</h2>
								<div class="actions h-6 flex gap-4">
									<ClientOnly>
										<Button
											:disabled="!isSupported"
											:text="
												isSupported
													? $t('pages.product.share')
													: $t('pages.product.share_not_supported')
											"
											size="xs"
											class="font-extrabold capitalize"
											@click="startShare"
										/>
									</ClientOnly>
									<AddToFavouriteButton
										:product-id="product.id"
										:user-id="account?.id"
										:is-favourite="productInUserFavourites"
										:favourite="userToProductFavourite"
										:is-authenticated="isAuthenticated"
									/>
								</div>
								<h3 class="text-gray-700 dark:text-gray-200 text-sm">
									<span>{{ t('pages.product.product_id') }}: </span>
									<span class="text-indigo-600 hover:underline">{{ product.id }}</span>
								</h3>

								<div class="flex items-center gap-4">
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
											{{ t('pages.product.save') }} {{ product.priceSavePercent }}%
										</p>
										<p class="text-gray-700 dark:text-gray-200 text-sm">
											{{ t('pages.product.inclusive_of_taxes') }}
										</p>
									</div>
								</div>
								<ReadMore :text="product.description || ''" :max-chars="100"></ReadMore>
								<div class="flex space-x-4">
									<div class="relative">
										<div
											class="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-700 dark:text-gray-200 tracking-wide font-semibold"
										>
											<label for="quantity">{{ t('pages.product.qty') }}</label>
										</div>
										<select
											id="quantity"
											v-model="selectorQuantity"
											class="bg-gray-100/[0.8] dark:bg-slate-800/[0.8] text-gray-700 dark:text-gray-200 cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1"
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
										v-if="product"
										:product="product"
										:quantity="selectorQuantity"
										:text="$t('pages.product.add_to_cart')"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</PageBody>
	</PageWrapper>
</template>
