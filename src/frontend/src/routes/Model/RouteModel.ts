import { map } from 'lodash'
import { _RouteRecordBase, RouteRecordNormalized } from 'vue-router'

export class RouteModel {
	routeNames: Array<_RouteRecordBase['name']> = []
	routePaths: Array<_RouteRecordBase['path']> = []

	constructor(routes: RouteRecordNormalized[]) {
		const routesData = map(routes, (route:any) => {
			this.routeNames.push(route.name)
			this.routePaths.push(route.path)
		})
	}

	static createRouteModel(routes: Array<RouteRecordNormalized>): RouteModel {
		return new RouteModel(routes)
	}

}