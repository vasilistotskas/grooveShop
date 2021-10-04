export default {
    addToCart(state, item) {
        const exists = state.cart.items.filter(i => i.product.id === item.product.id)
        if (exists.length) {
            exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)
        } else {
            state.cart.items.push(item)
        }

        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setIsLoading(state, status) {
        state.isLoading = status
    },
    setToken(state, token) {
        state.token = token
        state.isAuthenticated = true
    },
    removeToken(state) {
        state.token = ''
        state.isAuthenticated = false
    },
    setCategories(state, categories) {
        state.categories = categories
    },
    setCategory(state, category) {
        state.category = category
    },
    setSearchProducts(state, searchProducts) {
        state.searchProducts = searchProducts
    },
    setCountries(state, countries) {
        state.countries = countries
    },
    setRegionsBasedOnAlpha(state, countryAlpha) {
        state.regionsBasedOnAlpha = countryAlpha
    },
    setRegions(state, regions) {
        state.regions = regions
    },
    setProduct(state, product) {
        state.product = product
        // if we need all images except main
        // state.product.images = filter(product.images, ['is_main', false])
        document.title = state.product.name + ' | grooveShop'
    },
    setLatestProducts(state, latestProducts) {
        state.latestProducts = latestProducts
    },
    setOrders(state, orders) {
        state.orders = orders
    },
    setUserData(state, userData) {
        state.userData = userData
    },
    setUserDetails(state, UserDetails) {
        state.UserDetails = UserDetails
    },
    setFavourite(state, isFavourite) {
        state.isFavourite = isFavourite
    },
    // for later to check user profile changes
    updateUserData(state, userData) {
        state.userData = userData
    },
    updateUserDetails(state, UserDetails) {
        state.UserDetails = UserDetails
    },
    updateIsFavourite(state, isFavourite) {
        state.isFavourite = isFavourite
    },
    unsetUserData(state) {
        state.userData = {}
    },
    unsetUserDetails(state) {
        state.userDetails = {}
    },
    unsetIsFavourite(state) {
        state.isFavourite = false
    },
    clearCart(state) {
        state.cart = {items: []}
        localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    initializeStore(state) {
        this.commit('initializeAuth', state)
        this.commit('initializeCart', state)
    },
    initializeCart(state) {
        if (localStorage.getItem('cart')) {
            state.cart = JSON.parse(localStorage.getItem('cart'))
        } else {
            localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    },
    initializeAuth(state) {
        if (localStorage.getItem('token')) {
            state.token = localStorage.getItem('token')
            state.isAuthenticated = true
        } else {
            state.token = ''
            state.isAuthenticated = false
        }
    },
}