import { createStore } from 'vuex'
import appStateModules from '@/state'
import RootState from '@/state/RootState'
import { config } from 'vuex-module-decorators'
import stateDirectory from '@/state/stateDirectory'
import createPersistedState from 'vuex-persistedstate'
import { each, split, slice, join, has, set } from 'lodash'

config.rawError = true

const statePersistencePlugin = createPersistedState({
	key: 'frontend',
	paths: [
		'cart.cart'
	]
})

each(stateDirectory, (item: any, path: any) => {
	const elements = split(path, '.')
	each(elements, (element: any, idx: any) => {
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
	strict: true,
	modules: appStateModules,
	plugins: [statePersistencePlugin]
})

export default store
