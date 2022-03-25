<template>
  <RouterLink
    :title="author.user.email"
    :to="`/author/${author.user.email}`"
    aria-label="Blog Author"
  >
    {{
      displayName
    }}
  </RouterLink>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import AuthorModel from '@/state/blog/AuthorModel'

@Options({
  name: 'BlogAuthorLink',
  props: {
    author: {
      type: Object,
      required: true
    }
  }
})
export default class BlogAuthorLink extends Vue {

  author = new AuthorModel()

  get displayName(): string {
    return (this.author.user?.firstName && this.author.user?.lastName && `${ this.author.user?.firstName } ${ this.author.user?.lastName }`) || `${ this.author.user?.email }`
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Blog/BlogAuthorLink"

</style>