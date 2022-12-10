import { MainRoutePaths } from '@/Routes/Enum/MainRoutePaths'
import { MainRouteNames } from '@/Routes/Enum/MainRouteNames'
import { Options as Component, Vue } from 'vue-class-component'

@Component({
	name: 'RouteCore'
})
export default class RouteCore extends Vue {
	MainRoutePaths = MainRoutePaths
	MainRouteNames = MainRouteNames
}
