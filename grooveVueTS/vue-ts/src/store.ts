import { createStore } from 'vuex'
import { each, split, slice, join, has, set } from 'lodash'
import createPersistedState from 'vuex-persistedstate'
import { config } from 'vuex-module-decorators'
import appStateModules from '@/state'
import stateDirectory from '@/state/stateDirectory'
import RootState from '@/state/RootState'

config.rawError = true

const statePersistencePlugin = createPersistedState({
	key: 'vue-ts',
	paths: [
		'cart.cart',
	]
})

each(stateDirectory, (item, path) => {
	const elements = split(path, '.')
	each(elements, (element, idx) => {
		const elementIterator = slice(elements, idx)
		const elementIteratorJoined = join(elementIterator, '.modules.')
		if (has(appStateModules, elementIteratorJoined)) {
			return
		}
		set(appStateModules, elementIteratorJoined, {})
	})
	const fullPath = join(elements, '.modules.')
	set(appStateModules, fullPath, item)
})

const store = createStore<RootState>({
	strict:true,
	modules: appStateModules,
	plugins: [ statePersistencePlugin ]
})

export default store
