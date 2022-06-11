<template>
  <div
    v-if="tip && Object.keys(tip).length > 0"
    class="tip-card-container"
    :style="{ background: tipBackground(tip.type) }"
  >
    <div class="tip-card-wrapper">
      <h4 class="tip-card-title">
        {{ tip.title }}
      </h4>
      <div class="tip-card-content">
        {{ contentShorten(tip.content) }}
      </div>
      <div class="tip-card-icon">
        <GrooveImage
          :alt="tip.title"
          :src="tip.mainImageAbsoluteUrl"
          :use-media-stream="false"
          :img-height="36"
          :img-width="36"
          :class="'tip-card-icon-image'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { helpers } from '@/helpers/main'
import TipModel from '@/state/tip/TipModel'
import { Options as Component, Vue } from 'vue-class-component'
import { TipTypeEnum } from '@/state/tip/Enum/TipEnum'
import GrooveImage from '@/components/Utilities/GrooveImage.vue'

@Component({
  name: 'TipSidebar',
  components: {
    GrooveImage
  },
  props: {
    tip: {
      type: Object,
      required: true
    },
  }
})

export default class TipCard extends Vue {

  tip = new TipModel()

  public contentShorten(content: string): string {
    return helpers.contentShorten(content, 0, 50)
  }

  protected tipBackground(type: TipTypeEnum): string {
    switch(type) {
      case TipTypeEnum.SUCCESS: {
        return 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(142,231,99,1) 100%)'
      }
      case TipTypeEnum.INFO: {
        return 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(16,183,184,1) 100%)'
      }
      case TipTypeEnum.ERROR: {
        return 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(184,16,16,1) 100%)'
      }
      case TipTypeEnum.WARNING: {
        return 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(184,16,16,1) 100%)'
      }
      default: {
        return ''
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Tip/TipCard"

</style>
