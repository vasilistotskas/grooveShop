<template>
  <div class="blog-main-content">
    <div v-if="posts && Object.keys(posts).length > 0" class="grid-post-list">
      <div v-for="post in posts" :key="post.title" class="cardSpecialEffect">
        <RouterLink :to="`/post/${post.slug}`" aria-label="Blog Post">
          <div class="card blog-card">
            <img :alt="post.title" class="img-fluid"
                 v-bind:src="mediaStreamImage('slides', post.mainImageFilename, '476', '268')">
            <div class="card-body">
              <span class="card-title">{{ post.title }}: {{ post.subtitle }}</span>
              <span v-if="showAuthor">
                by <AuthorLink :author="post.author"/>
              </span>
              <p class="card-text">{{ post.metaDescription }}</p>
              <ul class="grid-post-list-tags">
                <li v-for="tag in post.tags" :key="tag.name" class="post__tags">
                  <RouterLink :to="`/tag/${tag.name}`" aria-label="Blog Tag">#{{ tag.name }}</RouterLink>
                </li>
              </ul>
              <small class="text-muted">{{ displayableDate(post.publishDate) }}</small>
            </div>
            <span class="line-1"></span>
            <span class="line-2"></span>
            <span class="line-3"></span>
            <span class="line-4"></span>
          </div>
        </RouterLink>
      </div>
    </div>
    <div v-else>
      <span>No Posts Found</span>
    </div>
    <BlogSidebar :authors="allAuthors" :tags="allTags"/>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import PostModel from '@/state/blog/PostModel';
import { Options, Vue } from 'vue-class-component';
import AuthorLink from '@/components/Blog/AuthorLink.vue';
import BlogSidebar from '@/components/Blog/BlogSidebar.vue';

@Options({
  name: 'PostList',
  components: {
    AuthorLink,
    BlogSidebar
  },
  props: {
    posts: {
      type: Array,
      required: true
    },
    showAuthor: {
      type: Boolean,
      required: false,
      default: true
    }
  }
})

export default class PostList extends Vue {
  showAuthor: boolean = false;
  posts: PostModel[] = [];

  get publishedPosts(): PostModel[] {
    return store.getters['blog/getPublishedPosts'];
  }

  get allTags(): PostModel[] {
    return store.getters['blog/getAllTags'];
  }

  get allAuthors(): PostModel[] {
    return store.getters['blog/getAllAuthors'];
  }

  get postsByTag(): PostModel[] {
    return store.getters['blog/getPostsByTag'];
  }

  get axiosBaseUrl(): string {
    return store.getters['app/axiosBaseUrl'];
  }

  async mounted(): Promise<void> {
    await Promise.all([
      store.dispatch('blog/allTagsFromRemote'),
      store.dispatch('blog/allAuthorsFromRemote')
    ]);
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

<style lang="scss" scoped>
  .blog-card {
    small {
      color: $color-palette-main-fourth;
    }
  }
  .blog-main-content {
    display: grid;
    grid-template-columns: 75% auto;
    gap: 50px;
  }
  .grid-post-list {
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    &-tags {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .card-body {
    width: 100%;
  }
  .card {
    padding: 0;
  }
  .post {
    border-bottom: 1px solid $color-palette-main-fourth;
    padding-bottom: 1rem;
  }
  .post__title {
    font-size: 1.25rem;
  }
  .post__description {
    color: $color-palette-main-third;
    font-style: italic;
  }
  .post__tags {
    list-style: none;
    font-weight: bold;
    font-size: 0.8125rem;
  }
</style>
