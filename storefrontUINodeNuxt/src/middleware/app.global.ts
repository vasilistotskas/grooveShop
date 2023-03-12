import { useBreadcrumbsStore } from '~/stores/global/breadcrumbs'
import { BreadCrumbsObject } from '~/zod/global/breadcrumbs'

export default defineNuxtRouteMiddleware(() => {
	const breadcrumbStore = useBreadcrumbsStore()
	return breadcrumbStore.cleanBreadcrumbs()
})
