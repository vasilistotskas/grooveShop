import packageMeta from '../../package.json'
import { Options as Component, Vue } from 'vue-class-component'

@Component({
	name: 'AppCore'
})
export default class AppCore extends Vue {
	get version(): string {
		return packageMeta.version
	}
}
