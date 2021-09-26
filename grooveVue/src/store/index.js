import {createStore} from 'vuex'
import Api from '@/helpers/api'
import {filter} from "lodash";
import router from '@/router'
import axios from "axios";

export default createStore({
    plugins: [],
    state: {
        cart: {
            items: [],
        },
        categories: {
            items: [],
        },
        product: {},
        latestProducts: [],
        isAuthenticated: false,
        userData: {},
        userDetails: {},
        order: {},
        isFavourite: false,
        token: '',
        isLoading: false
    },
    getters: {
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
    },
    mutations: {
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
    },
    actions: {
        async ensureUserIsAuthenticated({state}) {
            if (!state.isAuthenticated)
                throw new Error('User not authenticated')
        },

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

        async getCategories({commit}) {
            const categoriesFromRemote = await Api(commit).get('products/categories/')
                .then(response => this.commit('setCategories', response.data))
        },

        async getUserOrders({commit}) {
            const ordersFromRemote = await Api(commit).get('orders/')
                .then(response => this.commit('setOrders', response.data))
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

        // hardcoded data pass for better manipulation
        async getUserData({state, dispatch, commit}, tokenFromLogInRequest) {
            await dispatch('ensureUserIsAuthenticated')

            let token = ''
            if (tokenFromLogInRequest === undefined) {
                token = localStorage.getItem('token');
            } else {
                token = tokenFromLogInRequest
            }

            const userDataFromRemote = await Api(commit, token).get('userprofile/auth')
                .then(response => {
                    this.commit('setUserData',
                        {
                            'id': response.data[0].id,
                            'favourite_id': response.data[0].favourite_id,
                            'user': response.data[0].user
                        }
                    )
                })
        },

        async getUserDetails({dispatch, commit}) {
            await dispatch('ensureUserIsAuthenticated')

            const userDetailsFromRemote = await Api(commit).get('userprofile/auth')
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
                            'country_name': response.data[0].country_name,
                            'county': response.data[0].county,
                            'image': response.data[0].image
                        }
                    )
                })
        },

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
        }
    },
    modules: {}
})
