<script lang="ts">
import { Options, Vue } from "vue-class-component";
import _, {cloneDeep, get, LoDashStatic, map, pickBy} from 'lodash'
import packageMeta from '@/../package.json'
import axios from "axios";

@Options({
  name: "App",
  components: {

  }
})
export default class App extends Vue {

  get lodash(): LoDashStatic {
    return _
  }

  get isLoading(): boolean {
    return this.$store.getters['app/getLoading']
  }

  get isAuthenticated(): boolean {
    return this.$store.getters['user/getIsAuthenticated']
  }

  public updateMetaTagElement(metaName: string, metaAttribute: string, newValue: string): void {
    const metaTagElement = <Element> document.querySelector(`meta[name=${metaName}]`);
    metaTagElement.setAttribute(metaAttribute, newValue);
  }

  get version(): string {
    return packageMeta.version
  }

  public initializeAuth(): void {
    this.$store.commit('user/initializeAuth')
  }

  public initializeCart(): void {
    this.$store.commit('cart/initializeCart')
  }

  public initializeToken(): void {
    const token = this.$store.getters['user/getToken']
    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  }

  mounted(): void {
    if (this.isAuthenticated) {
      this.initializeAuth()
      this.initializeToken()
      this.$store.dispatch('user/userDataFromRemote')
    }

    this.initializeCart()
    this.$store.dispatch('category/categoriesFromRemote')
  }
}

</script>