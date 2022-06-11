<template>
  <section
    v-if="allTips && allTips.length > 0"
    id="tips"
    class="tip-sidebar-section"
  >
    <div class="tip-sidebar-head">
      <span class="tip-sidebar-head-title">
        Η Ασφαλής πλευρά του WEB
      </span>
    </div>
    <div class="tip-sidebar-wrapper">
      <div class="tip-sidebar-content">
        <TipCard
          v-for="tip in allTips"
          :key="tip.id"
          :tip="tip"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">

import TipModel from '@/state/tip/TipModel'
import { Options as Component, Vue } from 'vue-class-component'
import TipCard from '@/components/Tip/TipCard.vue'

@Component({
  name: 'TipSidebar',
  components: {
    TipCard
  },
  props: {
    allTips: {
      type: Array,
      required: true
    }
  }
})

export default class TipSidebar extends Vue {

  allTips!:Array<TipModel>

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Tip/TipSidebar"

</style>
