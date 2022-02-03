import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AppModule from '@/store/app/AppModule'
import CartModule from '@/store/cart/CartModule'
import UserModule from '@/store/user/UserModule'
import BlogModule from '@/store/blog/BlogModule'
import AuthModule from '@/store/auth/auth/AuthModule'
import Iban from '@/libraries/Stripe/Components/Iban'
import Card from '@/libraries/Stripe/Components/Card'
import SliderModule from '@/store/slider/SliderModule'
import SearchModule from '@/store/search/SearchModule'
import AppBaseModule from '@/store/common/AppBaseModule'
import ProductModule from '@/store/product/ProductModule'
import CountryModule from '@/store/country/CountryModule'
import SignUpModule from '@/store/auth/signup/SignUpModule'
import CategoryModule from '@/store/category/CategoryModule'
import AppSettingsModule from '@/store/app/AppSettingsModule'
import UserDataModule from '@/store/user/data/UserDataModule'
import UserOrderModule from '@/store/user/order/UserOrderModule'
import PasswordModule from '@/store/auth/password/PasswordModule'
import PaginationModule from '@/store/pagination/PaginationModule'
import ProductReviewModule from '@/store/product/review/ProductReviewModule'
import ProductFavouriteModule from '@/store/product/favourite/ProductFavouriteModule'

const stateDirectoryInitializers = {
	'AppModule': ((store: any) => getModule(AppModule, store)) as unknown as AppModule,
	'CartModule': ((store: any) => getModule(CartModule, store)) as unknown as CartModule,
	'ProductModule': ((store: any) => getModule(ProductModule, store)) as unknown as ProductModule,
	'CategoryModule': ((store: any) => getModule(CategoryModule, store)) as unknown as CategoryModule,
	'UserModule': ((store: any) => getModule(UserModule, store)) as unknown as UserModule,
	'PaginationModule': ((store: any) => getModule(PaginationModule, store)) as unknown as PaginationModule,
	'BlogModule': ((store: any) => getModule(BlogModule, store)) as unknown as BlogModule,
	'AuthModule': ((store: any) => getModule(AuthModule, store)) as unknown as AuthModule,
	'Iban': ((store: any) => getModule(Iban, store)) as unknown as Iban,
	'Card': ((store: any) => getModule(Card, store)) as unknown as Card,
	'SliderModule': ((store: any) => getModule(SliderModule, store)) as unknown as SliderModule,
	'SearchModule': ((store: any) => getModule(SearchModule, store)) as unknown as SearchModule,
	'AppBaseModule': ((store: any) => getModule(AppBaseModule, store)) as unknown as AppBaseModule,
	'CountryModule': ((store: any) => getModule(CountryModule, store)) as unknown as CountryModule,
	'SignUpModule': ((store: any) => getModule(SignUpModule, store)) as unknown as SignUpModule,
	'AppSettingsModule': ((store: any) => getModule(AppSettingsModule, store)) as unknown as AppSettingsModule,
	'UserDataModule': ((store: any) => getModule(UserDataModule, store)) as unknown as UserDataModule,
	'UserOrderModule': ((store: any) => getModule(UserOrderModule, store)) as unknown as UserOrderModule,
	'PasswordModule': ((store: any) => getModule(PasswordModule, store)) as unknown as PasswordModule,
	'ProductReviewModule': ((store: any) => getModule(ProductReviewModule, store)) as unknown as ProductReviewModule,
	'ProductFavouriteModule': ((store: any) => getModule(ProductFavouriteModule, store)) as unknown as ProductFavouriteModule,
}

// @ts-ignore
const stateDirectory: typeof stateDirectoryInitializers = {}

const initializeStores = (store: Store<any>): void => {
	Object.entries(stateDirectoryInitializers).forEach(([moduleKey, module]) => {
		// @ts-ignore
		stateDirectory[moduleKey] = (module as unknown as (store: Store<any>) => typeof module)(store)
	})
}

export {
	initializeStores,
	stateDirectory,
}
