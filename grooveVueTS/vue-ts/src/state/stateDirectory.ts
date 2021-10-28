import AppBaseModule from '@/state/common/AppBaseModule'
import AppModule from '@/state/app/AppModule'
import AppSettingsModule from '@/state/app/AppSettingsModule'
import CategoryModule from '@/state/category/CategoryModule'
import ProductModule from '@/state/product/ProductModule'
import UserModule from '@/state/user/UserModule'
import UserDataModule from '@/state/user/data/UserDataModule'
import UserOrderModule from '@/state/user/order/UserOrderModule'
// import UserFavouriteModule from '@/state/user/favourite/UserFavouriteModule'
// import UserReviewModule from '@/state/user/review/UserReviewModule'
import CartModule from '@/state/cart/CartModule'

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
    'user': UserModule,
    'user.data': UserDataModule,
    'user.order': UserOrderModule,
    // 'user.favourite': UserFavouriteModule,
    // 'user.review': UserReviewModule,
    'cart': CartModule
}

export default stateDirectory
