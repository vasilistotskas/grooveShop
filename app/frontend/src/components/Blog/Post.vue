<template>
  <div class="container mt-8 mb-5" v-if="postBySlug && Object.keys(postBySlug).length > 0">
    <div class="card mb-3">
      <img class="img-fluid" v-bind:src="axiosBaseUrl + '/media/' + postBySlug.image" :alt="postBySlug.title">
      <div class="card-body">
        <span class="card-title">{{ postBySlug.title }}: {{ postBySlug.subtitle }}</span>
        By <AuthorLink :author="postBySlug.author" />
        <p class="card-text">{{ postBySlug.metaDescription }}</p>
        <p class="card-text" v-html="postBySlug.body"></p>
        <p class="card-text"><small class="text-muted">{{ displayableDate(postBySlug.publishDate) }}</small></p>
        <ul>
          <li class="post__tags" v-for="tag in postBySlug.tags" :key="tag.name">
            <router-link :to="`/tag/${tag.name}`" aria-label="Blog Tag">#{{ tag.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store"
import PostModel from "@/state/blog/PostModel"
import {Options, Vue} from "vue-class-component"
import AuthorLink from '@/components/Blog/AuthorLink.vue'

@Options({
  name: "Post",
  components: {
    AuthorLink
  }
})

export default class Post extends Vue {

  get postBySlug(): PostModel {
    return store.getters['blog/getPostBySlug']
  }

  get axiosBaseUrl(): string {
    return store.getters['app/axiosBaseUrl']
  }

  async created(): Promise<void> {
    await store.dispatch('blog/postBySlugFromRemote')
  }

  public displayableDate(date: string): string {
    const options: any = { dateStyle: "full", timeStyle: "medium" }
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
  }

}
</script>
