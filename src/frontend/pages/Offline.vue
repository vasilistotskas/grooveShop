<template>
  <h1>You are offline</h1>

  <p>
    The page will automatically reload once the connection is re-established. Click the button below
    to try reloading manually.
  </p>
  <button type="button">⤾ Reload</button>
</template>

<script lang="ts">
import { Options as Component, Vue } from 'vue-class-component'

@Component({
  name: 'Offline',
})
export default class Offline extends Vue {
  mounted(): void {
    document.title = 'Page Not Found'
    this.checkNetworkAndReload()
  }
  refreshPage(): void {
    window.location.reload()
  }
  async checkNetworkAndReload() {
    try {
      const response = await fetch('.')
      // Verify we get a valid response from the server
      if (response.status >= 200 && response.status < 500) {
        window.location.reload()
        return
      }
    } catch {
      // Unable to connect to the server, ignore.
    }
    window.setTimeout(this.checkNetworkAndReload, 2500)
  }
  created(): void {
    window.addEventListener('online', () => {
      window.location.reload()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/PageNotFound';
</style>
