import router from "@/router";
import Api from "@/helpers/api";
import axios from "axios";

export default {
    async ensureUserIsAuthenticated({state}) {
        if (!state.isAuthenticated)
            throw new Error('User not authenticated')
    },

    // Products
    async initializeProduct ({ dispatch }) {
        await dispatch('getProduct')
        await dispatch('updateProductHits')
    },

    async getProduct({commit, state, getters, dispatch}, category_slug, product_slug) {
        category_slug = router.currentRoute.value.params.category_slug
        product_slug = router.currentRoute.value.params.product_slug

        const productFromRemote = await Api(commit).get(`products/${category_slug}/${product_slug}`)
            .then(response => this.commit('setProduct', response.data))
    },

    async updateProductHits({commit, state, getters, dispatch}) {
        const category_slug = router.currentRoute.value.params.category_slug
        const product_slug = router.currentRoute.value.params.product_slug

        if (getters.isProductInitialized){
            await dispatch('getProduct')

            const productHitsFromRemote = await Api(commit).patch(`products/${category_slug}/${product_slug}/`)
                .catch(error => {
                    console.log(error)
                })
        }

    },

    async getLatestProducts({commit}) {
        const latestProductsFromRemote = await Api(commit).get('latest-products/')
            .then(response => this.commit('setLatestProducts', response.data))
    },

    // Categories
    async getCategories({commit}) {
        const categoriesFromRemote = await Api(commit).get('products/categories/')
            .then(response => this.commit('setCategories', response.data))
    },

    async fetchCategory({commit}, categorySlug) {
        const categoryFromRemote = await Api(commit).get(`products/${categorySlug}/`)
            .then(response => this.commit('setCategory', response.data))
    },

    // Search
    async getSearchResults({commit}, data) {
        const searchResultsFromRemote = await Api(commit).post(`products/search`, data)
            .then(response => this.commit('setSearchProducts', response.data))
    },

    // Countries
    async getCountries({commit}) {
        const countriesFromRemote = await Api(commit).get('countries/')
            .then(response => this.commit('setCountries', response.data))
    },

    async getRegionsBasedOnAlpha({commit, getters, dispatch, state}, alpha_2) {
        try {
            const response = await Api(commit).get(`countries/${alpha_2}`)
            commit('setRegionsBasedOnAlpha', response.data)
        } catch (error) {
            throw error
        }
    },

    // Order
    async createOrder({state, commit, dispatch}, data) {
        const response = await Api(commit).post('checkout', data)
            .then(response => {
                this.commit('clearCart')
                router.push('/cart/success')
            })
            .catch(error => {
                console.log(error)
            })
    },

    async decreaseProductStock({state, commit, dispatch, getters}) {
        const category_slug = router.currentRoute.value.params.category_slug
        const product_slug = router.currentRoute.value.params.product_slug

        if (getters.isProductInitialized){
            await dispatch('getProduct')

            const data = {
                id: state.product.id,
                stock: state.product.stock
            }
            const productHitsFromRemote = await Api(commit).patch(`products/${category_slug}/${product_slug}/stock/`, data)
                .catch(error => {
                    console.log(error)
                })
        }
    },

    // Favourites

    async toggleFavourite({state, dispatch, getters}, product) {
        await dispatch('ensureUserIsAuthenticated')

        if (!getters.getStateIsCurrentProductInFavourites(product.id)) {
            await dispatch('addToFavourites', product)
            return 'The product was added to the favourites'
        } else {
            await dispatch('removeFromFavourites', product)
            return 'The product was removed from favourites'
        }
    },

    async getCurrentUserFavourites({state, commit, dispatch, getters}, user) {
        await dispatch('ensureUserIsAuthenticated')

        const userFavouritesFromRemote = await Api(commit).get(`favourites/${user}`)
            .then(response => this.commit('setUserFavourites', response.data))
    },

    async addToFavourites({state, commit, dispatch}) {
        await dispatch('ensureUserIsAuthenticated')

        const data = {
            "user_id": state.userData.id,
            "product_id": state.product.id
        }
        const user_id = data.user_id

        const response = await Api(commit).post(`favourites/${user_id}`, data)
        await dispatch('getCurrentUserFavourites', user_id)
    },

    async removeFromFavourites({state, commit, dispatch}) {
        await dispatch('ensureUserIsAuthenticated')

        const user_id = state.userData.id
        const product_id = state.product.id

        const response = await Api(commit).delete(`favourites/delete/${user_id}/${product_id}`)
        await dispatch('getCurrentUserFavourites', user_id)
    },

    // User
    async getUserOrders({commit}) {
        const ordersFromRemote = await Api(commit).get('orders/')
            .then(response => this.commit('setOrders', response.data))
    },

    async userLogIn({state, getters, dispatch, commit}, formData){
        const response = await Api(commit).post('djoser/token/login', formData)
            .then(response => dispatch('getUserData', response.data.auth_token))
    },

    // hardcoded data pass for better manipulation
    async getUserData({state, dispatch, commit}, tokenFromLogInRequest) {
        this.errors = []

        let token = ''
        if (tokenFromLogInRequest === undefined) {
            token = localStorage.getItem('token');
        } else {
            token = tokenFromLogInRequest
            this.commit('setToken', token)
        }

        await dispatch('ensureUserIsAuthenticated')
        const userDataFromRemote = await Api(commit, token).get('userprofile/data')
            .then(response => {
                this.commit('setUserData',
                    {
                        'id': response.data[0].id,
                        'user': response.data[0].user
                    }
                )

                try {
                    //  User favourites get action here
                    dispatch('getCurrentUserFavourites', response.data[0].user)
                    //  User reviews get action here
                    dispatch('getCurrentUserProductReviews', response.data[0].user)
                } catch (error) {
                    throw error
                }

                axios.defaults.headers.common["Authorization"] = "Token " + token
                localStorage.setItem("token", token)
            })
            .catch(error => {
                if (error.response) {
                    for (const property in error.response.data) {
                        this.errors.push(`${property}: ${error.response.data[property]}`)
                    }
                } else {
                    console.log(error)
                    this.errors.push('Something went wrong. Please try again')
                }
            })
    },

    getUserDetails({dispatch, commit}) {
        dispatch('ensureUserIsAuthenticated')

        const userDetailsFromRemote = Api(commit).get('userprofile/data')
            .then(response => {
                this.commit('setUserDetails',
                    {
                        'first_name': response.data[0].first_name,
                        'last_name': response.data[0].last_name,
                        'phone': response.data[0].phone,
                        'email': response.data[0].email,
                        'city': response.data[0].city,
                        'zipcode': response.data[0].zipcode,
                        'address': response.data[0].address,
                        'place': response.data[0].place,
                        'country': response.data[0].country,
                        'region': response.data[0].region,
                        'image': 'http://127.0.0.1:8000' + response.data[0].image
                    }
                )
            })

    },

    async updateUserDetailsAction({state, commit, dispatch, getters}, data) {
        await dispatch('ensureUserIsAuthenticated')
        const user_id = getters.getUserId

        const response = await Api(commit).patch(`userprofile/${user_id}/`, data)
            .then(response => this.commit('updateUserDetails', response.data))
            .catch(error => {
                console.log(error)
            })
    },

    async getCurrentUserProductReviews({state, commit, dispatch, getters}, user) {
        await dispatch('ensureUserIsAuthenticated')

        const userReviewsFromRemote = await Api(commit).get(`reviews/user/${user}/`)
            .then(response => this.commit('setUserReviews', response.data))
    },
}