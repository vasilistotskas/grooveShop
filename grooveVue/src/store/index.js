import {createStore} from 'vuex'
import axios from "axios";
import {cloneDeep, pickBy} from 'lodash'
import { createLogger } from 'vuex'

export default createStore({
    plugins: [createLogger()],
    state: {
        cart: {
            items: [],
        },
        categories: {
            items: [],
        },
        isAuthenticated: false,
        userProfile: Object,
        isFavourite: false,
        token: '',
        isLoading: false
    },
    getters: {
        getStateCategories: state => state.categories,
        getStateUserProfile: state => state.userProfile,
        getStateIsFavourite: state => state.isFavourite,
        getFavouriteId: state => state.userProfile.favourite_id
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
        setUserProfile(state, userProfile) {
            state.userProfile = userProfile
        },
        setFavourite(state, isFavourite) {
            state.isFavourite = isFavourite
        },
        // for later to check user profile changes
        updateUserProfile(state, userProfile) {
            state.userProfile = userProfile
        },
        updateIsFavourite(state, isFavourite) {
            state.isFavourite = isFavourite
        },
        unsetUserProfile(state) {
            state.userProfile = {}
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
        async getCategories(state, commit) {
            const categoriesFromRemote = await axios
                .get('/api/v1/products/categories/')
                .then(response => this.commit('setCategories', response.data))
        },

        // hardcoded data pass for better manipulation
        async getUserProfile(store, tokenFromLogInRequest) {
            if (store.state.isAuthenticated) {

                let token = ''
                if (tokenFromLogInRequest === undefined) {
                    token = localStorage.getItem('token');
                } else {
                    token = tokenFromLogInRequest
                }

                const userProfileFromRemote = await axios
                    .get('/api/v1/userprofile/auth/',
                        {
                            headers: {'Authorization': "Token " + token}
                        })
                    .then(response =>
                        this.commit('setUserProfile',
                            {
                                'id': response.data[0].id,
                                'user': response.data[0].user,
                                'favourite_id': response.data[0].favourite_id,
                                'address': response.data[0].address,
                                'first_name': response.data[0].first_name,
                                'last_name': response.data[0].last_name,
                                'phone': response.data[0].phone,
                                'place': response.data[0].place,
                                'zipcode': response.data[0].zipcode
                            }
                        )
                    )
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        getIfCurrentProductIsFavourite({commit, state, getters}, product_id) {

            let token = localStorage.getItem('token');

            return new Promise((resolve, reject) => {
                const favourite_id = getters.getFavouriteId
                axios
                    .get(
                        `/api/v1/favouriteitem/${favourite_id}/${product_id}`,
                        {
                            headers: { 'Authorization': "Token " + token },
                        },
                    )
                    .then(response => commit('setFavourite', response.data.is_favourite), resolve('Success'))
                    .catch(error => {
                        this.commit('setFavourite', false)
                        reject(error)
                    })
            })
        }
    },
    modules: {}
})
