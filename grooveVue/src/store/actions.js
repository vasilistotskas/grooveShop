import router from "@/router";
import Api from "@/helpers/api";
import axios from "axios";
import { isEmpty } from 'lodash'

export default {
    async ensureUserIsAuthenticated({state}) {
        if (!state.isAuthenticated)
            throw new Error('User not authenticated')
    },

    // Products
    async getProduct({commit, state, getters}, category_slug, product_slug) {
        category_slug = router.currentRoute.value.params.category_slug
        product_slug = router.currentRoute.value.params.product_slug

        const productFromRemote = await Api(commit).get(`products/${category_slug}/${product_slug}`)
            .then(response => this.commit('setProduct', response.data))
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

    // Favourites
    async getIfCurrentProductIsFavourite({commit, state, dispatch, getters}, productId) {
        await dispatch('ensureUserIsAuthenticated')
        if (!getters.isUserInitialized)
            await dispatch('getUserData')

        const favouriteId = getters.getFavouriteId
        try {
            const response = await Api(commit).get('favouriteitem', favouriteId, productId)
            commit('setFavourite', response.data.is_favourite)
        } catch (error) {
            commit('setFavourite', false)
            throw error
        }
    },

    async toggleFavourite({state, dispatch, getters}, product) {
        await dispatch('ensureUserIsAuthenticated')

        if (!getters.getStateIsFavourite) {
            await dispatch('addToFavourites', product)
            return 'The product was added to the favourites'
        } else {
            await dispatch('removeFromFavourites', product)
            return 'The product was removed from favourites'
        }
    },

    async addToFavourites({state, commit, dispatch}, product) {
        await dispatch('ensureUserIsAuthenticated')
        const data = {
            "favourite_id": state.userData.favourite_id,
            "is_favourite": true,
            "product": product
        }
        const response = await Api(commit).post('favouritelist', data)
        commit('setFavourite', true)
        return response
    },

    async removeFromFavourites({state, getters, dispatch, commit}, product) {
        await dispatch('ensureUserIsAuthenticated')
        const favouriteId = getters.getFavouriteId
        const response = await Api(commit).delete('favouriteitem', favouriteId, product.id)
        commit('setFavourite', false)
        return response;
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
        const userDataFromRemote = await Api(commit, token).get('userprofile/auth')
            .then(response => {
                this.commit('setUserData',
                    {
                        'id': response.data[0].id,
                        'favourite_id': response.data[0].favourite_id,
                        'user': response.data[0].user
                    }
                )
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

        const userDetailsFromRemote = Api(commit).get('userprofile/auth')
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
                        'country_alpha': response.data[0].country_alpha,
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
    }
}