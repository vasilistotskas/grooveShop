<template>
  <div id="page-not-found" class="container mt-9">
    <span>PAGE NOT FOUND</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'PageNotFound'
})

export default class PageNotFound extends Vue {

  mounted(): void {
    document.title = 'Page Not Found'
  }

}

</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Main/PageNotFound"

</style>