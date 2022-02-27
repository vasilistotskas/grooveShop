<template>
  <div v-if="(tags || authors) && (Object.keys(tags).length > 0 || Object.keys(authors).length)"
       class="grid-blog-siderbar"
  >
    <div v-if="tags && Object.keys(tags).length > 0" class="grid-blog-siderbar-tags">
      <span class="sidebar-blog-title tags">Tags:</span>
      <span v-for="tag in tags" :key="tag.id">
        <RouterLink :title="tag.name" :to="`/tag/${tag.name}`" aria-label="Blog Tag">
          <font-awesome-icon :icon="tagIcon"/>
          {{ tag.name }}
        </RouterLink>
      </span>
    </div>
    <div v-if="authors && Object.keys(authors).length > 0" class="grid-blog-siderbar-authors">
      <span class="sidebar-blog-title authors">Authors:</span>
      <span v-for="author in authors" :key="author.id">
        <RouterLink :title="author.user.email" :to="`/author/${author.user.email}`" aria-label="Blog Author">
          <font-awesome-icon :icon="authorIcon"/>
          {{ displayName(author) }}
        </RouterLink>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import TagModel from '@/state/blog/TagModel'
import { Options, Vue } from 'vue-class-component'
import AuthorModel from '@/state/blog/AuthorModel'
import { faTag } from '@fortawesome/free-solid-svg-icons/faTag'
import { faUserTag } from '@fortawesome/free-solid-svg-icons/faUserTag'

@Options({
  name: 'BlogSidebar',
  props: {
    tags: Array,
    authors: Array
  }
})

export default class BlogSidebar extends Vue {

  tags: TagModel[] = []
  authors: AuthorModel[] = []

  tagIcon = faTag
  authorIcon = faUserTag

  public displayName(author: AuthorModel): string {
    return (author.user?.firstName && author.user?.lastName && `${ author.user?.firstName } ${ author.user?.lastName }`) || `${ author.user?.email }`
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Blog/BlogSidebar"

</style>