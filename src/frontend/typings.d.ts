import { Store } from '@/store'
import { RouteMetaBreadcrumb } from '@/Routes/Type/BreadcrumbItemType'

declare module '*.md' {
	const value: string
	export default value
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$store: Store
	}
}

declare module 'vue-horizontal'

declare module '*.vue' {
	import { defineComponent } from 'vue'
	const component: ReturnType<typeof defineComponent>
	export default component
}

declare module 'vue-router' {
	interface RouteMeta {
		breadcrumb: RouteMetaBreadcrumb
	}
}
