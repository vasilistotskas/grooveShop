import { useBreadcrumbsStore } from '~/stores/global/breadcrumbs'
import { BreadCrumbsObject } from '~/zod/global/breadcrumbs'

export default defineNuxtRouteMiddleware((to, from) => {
	const { $i18n } = useNuxtApp()
	const config = useRuntimeConfig()
	const defaultLocale = config.public.i18n.defaultLocale
	const breadcrumbStore = useBreadcrumbsStore()
	const fullPath = to.fullPath
	const paths = fullPath.split('/').filter((path) => path !== '')
	const breadCrumbs: BreadCrumbsObject = new BreadCrumbsObject()
	let path = ''
	breadCrumbs.parent = {
		text: $i18n.t(`routes.home`),
		link: '/'
	}
	paths.forEach((pathItem, idx) => {
		path += `/${pathItem}`
		pathItem = pathItem.split('?')[0]
		breadCrumbs.children.push({
			text: $i18n.t(`routes.${pathItem}`),
			link: path
		})
	})
	breadcrumbStore.setBreadcrumbs(breadCrumbs)
	return breadcrumbStore.setStructuredData($i18n.locale.value, defaultLocale)
})
