import { some } from 'lodash'

export default {
    getStateCategories: state => state.categories,
    getStateCategory: state => state.category,
    getStateSearchProducts: state => state.searchProducts,
    getStateProduct: state => state.product,
    getStateCountries: state => state.countries,
    getStateRegionsBasedOnAlpha: state => state.regionsBasedOnAlpha,
    getStateLatestProducts: state => state.latestProducts,
    getStateProductExtraImages: state => state.product.images,
    getStateUserData: state => state.userData,
    getStateUserFavourites: state => state.favourites,
    getStateCartData: state => state.cart,
    getStateUserDetails: state => state.userDetails,
    getStateUserOrders: state => state.orders,
    getStateIsCurrentProductInFavourites: (state) => (productId) => {
        return some(state.favourites, {'product_id': productId})
    },
    getUserId: state => state.userData.id,
    isUserInitialized: state => ('id' in state.userData),
    isProductInitialized: state => ('id' in state.product)
}