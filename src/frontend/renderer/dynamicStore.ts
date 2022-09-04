import Vuex from 'vuex'
import TipModule from '@/state/tip/TipModule'
import AppModule from '@/state/app/AppModule'
import CartModule from '@/state/cart/CartModule'
import BlogModule from '@/state/blog/BlogModule'
import UserModule from '@/state/user/data/UserModule'
import AuthModule from '@/state/auth/auth/AuthModule'
import SearchModule from '@/state/search/SearchModule'
import SliderModule from '@/state/slider/SliderModule'
import PayWayModule from '@/state/payway/PayWayModule'
import ProductModule from '@/state/product/ProductModule'
import CountryModule from '@/state/country/CountryModule'
import SignUpModule from '@/state/auth/signup/SignUpModule'
import CategoryModule from '@/state/category/CategoryModule'
import AppSettingsModule from '@/state/app/AppSettingsModule'
import PasswordModule from '@/state/auth/password/PasswordModule'
import PaginationModule from '@/state/pagination/PaginationModule'
import ProductReviewModule from '@/state/product/review/ProductReviewModule'
import ProductFavouriteModule from '@/state/product/favourite/ProductFavouriteModule'
import StripeIbanModule from '@/Stripe/Components/StripeIbanModule'
import StripeCardModule from '@/Stripe/Components/StripeCardModule'

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
}
// Declare empty store first
const store = new Vuex.Store<DynamicStoreType>({
  strict: true,
})

export default store
