export default defineNuxtRouteMiddleware(async (to, from) => {
	const nuxtApp = useNuxtApp()

	const product = await $fetch(`/api/product/${to.params.id}`)
	const productSlug = product.slug
	const productId = product.id
	const currentLocale = nuxtApp.$i18n.locale.value
	const defaultLocale = nuxtApp.$i18n.fallbackLocale.value

	if (productSlug !== to.params.slug) {
		if (currentLocale === defaultLocale) {
			const path = `/product/${productId}/${product.slug}`
			return navigateTo(path)
		} else {
			const path = `/${currentLocale}/product/${productId}/${product.slug}`
			return navigateTo(path)
		}
	}
})
