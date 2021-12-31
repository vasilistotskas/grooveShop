<template>
  <div class="grid-post-list" v-if="posts && Object.keys(posts).length > 0">
    <div v-for="post in posts" :key="post.title" class="cardSpecialEffect">
      <router-link :to="`/post/${post.slug}`" aria-label="Blog Post">
        <div class="card blog-card">
          <img class="img-fluid" v-bind:src="axiosBaseUrl + '/media/' + post.image" :alt="post.title">
          <div class="card-body">
            <span class="card-title">{{ post.title }}: {{ post.subtitle }}</span>
            <span v-if="showAuthor">
              by <AuthorLink :author="post.author" />
            </span>
            <p class="card-text">{{ post.metaDescription }}</p>
            <ul>
              <li class="post__tags" v-for="tag in post.tags" :key="tag.name">
                <router-link :to="`/tag/${tag.name}`" aria-label="Blog Tag">#{{ tag.name }}</router-link>
              </li>
            </ul>
            <small class="text-muted">{{ displayableDate(post.publishDate) }}</small>
          </div>
          <span class="line-1"></span>
          <span class="line-2"></span>
          <span class="line-3"></span>
          <span class="line-4"></span>
        </div>
      </router-link>
    </div>
  </div>

</template>

<script lang="ts">
import store from "@/store"
import PostModel from "@/state/blog/PostModel"
import { Options, Vue } from "vue-class-component"
import AuthorLink from '@/components/Blog/AuthorLink.vue'

@Options({
  name: "PostList",
  components: {
    AuthorLink
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    showAuthor: {
      type: Boolean,
      required: false,
      default: true,
    }
  }
})

export default class PostList extends Vue {
  showAuthor: boolean = false
  posts: PostModel[] = []

  get publishedPosts(): PostModel[] {
    return store.getters['blog/getPublishedPosts']
  }

  get postsByTag(): PostModel[] {
    return store.getters['blog/getPostsByTag']
  }

  get axiosBaseUrl(): string {
    return store.getters['app/axiosBaseUrl']
  }

  public displayableDate(date: string): string {
    const options: any = { dateStyle: "full", timeStyle: "medium" }
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
  }

}
</script>

<style lang="scss" scoped>
.blog-card {
  small {
    color: $primary-color-4;
  }
}
  .grid-post-list {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }
  .card-body {
    width: 100%;
  }
  .card {
    padding: 0;
  }
  .post {
    border-bottom: 1px solid $primary-color-4;
    padding-bottom: 1rem;
  }
  .post__title {
    font-size: 1.25rem;
  }
  .post__description {
    color: $primary-color-3;
    font-style: italic;
  }
  .post__tags {
    list-style: none;
    font-weight: bold;
    font-size: 0.8125rem;
  }
</style>
