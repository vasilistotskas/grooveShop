import AppBaseModule from '@/state/common/AppBaseModule'
import AppModule from '@/state/app/AppModule'
import AppSettingsModule from '@/state/app/AppSettingsModule'
import CategoryModule from '@/state/category/CategoryModule'
import UserModule from '@/state/user/UserModule'
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
    'user': UserModule,
    'cart': CartModule,
}

export default stateDirectory
