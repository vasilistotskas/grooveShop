<script lang="ts">
import { Options, Vue } from "vue-class-component"
import App from '@/App.vue'

@Options({
  name: "AppBaseLayout",
  components: {
    AppBaseLayout
  }
})
export default class AppBaseLayout extends App {}
</script>