import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/State/Auth/Auth/AuthModule'
import UserModule from '@/State/User/Profile/UserModule'
import { Options as Component, Vue } from 'vue-class-component'

@Component({
	name: 'AuthCore'
})
export default class AuthCore extends Vue {
	authModule = getModule(AuthModule)
	userModule = getModule(UserModule)
}
