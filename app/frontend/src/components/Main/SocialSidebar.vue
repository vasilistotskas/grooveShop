<template>
  <ul id="social-sidebar">
    <li>
      <a aria-label="Facebook" class="entypo entypo-facebook" href="https://www.facebook.com/" rel="noopener"
         target="_blank"
      >
        <font-awesome-icon :icon="facebookIcon" :style="{ color: '#4267B2' }" size="lg" />
        <span>Facebook</span>
      </a>
    </li>
    <li>
      <a aria-label="Google" class="entypo entypo-gplus" href="https://www.google.com/" rel="noopener" target="_blank">
        <font-awesome-icon :icon="googleIcon" :style="{ color: '#DB4437' }" size="lg" />
        <span>Google+</span>
      </a>
    </li>
    <li>
      <a aria-label="Twitter" class="entypo entypo-twitter" href="https://www.twitter.com/" rel="noopener"
         target="_blank"
      >
        <font-awesome-icon :icon="twitterIcon" :style="{ color: '#1DA1F2' }" size="lg" />
        <span>Tweeter</span>
      </a>
    </li>
    <li>
      <a aria-label="Instagram" class="entypo entypo-instagram" href="https://www.instagram.com/" rel="noopener"
         target="_blank"
      >
        <font-awesome-icon :icon="instagramIcon" :style="{ color: '#E1306C' }" size="lg" />
        <span>Instagram</span>
      </a>
    </li>
    <li>
      <a aria-label="Linkedin" class="entypo entypo-linkedin" href="https://www.linkedin.com/" rel="noopener"
         target="_blank"
      >
        <font-awesome-icon :icon="linkedinIcon" :style="{ color: '#4267B2' }" size="lg" />
        <span>Linkedin</span>
      </a>
    </li>
    <li>
      <a aria-label="Github" class="entypo entypo-github" href="https://www.github.com/" rel="noopener" target="_blank">
        <font-awesome-icon :icon="githubIcon" :style="{ color: 'white' }" size="lg" />
        <span>Github</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';

@Options({
  name: 'SocialSidebar'
})
export default class SocialSidebar extends Vue {

  get facebookIcon(): typeof faFacebook {
    return faFacebook;
  }

  get googleIcon(): typeof faGoogle {
    return faGoogle;
  }

  get twitterIcon(): typeof faTwitter {
    return faTwitter;
  }

  get instagramIcon(): typeof faInstagram {
    return faInstagram;
  }

  get linkedinIcon(): typeof faLinkedin {
    return faLinkedin;
  }

  get githubIcon(): typeof faGithub {
    return faGithub;
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
        background-color: var(--cp-palette-main-fourth);
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