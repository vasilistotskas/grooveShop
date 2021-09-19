import {createStore} from 'vuex'
import axios from "axios";
import {cloneDeep, pickBy} from 'lodash'

export default createStore({
    state: {
        cart: {
            items: [],
        },
        categories: {
            items: [],
        },
        isAuthenticated: false,
        token: '',
        isLoading: false
    },
    getters: {
        getStateCategories: state => state.categories
    },
    mutations: {
        setCategories(state, categories) {
            return state.categories = categories
        },
        initializeStore(state) {
            this.commit('initializeCart', state)
            this.commit('initializeAuth', state)
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
        clearCart(state) {
            state.cart = {items: []}

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
    },
    actions: {
        async getCategories(state, commit) {
            const categoriesFromRemote = await axios
                .get('/api/v1/products/categories/')
                .then(response => this.commit('setCategories', response.data))
        }
    },
    modules: {}
})
