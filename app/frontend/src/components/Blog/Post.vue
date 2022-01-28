<template>
  <div v-if="postBySlug && Object.keys(postBySlug).length > 0" class="container mt-7 mb-5">
    <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
    <div class="card mb-3">
      <img :alt="postBySlug.title" class="img-fluid"
           height="550" :src="mediaStreamImage('slides', postBySlug.mainImageFilename, '1920', '550')" width="1920"
      />
      <div class="card-body">
        <span class="card-title">{{ postBySlug.title }}: {{ postBySlug.subtitle }}</span>
        By
        <AuthorLink :author="postBySlug.author" />
        <p class="card-text">{{ postBySlug.metaDescription }}</p>
        <p class="card-text" v-html="postBySlug.body"></p>
        <p class="card-text"><small class="text-muted">{{ displayableDate(postBySlug.publishDate) }}</small></p>
        <ul>
          <li v-for="tag in postBySlug.tags" :key="tag.name" class="post__tags">
            <RouterLink :to="`/tag/${tag.name}`" :title="tag.name" aria-label="Blog Tag">#{{ tag.name }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import router from '@/routes';
import PostModel from '@/state/blog/PostModel';
import { Options, Vue } from 'vue-class-component';
import AuthorLink from '@/components/Blog/AuthorLink.vue';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue';

@Options({
  name: 'Post',
  components: {
    AuthorLink,
    Breadcrumbs
  }
})

export default class Post extends Vue {

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb;
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params);
  }

  get postBySlug(): PostModel {
    console.log(store.getters['blog/getPostBySlug']);
    return store.getters['blog/getPostBySlug'];
  }

  get axiosBaseUrl(): string {
    return store.getters['app/axiosBaseUrl'];
  }

  async created(): Promise<void> {
    await store.dispatch('blog/postBySlugFromRemote');
  }

  public mediaStreamImage(imageType: string, imageName: string, width?: string, height?: string): string {
    const mediaStreamPath = '/mediastream/media/uploads/';
    const imageNameFileTypeRemove = imageName.substring(0, imageName.lastIndexOf('.')) || imageName;
    return process.env.VUE_APP_API_URL + mediaStreamPath + imageType + '/' + imageNameFileTypeRemove + '/' + width + '/' + height;
  }

  public displayableDate(date: string): string {
    const options: any = { dateStyle: 'full', timeStyle: 'medium' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
  }

}
</script>
