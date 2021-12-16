import AppModule from '@/state/app/AppModule'
import CartModule from '@/state/cart/CartModule'
import UserModule from '@/state/user/UserModule'
import Iban from '@/libraries/Stripe/Components/Iban'
import Card from '@/libraries/Stripe/Components/Card'
import SliderModule from "@/state/slider/SliderModule"
import SearchModule from '@/state/search/SearchModule'
import AppBaseModule from '@/state/common/AppBaseModule'
import ProductModule from '@/state/product/ProductModule'
import CountryModule from '@/state/country/CountryModule'
import CategoryModule from '@/state/category/CategoryModule'
import AppSettingsModule from '@/state/app/AppSettingsModule'
import UserDataModule from '@/state/user/data/UserDataModule'
import UserOrderModule from '@/state/user/order/UserOrderModule'
import PaginationModule from "@/state/pagination/PaginationModule"
import ProductReviewModule from '@/state/product/review/ProductReviewModule'
import ProductFavouriteModule from '@/state/product/favourite/ProductFavouriteModule'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createDummyModule(moduleName: string): typeof AppBaseModule {
    return <typeof AppBaseModule>{
        namespaced: true,
        name: moduleName
    }
}

const stateDirectory = <Record<string, typeof AppBaseModule>>{
    'app': AppModule,
    'settings': AppSettingsModule,
    'category': CategoryModule,
    'product': ProductModule,
    'product.favourite': ProductFavouriteModule,
    'product.review': ProductReviewModule,
    'user': UserModule,
    'user.data': UserDataModule,
    'user.order': UserOrderModule,
    'cart': CartModule,
    'search': SearchModule,
    'pagination': PaginationModule,
    'country': CountryModule,
    'slider': SliderModule,
    'stripeIban': Iban,
    'stripeCard': Card
}

export default stateDirectory
