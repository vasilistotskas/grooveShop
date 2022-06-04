<template>
  <section
    v-if="allTips && allTips.length > 0"
    id="tips"
  >
    <div />
  </section>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component'
import store from '@/store'
import TipModel from '@/state/tip/TipModel'
import TipCard from '@/components/Tip/TipCard.vue'

@Options({
  name: 'TipSidebar',
  components: {
    TipCard
  },
  props: {

  }
})

export default class TipSidebar extends Vue {

  allTips!:Array<TipModel>

  async created(): Promise<void> {
    await store.dispatch('tip/fetchAllTipsFromRemote').then((response: any) => {
      console.log('eeee', response)
    })
  }

  mounted(): void {
    this.allTips = store.getters['tip/getAllTips']
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Tip/TipSidebar"

</style>
