import { useBreadcrumbsStore } from '~/stores/global/breadcrumbs'

export default defineNuxtRouteMiddleware(() => {
	const breadcrumbStore = useBreadcrumbsStore()
	breadcrumbStore.cleanBreadcrumbs()
})
