import Vuex from 'vuex'
import TipModule from '@/State/Tip/TipModule'
import AppModule from '@/State/App/AppModule'
import CartModule from '@/State/Cart/CartModule'
import BlogModule from '@/State/Blog/BlogModule'
import AddressModule from '@/State/Address/AddressModule'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import SearchModule from '@/State/Search/SearchModule'
import SliderModule from '@/State/Slider/SliderModule'
import PayWayModule from '@/State/Payway/PayWayModule'
import UserModule from '@/State/User/Profile/UserModule'
import ProductModule from '@/State/Product/ProductModule'
import CountryModule from '@/State/Country/CountryModule'
import SignUpModule from '@/State/Auth/SignUp/SignUpModule'
import CategoryModule from '@/State/Category/CategoryModule'
import AppSettingsModule from '@/State/App/AppSettingsModule'
import PasswordModule from '@/State/Auth/Password/PasswordModule'
import PaginationModule from '@/State/Pagination/PaginationModule'
import ProductReviewModule from '@/State/Product/Review/ProductReviewModule'
import StripeCardModule from '@/Libraries/Stripe/Components/StripeCardModule'
import StripeIbanModule from '@/Libraries/Stripe/Components/StripeIbanModule'
import ProductFavouriteModule from '@/State/Product/Favourite/ProductFavouriteModule'

export interface DynamicStoreType {
	app: AppModule
	settings: AppSettingsModule
	category: CategoryModule
	product: ProductModule
	productFavourite: ProductFavouriteModule
	productReview: ProductReviewModule
	user: UserModule
	cart: CartModule
	search: SearchModule
	pagination: PaginationModule<unknown>
	country: CountryModule
	slider: SliderModule
	stripeIban: StripeIbanModule
	stripeCard: StripeCardModule
	auth: AuthModule
	password: PasswordModule
	signup: SignUpModule
	blog: BlogModule
	payWay: PayWayModule
	tip: TipModule
	address: AddressModule
}
// Declare empty store first
const store = new Vuex.Store<DynamicStoreType>({
	strict: true
})

export default store
