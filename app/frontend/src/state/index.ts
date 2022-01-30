/* eslint-disable @typescript-eslint/ban-ts-comment */
import { camelCase, first, values } from 'lodash'

const modulesCache: any = []
const storeData = { modules: {} };

(function updateModules() {
	// @ts-ignore
	const requireModule = require.context('.', true, /\w+(\.state\.ts)$/)
	requireModule.keys().forEach(
		(fileName: any) => {
			const moduleDefinition = requireModule(fileName).default || requireModule(fileName)

			if (modulesCache[fileName] === moduleDefinition) {
				return
			}

			modulesCache[fileName] = moduleDefinition
			const modulePath = fileName
				.replace(/^\.\//, '')
				.replace(/(\/_root.state\.ts)$/, '')
				.replace(/(\.state\.ts)$/, '')
				.replace(/\.\w+$/, '')
				.split(/\//)
				.map(camelCase)

			const { modules } = getNamespace(storeData, modulePath)
			modules[modulePath.pop()] = {
				namespaced: true,
				...(first(values(moduleDefinition))) // l33t h4ck to extract the module definition from ts
			}

		}
	)
})()

function getNamespace(subtree: any, path: any): any {
	if (path.length === 1) {
		return subtree
	}

	const namespace = path.shift()
	subtree.modules[namespace] = {
		modules: {},
		namespaced: true,
		...subtree.modules[namespace]
	}

	return getNamespace(subtree.modules[namespace], path)
}

export default storeData.modules
