<template>
  <ul id="social-sidebar">
    <li>
      <a
        aria-label="Facebook"
        class="entypo entypo-facebook"
        href="https://www.facebook.com/"
        rel="noopener"
        target="_blank"
        title="Open Facebook"
      >
        <font-awesome-icon :icon="facebookIcon" :style="{ color: '#4267B2' }" size="lg" />
        <span>Facebook</span>
      </a>
    </li>
    <li>
      <a
        aria-label="Google"
        class="entypo entypo-gplus"
        href="https://www.google.com/"
        rel="noopener"
        target="_blank"
        title="Open Google"
      >
        <font-awesome-icon :icon="googleIcon" :style="{ color: '#DB4437' }" size="lg" />
        <span>Google+</span>
      </a>
    </li>
    <li>
      <a
        aria-label="Twitter"
        class="entypo entypo-twitter"
        href="https://www.twitter.com/"
        rel="noopener"
        target="_blank"
        title="Open Twitter"
      >
        <font-awesome-icon :icon="twitterIcon" :style="{ color: '#1DA1F2' }" size="lg" />
        <span>Tweeter</span>
      </a>
    </li>
    <li>
      <a
        aria-label="Instagram"
        class="entypo entypo-instagram"
        href="https://www.instagram.com/"
        rel="noopener"
        target="_blank"
        title="Open Instagram"
      >
        <font-awesome-icon :icon="instagramIcon" :style="{ color: '#E1306C' }" size="lg" />
        <span>Instagram</span>
      </a>
    </li>
    <li>
      <a
        aria-label="Linkedin"
        class="entypo entypo-linkedin"
        href="https://www.linkedin.com/"
        rel="noopener"
        target="_blank"
        title="Open Linkedin"
      >
        <font-awesome-icon :icon="linkedinIcon" :style="{ color: '#4267B2' }" size="lg" />
        <span>Linkedin</span>
      </a>
    </li>
    <li>
      <a
        aria-label="Github"
        class="entypo entypo-github"
        href="https://www.github.com/"
        rel="noopener"
        target="_blank"
        title="Open Github"
      >
        <font-awesome-icon :icon="githubIcon" :style="{ color: 'white' }" size="lg" />
        <span>Github</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Options as Component, Vue } from 'vue-class-component'
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'

@Component({
  name: 'SocialSidebar',
})
export default class SocialSidebar extends Vue {
  facebookIcon = faFacebook
  googleIcon = faGoogle
  twitterIcon = faTwitter
  instagramIcon = faInstagram
  linkedinIcon = faLinkedin
  githubIcon = faGithub
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Main/SocialSidebar';
</style>
