<template>
  <ul id="social-sidebar">
    <li>
      <a class="entypo entypo-facebook" href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noopener">
        <font-awesome-icon :icon="facebookIcon" size="lg" :style="{ color: '#4267B2' }"></font-awesome-icon>
        <span>Facebook</span>
      </a>
    </li>
    <li>
      <a class="entypo entypo-gplus" href="https://www.google.com/" aria-label="Google" target="_blank" rel="noopener">
        <font-awesome-icon :icon="googleIcon" size="lg" :style="{ color: '#DB4437' }"></font-awesome-icon>
        <span>Google+</span>
      </a>
    </li>
    <li>
      <a class="entypo entypo-twitter" href="https://www.twitter.com/" aria-label="Twitter" target="_blank" rel="noopener">
        <font-awesome-icon :icon="twitterIcon" size="lg" :style="{ color: '#1DA1F2' }"></font-awesome-icon>
        <span>Tweeter</span>
      </a>
    </li>
    <li>
      <a class="entypo entypo-instagram" href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noopener">
        <font-awesome-icon :icon="instagramIcon" size="lg" :style="{ color: '#E1306C' }"></font-awesome-icon>
        <span>Instagram</span>
      </a>
    </li>
    <li>
      <a class="entypo entypo-linkedin" href="https://www.linkedin.com/" aria-label="Linkedin" target="_blank" rel="noopener">
        <font-awesome-icon :icon="linkedinIcon" size="lg" :style="{ color: '#4267B2' }"></font-awesome-icon>
        <span>Linkedin</span>
      </a>
    </li>
    <li>
      <a class="entypo entypo-github" href="https://www.github.com/" aria-label="Github" target="_blank" rel="noopener">
        <font-awesome-icon :icon="githubIcon" size="lg" :style="{ color: 'white' }"></font-awesome-icon>
        <span>Github</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'

@Options({
  name: "SocialSidebar"
})
export default class SocialSidebar extends Vue {

  get facebookIcon(): typeof faFacebook {
    return faFacebook
  }
  get googleIcon(): typeof faGoogle {
    return faGoogle
  }
  get twitterIcon(): typeof faTwitter {
    return faTwitter
  }
  get instagramIcon(): typeof faInstagram {
    return faInstagram
  }
  get linkedinIcon(): typeof faLinkedin {
    return faLinkedin
  }
  get githubIcon(): typeof faGithub {
    return faGithub
  }

}
</script>

<style lang="scss" scoped>
  .entypo {
    transition: all 0.3s ease-in-out;
    svg {
      transition: all 0.3s ease-in-out;
      width: 100% !important;
      height: 100%;
      padding: 10px;
    }
    &:hover {
      transition: all 0.3s ease-in-out;
      svg {
        transition: all 0.3s ease-in-out;
        background-color: $primary-color-5;
        transform: scale(1.01);
        box-shadow: 0 0 8px 1px #ffa1a1;
      }
    }
  }

  #social-sidebar a[class*="twitter"]:hover,
  #social-sidebar a[class*="twitter"] span,
  #social-sidebar a[class*="twitter"] span:before {background: #00aced;}

  #social-sidebar a[class*="facebook"]:hover,
  #social-sidebar a[class*="facebook"] span,
  #social-sidebar a[class*="facebook"] span:before {background: #3B5998;}

  #social-sidebar a[class*="gplus"]:hover,
  #social-sidebar a[class*="gplus"] span,
  #social-sidebar a[class*="gplus"] span:before {background: #E34429;}

  #social-sidebar a[class*="dribbble"]:hover,
  #social-sidebar a[class*="dribbble"] span,
  #social-sidebar a[class*="dribbble"] span:before {background: #ea4c89;}

  #social-sidebar a[class*="dropbox"]:hover,
  #social-sidebar a[class*="dropbox"] span,
  #social-sidebar a[class*="dropbox"] span:before {background: #8DC5F2;}

  #social-sidebar a[class*="github"]:hover,
  #social-sidebar a[class*="github"] span,
  #social-sidebar a[class*="github"] span:before {background: #9C7A5B;}

  #social-sidebar a[class*="evernote"]:hover,
  #social-sidebar a[class*="evernote"] span,
  #social-sidebar a[class*="evernote"] span:before {background: #6BB130;}

  #social-sidebar a[class*="instagram"]:hover,
  #social-sidebar a[class*="instagram"] span,
  #social-sidebar a[class*="instagram"] span:before {background: #e1306c;}

  #social-sidebar a[class*="linkedin"]:hover,
  #social-sidebar a[class*="linkedin"] span,
  #social-sidebar a[class*="linkedin"] span:before {background: #4267b2;}
</style>