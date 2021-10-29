<script lang="ts">
import { Options, Vue } from "vue-class-component";
import _, {cloneDeep, get, LoDashStatic, map, pickBy} from 'lodash'
import packageMeta from '@/../package.json'
import store from '@/store'

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
    return store.getters['app/getLoading']
  }

  get isAuthenticated(): boolean {
    return store.getters['user/data/getIsAuthenticated']
  }

  public updateMetaTagElement(metaName: string, metaAttribute: string, newValue: string): void {
    const metaTagElement = <Element> document.querySelector(`meta[name=${metaName}]`);
    metaTagElement.setAttribute(metaAttribute, newValue);
  }

  get version(): string {
    return packageMeta.version
  }

}

</script>
