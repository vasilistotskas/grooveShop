import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AddressModule from '@/State/Address/AddressModule'
import AppModule from '@/State/App/AppModule'
import AppSettingsModule from '@/State/App/AppSettingsModule'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import PasswordModule from '@/State/Auth/Password/PasswordModule'
import SignUpModule from '@/State/Auth/SignUp/SignUpModule'
import BlogModule from '@/State/Blog/BlogModule'
import CartModule from '@/State/Cart/CartModule'
import CategoryModule from '@/State/Category/CategoryModule'
import CountryModule from '@/State/Country/CountryModule'
import PaginationModule from '@/State/Pagination/PaginationModule'
import PayWayModule from '@/State/Payway/PayWayModule'
import ProductModule from '@/State/Product/ProductModule'
import SearchModule from '@/State/Search/SearchModule'
import SliderModule from '@/State/Slider/SliderModule'
import TipModule from '@/State/Tip/TipModule'
import UserModule from '@/State/User/Profile/UserModule'

const stateDirectoryInitializers = {
	AddressModule: ((store) => getModule(AddressModule, store)) as unknown as AddressModule,
	AppModule: ((store) => getModule(AppModule, store)) as unknown as AppModule,
	AppSettingsModule: ((store) =>
		getModule(AppSettingsModule, store)) as unknown as AppSettingsModule,
	AuthModule: ((store) => getModule(AuthModule, store)) as unknown as AuthModule,
	PasswordModule: ((store) =>
		getModule(PasswordModule, store)) as unknown as PasswordModule,
	SignUpModule: ((store) => getModule(SignUpModule, store)) as unknown as SignUpModule,
	BlogModule: ((store) => getModule(BlogModule, store)) as unknown as BlogModule,
	CartModule: ((store) => getModule(CartModule, store)) as unknown as CartModule,
	CategoryModule: ((store) =>
		getModule(CategoryModule, store)) as unknown as CategoryModule,
	CountryModule: ((store) => getModule(CountryModule, store)) as unknown as CountryModule,
	PaginationModule: ((store) =>
		getModule(PaginationModule, store)) as unknown as PaginationModule<unknown>,
	PayWayModule: ((store) => getModule(PayWayModule, store)) as unknown as PayWayModule,
	ProductModule: ((store) => getModule(ProductModule, store)) as unknown as ProductModule,
	SearchModule: ((store) => getModule(SearchModule, store)) as unknown as SearchModule,
	SliderModule: ((store) => getModule(SliderModule, store)) as unknown as SliderModule,
	TipModule: ((store) => getModule(TipModule, store)) as unknown as TipModule,
	UserModule: ((store) => getModule(UserModule, store)) as unknown as UserModule
}

// @ts-ignore
const stateDirectory: typeof stateDirectoryInitializers = {}

const initializeStores = (store: Store<unknown>): void => {
	Object.entries(stateDirectoryInitializers).forEach(([moduleKey, module]) => {
		stateDirectory[moduleKey] = (
			module as unknown as (store: Store<unknown>) => typeof module
		)(store)
	})
}

export { initializeStores, stateDirectory }
