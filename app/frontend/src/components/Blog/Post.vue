<template>
  <div class="container mt-7 mb-5" v-if="postBySlug && Object.keys(postBySlug).length > 0">
    <Breadcrumbs :breadCrumbPath="breadCrumbPath"></Breadcrumbs>
    <div class="card mb-3">
      <img class="img-fluid" v-bind:src="mediaStreamImage('slides', postBySlug.mainImageFilename, '1920', '550')" :alt="postBySlug.title" width="1920" height="550">
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
import router from "@/routes"
import PostModel from "@/state/blog/PostModel"
import {Options, Vue} from "vue-class-component"
import AuthorLink from '@/components/Blog/AuthorLink.vue'
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs.vue"

@Options({
  name: "Post",
  components: {
    AuthorLink,
    Breadcrumbs
  }
})

export default class Post extends Vue {

  async created(): Promise<void> {
    await store.dispatch('blog/postBySlugFromRemote')
  }

  public mediaStreamImage(imageType: string, imageName: string, width?: string, height?: string): string {
    const mediaStreamPath = '/mediastream/media/uploads/'
    const imageNameFileTypeRemove = imageName.substr(0, imageName.lastIndexOf('.')) || imageName;
    return process.env.VUE_APP_API_URL + mediaStreamPath + imageType + '/'  + imageNameFileTypeRemove + '/' + width + '/' + height
  }

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params)
  }

  get postBySlug(): PostModel {
    console.log(store.getters['blog/getPostBySlug'])
    return store.getters['blog/getPostBySlug']
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
