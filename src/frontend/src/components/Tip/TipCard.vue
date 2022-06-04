<template>
  <div>

  </div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component'
import store from '@/store'
import TipModel from '@/state/tip/TipModel'

@Options({
  name: 'TipSidebar',
  components: {
  },
  props: {
    tip: {
      type: TipModel,
      required: true
    },
  }
})

export default class TipCard extends Vue {

  tip = new TipModel()


}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Tip/TipCard"

</style>
