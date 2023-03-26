import { useBreadcrumbsStore } from '~/stores/global/breadcrumbs'
import { BreadCrumbsObject } from '~/zod/global/breadcrumbs'

export default defineNuxtRouteMiddleware((to, from) => {
	const { $i18n } = useNuxtApp()
	const config = useRuntimeConfig()
	const defaultLocale = config.public.i18n.defaultLocale
	const breadcrumbStore = useBreadcrumbsStore()
	const breadCrumbs: BreadCrumbsObject = new BreadCrumbsObject({
		parent: {
			text: $i18n.t(`routes.home`),
			link: '/'
		},
		children: [
			{
				text: $i18n.t(`routes.products`),
				link: '/products'
			},
			{
				text: String(to.params.slug),
				link: `/product/${to.params.id}/${to.params.slug}`
			}
		]
	})
	breadcrumbStore.setBreadcrumbs(breadCrumbs)
	return breadcrumbStore.setStructuredData($i18n.locale.value, defaultLocale)
})
