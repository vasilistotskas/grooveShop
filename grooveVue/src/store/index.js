import {createStore} from 'vuex'

import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default createStore({
    plugins: [],
    state,
    getters,
    actions,
    mutations,
    modules: {}
})
