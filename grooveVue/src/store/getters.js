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
    getStateCartData: state => state.cart,
    getStateUserDetails: state => state.UserDetails,
    getStateUserOrders: state => state.orders,
    getStateIsFavourite: state => state.isFavourite,
    getFavouriteId: state => state.userData.favourite_id,
    getUserId: state => state.userData.id,
    isUserInitialized: state => ('id' in state.userData)
}