import { Store } from '@/store';

declare module '*.md' {
	const value: string
	export default value
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$store: Store;
	}
}
