<template>
  <div class="grid-blog-siderbar" v-if="(tags || authors) && (Object.keys(tags).length > 0 || Object.keys(authors).length)">
    <div class="grid-blog-siderbar-tags" v-if="tags && Object.keys(tags).length > 0">
      <span class="sidebar-blog-title tags">Tags:</span>
      <span v-for="tag in tags">
        <router-link :to="`/tag/${tag.name}`" aria-label="Blog Tag">
          <font-awesome-icon :icon="tagIcon" :style="{ color: '#080808' }"></font-awesome-icon>
          {{ tag.name }}
        </router-link>
      </span>
    </div>
    <div class="grid-blog-siderbar-authors" v-if="authors && Object.keys(authors).length > 0">
      <span class="sidebar-blog-title authors">Authors:</span>
      <span v-for="author in authors">
          <router-link :to="`/author/${author.user.email}`" aria-label="Blog Author">
          <font-awesome-icon :icon="authorIcon" :style="{ color: '#080808' }"></font-awesome-icon>
            {{ displayName(author) }}
          </router-link>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import TagModel from "@/state/blog/TagModel"
import { Options, Vue} from "vue-class-component"
import AuthorModel from "@/state/blog/AuthorModel"
import { faTag } from "@fortawesome/free-solid-svg-icons/faTag"
import { faUserTag } from "@fortawesome/free-solid-svg-icons/faUserTag"

@Options({
  name: "BlogSidebar",
  props: {
    tags: Array,
    authors: Array
  }
})

export default class BlogSidebar extends Vue {

  tags: TagModel[] = []
  authors: AuthorModel[] = []

  get tagIcon(): typeof faTag {
    return faTag
  }

  get authorIcon(): typeof faUserTag {
    return faUserTag
  }

  public displayName (author: AuthorModel): string {
    return (author.user?.firstName && author.user?.lastName && `${author.user?.firstName} ${author.user?.lastName}`) || `${author.user?.email}`
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
          border: 1px solid #5a5a5a85;
          padding: 7px 12px;
          border-radius: 5px;
          &:hover {
            background: $primary-color-5;
            transition: all 0.3s ease-in-out;
            a {
              color: $primary-color-4;
              transition: all 0.3s ease-in-out;
              svg {
                color: $primary-color-1!important;
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