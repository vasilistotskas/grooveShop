import AppBaseModule from '@/state/common/AppBaseModule'
import AppModule from '@/state/app/AppModule'
import AppSettingsModule from '@/state/app/AppSettingsModule'
import CategoryModule from '@/state/category/CategoryModule'
import ProductModule from '@/state/product/ProductModule'
import UserModule from '@/state/user/UserModule'
import SearchModule from '@/state/search/SearchModule'
import UserDataModule from '@/state/user/data/UserDataModule'
import UserOrderModule from '@/state/user/order/UserOrderModule'
import ProductFavouriteModule from '@/state/product/favourite/ProductFavouriteModule'
import Iban from '@/libraries/Stripe/Components/Iban'
import Card from '@/libraries/Stripe/Components/Card'
import ProductReviewModule from '@/state/product/review/ProductReviewModule'
import CartModule from '@/state/cart/CartModule'
import CountryModule from '@/state/country/CountryModule'

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
    'country': CountryModule,
    'stripeIban': Iban,
    'stripeCard': Card
}

export default stateDirectory
