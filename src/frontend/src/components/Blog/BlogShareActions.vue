<template>
  <div class="blog-share-actions-container">
    <!--   :url="`http://localhost:8010${getCurrentPostUrl}`"-->
    <div class="blog-share-actions-network">
      <ShareNetwork
        tag="button"
        class="btn btn-outline-primary btn-floating mx-1 blog-share-actions-network-btn"
        network="facebook"
        url="https://news.vuejs.org/issues/180"
        :title="props.post.title"
        :description="props.post.subtitle"
        quote="DeepWeb"
        :media="props.post.mainImageAbsoluteUrl"
        :hashtags="getPostTagsSeparated(post.tags)"
      >
        <font-awesome-icon class="blog-share-actions-icon facebook" :icon="FacebookIcon" />
      </ShareNetwork>
    </div>

    <div class="blog-share-actions-network">
      <ShareNetwork
        tag="button"
        class="btn btn-outline-primary btn-floating mx-1 blog-share-actions-network-btn"
        network="twitter"
        url="https://news.vuejs.org/issues/180"
        :title="props.post.title"
        :description="props.post.subtitle"
        quote="DeepWeb"
        :media="props.post.mainImageAbsoluteUrl"
        :hashtags="getPostTagsSeparated(post.tags)"
      >
        <font-awesome-icon class="blog-share-actions-icon twitter" :icon="TwitterIcon" />
      </ShareNetwork>
    </div>

    <div class="blog-share-actions-network">
      <ShareNetwork
        tag="button"
        class="btn btn-outline-primary btn-floating mx-1 blog-share-actions-network-btn"
        network="viber"
        url="https://news.vuejs.org/issues/180"
        :title="props.post.title"
        :description="props.post.subtitle"
        quote="DeepWeb"
        :media="props.post.mainImageAbsoluteUrl"
        :hashtags="getPostTagsSeparated(post.tags)"
      >
        <font-awesome-icon class="blog-share-actions-icon viber" :icon="ViberIcon" />
      </ShareNetwork>
    </div>

    <div class="blog-share-actions-network">
      <ShareNetwork
        tag="button"
        class="btn btn-outline-primary btn-floating mx-1 blog-share-actions-network-btn"
        network="email"
        url="https://news.vuejs.org/issues/180"
        :title="props.post.title"
        :description="props.post.subtitle"
        quote="DeepWeb"
        :media="props.post.mainImageAbsoluteUrl"
        :hashtags="getPostTagsSeparated(post.tags)"
      >
        <font-awesome-icon class="blog-share-actions-icon email" :icon="EmailIcon" />
      </ShareNetwork>
    </div>

    <div class="blog-share-actions-network">
      <ShareNetwork
        tag="button"
        class="btn btn-outline-primary btn-floating mx-1 blog-share-actions-network-btn"
        network="linkedin"
        url="https://news.vuejs.org/issues/180"
        :title="props.post.title"
        :description="props.post.subtitle"
        quote="DeepWeb"
        :media="props.post.mainImageAbsoluteUrl"
        :hashtags="getPostTagsSeparated(post.tags)"
      >
        <font-awesome-icon class="blog-share-actions-icon linkedin" :icon="LinkedinIcon" />
      </ShareNetwork>
    </div>

    <div class="blog-share-actions-network">
      <ShareNetwork
        tag="button"
        class="btn btn-outline-primary btn-floating mx-1 blog-share-actions-network-btn"
        network="messenger"
        url="https://news.vuejs.org/issues/180"
        :title="props.post.title"
        :description="props.post.subtitle"
        quote="DeepWeb"
        :media="props.post.mainImageAbsoluteUrl"
        :hashtags="getPostTagsSeparated(post.tags)"
      >
        <font-awesome-icon class="blog-share-actions-icon messenger" :icon="MessengerIcon" />
      </ShareNetwork>
    </div>

    <div class="blog-share-actions-network">
      <ShareNetwork
        tag="button"
        class="btn btn-outline-primary btn-floating mx-1 blog-share-actions-network-btn"
        network="pinterest"
        url="https://news.vuejs.org/issues/180"
        :title="props.post.title"
        :description="props.post.subtitle"
        quote="DeepWeb"
        :media="props.post.mainImageAbsoluteUrl"
        :hashtags="getPostTagsSeparated(post.tags)"
      >
        <font-awesome-icon class="blog-share-actions-icon pinterest" :icon="PinterestIcon" />
      </ShareNetwork>
    </div>

    <div class="blog-share-actions-network">
      <ShareNetwork
        tag="button"
        class="btn btn-outline-primary btn-floating mx-1 blog-share-actions-network-btn"
        network="reddit"
        url="https://news.vuejs.org/issues/180"
        :title="props.post.title"
        :description="props.post.subtitle"
        quote="DeepWeb"
        :media="props.post.mainImageAbsoluteUrl"
        :hashtags="getPostTagsSeparated(post.tags)"
      >
        <font-awesome-icon class="blog-share-actions-icon reddit" :icon="RedditIcon" />
      </ShareNetwork>
    </div>

    <div class="blog-share-actions-network">
      <ShareNetwork
        tag="button"
        class="btn btn-outline-primary btn-floating mx-1 blog-share-actions-network-btn"
        network="skype"
        url="https://news.vuejs.org/issues/180"
        :title="props.post.title"
        :description="props.post.subtitle"
        quote="DeepWeb"
        :media="props.post.mainImageAbsoluteUrl"
        :hashtags="getPostTagsSeparated(post.tags)"
      >
        <font-awesome-icon class="blog-share-actions-icon skype" :icon="SkypeIcon" />
      </ShareNetwork>
    </div>

    <div class="blog-share-actions-network">
      <ShareNetwork
        tag="button"
        class="btn btn-outline-primary btn-floating mx-1 blog-share-actions-network-btn"
        network="sms"
        url="https://news.vuejs.org/issues/180"
        :title="props.post.title"
        :description="props.post.subtitle"
        quote="DeepWeb"
        :media="props.post.mainImageAbsoluteUrl"
        :hashtags="getPostTagsSeparated(post.tags)"
      >
        <font-awesome-icon class="blog-share-actions-icon sms" :icon="SmsIcon" />
      </ShareNetwork>
    </div>

    <div class="blog-share-actions-network">
      <ShareNetwork
        tag="button"
        class="btn btn-outline-primary btn-floating mx-1 blog-share-actions-network-btn"
        network="telegram"
        url="https://news.vuejs.org/issues/180"
        :title="props.post.title"
        :description="props.post.subtitle"
        quote="DeepWeb"
        :media="props.post.mainImageAbsoluteUrl"
        :hashtags="getPostTagsSeparated(post.tags)"
      >
        <font-awesome-icon class="blog-share-actions-icon telegram" :icon="TelegramIcon" />
      </ShareNetwork>
    </div>

    <div class="blog-share-actions-network">
      <ShareNetwork
        tag="button"
        class="btn btn-outline-primary btn-floating mx-1 blog-share-actions-network-btn"
        network="tumblr"
        url="https://news.vuejs.org/issues/180"
        :title="props.post.title"
        :description="props.post.subtitle"
        quote="DeepWeb"
        :media="props.post.mainImageAbsoluteUrl"
        :hashtags="getPostTagsSeparated(post.tags)"
      >
        <font-awesome-icon class="blog-share-actions-icon tumblr" :icon="TumblrIcon" />
      </ShareNetwork>
    </div>

    <div class="blog-share-actions-network">
      <ShareNetwork
        tag="button"
        class="btn btn-outline-primary btn-floating mx-1 blog-share-actions-network-btn"
        network="whatsapp"
        url="https://news.vuejs.org/issues/180"
        :title="props.post.title"
        :description="props.post.subtitle"
        quote="DeepWeb"
        :media="props.post.mainImageAbsoluteUrl"
        :hashtags="getPostTagsSeparated(post.tags)"
      >
        <font-awesome-icon class="blog-share-actions-icon whatsapp" :icon="WhatsAppIcon" />
      </ShareNetwork>
    </div>
  </div>
</template>

<script setup lang="ts">
import { forEach } from 'lodash'
import { useRouter } from 'vue-router'
import BlogTagModel from '@/state/blog/BlogTagModel'
import { MainRouteNames } from '@/routes/Enum/MainRouteNames'
import { faViber } from '@fortawesome/free-brands-svg-icons/faViber'
import { faSkype } from '@fortawesome/free-brands-svg-icons/faSkype'
import { faTumblr } from '@fortawesome/free-brands-svg-icons/faTumblr'
import { faReddit } from '@fortawesome/free-brands-svg-icons/faReddit'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faTelegram } from '@fortawesome/free-brands-svg-icons/faTelegram'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp'
import { faPinterest } from '@fortawesome/free-brands-svg-icons/faPinterest'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger'

const router = useRouter()

const FacebookIcon = faFacebook
const EmailIcon = faEnvelope
const LinkedinIcon = faLinkedin
const MessengerIcon = faFacebookMessenger
const PinterestIcon = faPinterest
const RedditIcon = faReddit
const SkypeIcon = faSkype
const SmsIcon = faComment
const TelegramIcon = faTelegram
const TumblrIcon = faTumblr
const TwitterIcon = faTwitter
const ViberIcon = faViber
const WhatsAppIcon = faWhatsapp

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

const getCurrentPostUrl = router.resolve({
  name: MainRouteNames.POST,
  params: { slug: props.post.slug },
}).href
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Blog/BlogShareActions';
</style>
