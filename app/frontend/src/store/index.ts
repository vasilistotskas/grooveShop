import { Store } from 'vuex'
import { initializeStores } from '@/store/utility/StoreAccessor'
const initializer = (store: Store<any>): void => initializeStores(store)
export const plugins = [initializer]
export * from '@/store/utility/StoreAccessor'
