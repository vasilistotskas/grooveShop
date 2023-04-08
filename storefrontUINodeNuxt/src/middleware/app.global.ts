import { useBreadcrumbsStore } from '~/stores/global/breadcrumbs'

export default defineNuxtRouteMiddleware(async () => {
	const breadcrumbStore = useBreadcrumbsStore()
	await breadcrumbStore.cleanBreadcrumbs()
})
