<template>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col" v-for="post in publishedPosts" :key="post.title">
      <router-link :to="`/post/${post.slug}`">
        <div class="card">
          <img v-bind:src="'http://localhost:8000/media/' + post.image" :alt="post.title">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}: {{ post.subtitle }}</h5>
            <span v-if="showAuthor">
              by <AuthorLink :author="post.author" />
            </span>
            <p class="card-text">{{ post.metaDescription }}</p>
            <ul>
              <li class="post__tags" v-for="tag in post.tags" :key="tag.name">
                <router-link :to="`/tag/${tag.name}`">#{{ tag.name }}</router-link>
              </li>
            </ul>
          </div>
          <div class="card-footer">
            <small class="text-muted">{{ displayableDate(post.publishDate) }}</small>
          </div>
        </div>
      </router-link>
    </div>
  </div>

</template>

<script>
import AuthorLink from '@/components/Blog/AuthorLink.vue'
export default {
  name: 'PostList',
  components: {
    AuthorLink,
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
    },
  },
  computed: {
    publishedPosts () {
      return this.posts.filter(post => post.published)
    }
  },
  methods: {
    displayableDate (date) {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(date))
    }
  },
}
</script>

<style>
  .post-list {
    list-style: none;
  }
  .post {
    border-bottom: 1px solid #ccc;
    padding-bottom: 1rem;
  }
  .post__title {
    font-size: 1.25rem;
  }
  .post__description {
    color: #777;
    font-style: italic;
  }
  .post__tags {
    list-style: none;
    font-weight: bold;
    font-size: 0.8125rem;
  }
</style>
