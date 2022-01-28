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
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
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

  tagIcon: IconDefinition = faTag
  authorIcon: IconDefinition = faUserTag

  public displayName(author: AuthorModel): string {
    return (author.user?.firstName && author.user?.lastName && `${ author.user?.firstName } ${ author.user?.lastName }`) || `${ author.user?.email }`
  }

}
</script>

<style lang="scss" scoped>
.grid-blog-siderbar {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &-tags, &-authors {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    span {
      width: 100%;
      display: grid;
      justify-self: start;
      align-self: center;
      transition: all 0.3s ease-in-out;

      &:not(.sidebar-blog-title) {
        border: 1px solid var(--cp-palette-main-third);
        padding: 7px 12px;
        border-radius: 5px;

        &:hover {
          background: var(--cp-palette-main-secondary);
          transition: all 0.3s ease-in-out;

          a {
            transition: all 0.3s ease-in-out;

            svg {
              color: var(--cp-palette-main-primary) !important;
              transition: all 0.3s ease-in-out;
            }
          }
        }
      }
    }

    a {
      font-size: 18px;
    }
  }

  &-authors {
    grid-template-columns: repeat(1, 1fr);
  }

  .sidebar-blog-title {
    font-weight: 500;
    font-size: 26px;

    &.tags {
      grid-column-start: span 2;
    }

    &.authors {
      grid-column-start: auto;
    }
  }
}
</style>