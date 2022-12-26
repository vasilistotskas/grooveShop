import packageMeta from '../../package.json'
import AppModule from '@/State/App/AppModule'
import { getModule } from 'vuex-module-decorators'
import { Options as Component, Vue } from 'vue-class-component'

@Component({
	name: 'AppCore'
})
export default class AppCore extends Vue {
	appModule = getModule(AppModule)

	get version(): string {
		return packageMeta.version
	}
}
