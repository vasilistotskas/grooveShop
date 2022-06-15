import AppModule from '@/state/app/AppModule'
import TipModule from '@/state/tip/TipModule'
import CartModule from '@/state/cart/CartModule'
import BlogModule from '@/state/blog/BlogModule'
import UserModule from '@/state/user/data/UserModule'
import AuthModule from '@/state/auth/auth/AuthModule'
import Iban from '@/libraries/Stripe/Components/Iban'
import Card from '@/libraries/Stripe/Components/Card'
import PayWayModule from '@/state/payway/PayWayModule'
import SliderModule from '@/state/slider/SliderModule'
import SearchModule from '@/state/search/SearchModule'
import AppBaseModule from '@/state/common/AppBaseModule'
import ProductModule from '@/state/product/ProductModule'
import CountryModule from '@/state/country/CountryModule'
import SignUpModule from '@/state/auth/signup/SignUpModule'
import CategoryModule from '@/state/category/CategoryModule'
import AppSettingsModule from '@/state/app/AppSettingsModule'
import PasswordModule from '@/state/auth/password/PasswordModule'
import PaginationModule from '@/state/pagination/PaginationModule'
import ProductReviewModule from '@/state/product/review/ProductReviewModule'
import ProductFavouriteModule from '@/state/product/favourite/ProductFavouriteModule'

const stateDirectory = <Record<string, typeof AppBaseModule>>{
  app: AppModule,
  settings: AppSettingsModule,
  category: CategoryModule,
  product: ProductModule,
  'product.favourite': ProductFavouriteModule,
  'product.review': ProductReviewModule,
  user: UserModule,
  cart: CartModule,
  search: SearchModule,
  pagination: PaginationModule,
  country: CountryModule,
  slider: SliderModule,
  stripeIban: Iban,
  stripeCard: Card,
  auth: AuthModule,
  password: PasswordModule,
  signup: SignUpModule,
  blog: BlogModule,
  pay_way: PayWayModule,
  tip: TipModule,
}

export default stateDirectory
