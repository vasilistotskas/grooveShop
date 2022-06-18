<template>
  <div class="blog-share-actions-container">
    <!--   :url="`http://localhost:8010/blog/${post.slug}`"-->
    <ShareNetwork
      class="btn btn-outline-primary btn-floating mx-1"
      network="facebook"
      url="https://news.vuejs.org/issues/180"
      title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
      description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
      quote="The hot reload is so fast it\'s near instant. - Evan You"
      :media="props.post.mainImageAbsoluteUrl"
      :hashtags="getPostTagsSeparated(post.tags)"
    >
      <font-awesome-icon :icon="facebookIcon" :style="{ color: '#4267B2' }" size="lg" />
      Share on Facebook
    </ShareNetwork>
  </div>
</template>

<script setup lang="ts">
import { forEach } from 'lodash'
import BlogTagModel from '@/state/blog/BlogTagModel'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'

const facebookIcon = faFacebook
const props = defineProps({
  post: {
    type: Object,
    default: () => Object,
  },
})

const getPostTagsSeparated = (tags: Array<BlogTagModel>) => {
  const tagNames: Array<BlogTagModel['name']> = []
  forEach(tags, (tag) => {
    tagNames.push(tag.name)
  })
  return tagNames.join(',')
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Blog/BlogPostCard';
</style>
