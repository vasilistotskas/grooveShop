import { Store } from '@/store';

declare module '*.md' {
	const value: string
	export default value
}

declare module '*.vue' {
	import { DecoratedClass } from 'vue-class-component/lib/declarations'
	const value: DecoratedClass
	export default value
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$store: Store;
	}
}
