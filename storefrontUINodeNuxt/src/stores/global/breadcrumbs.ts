import { BreadCrumbsItemObject, BreadCrumbsObject } from '~/zod/global/breadcrumbs'
import { BreadcrumbList } from '~/zod/global/org.schema/BreadcrumbList'
import ListItem from '~/zod/global/org.schema/ListItem'

export interface BreadcrumbsState {
	breadcrumbs: BreadCrumbsObject
	structuredData: BreadcrumbList
}
export const useBreadcrumbsStore = defineStore({
	id: 'breadcrumbs',
	state: (): BreadcrumbsState => ({
		breadcrumbs: new BreadCrumbsObject(),
		structuredData: new BreadcrumbList()
	}),
	getters: {
		getBreadcrumbs: (state) => () => {
			return state.breadcrumbs
		}
	},
	actions: {
		setStructuredData(locale: string, defaultLocale: string) {
			const config = useRuntimeConfig()
			const baseUrl = config.public.baseUrl
			const instanceRoot = `${baseUrl}${locale === defaultLocale ? '' : `/${locale}`}`
			const parentItem: ListItem = new ListItem({
				'@type': 'ListItem',
				name: this.breadcrumbs.parent?.text,
				item: `${instanceRoot}${this.breadcrumbs.parent?.link}`,
				position: 1
			})

			const childItems: ListItem[] = this.breadcrumbs.children.map((item, idx) => {
				return new ListItem({
					'@type': 'ListItem',
					name: item.text,
					item: `${instanceRoot}${item.link}`,
					position: idx + 2
				})
			})

			this.structuredData = new BreadcrumbList({
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [parentItem, ...childItems]
			})
		},
		setBreadcrumbs(breadcrumbs: BreadCrumbsObject) {
			this.breadcrumbs = breadcrumbs
		},
		setParent(breadcrumb: BreadCrumbsItemObject) {
			this.breadcrumbs.parent = breadcrumb
		},
		setChildren(breadcrumbs: BreadCrumbsItemObject[]) {
			this.breadcrumbs.children = breadcrumbs
		},
		cleanBreadcrumbs() {
			this.breadcrumbs = new BreadCrumbsObject()
		}
	}
})
