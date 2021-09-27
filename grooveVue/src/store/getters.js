export default {
    getStateCategories: state => state.categories,
    getStateProduct: state => state.product,
    getStateLatestProducts: state => state.latestProducts,
    getStateProductExtraImages: state => state.product.images,
    getStateUserData: state => state.userData,
    getStateUserDetails: state => state.UserDetails,
    getStateUserOrders: state => state.orders,
    getStateIsFavourite: state => state.isFavourite,
    getFavouriteId: state => state.userData.favourite_id,
    isUserInitialized: state => ('id' in state.userData)
}