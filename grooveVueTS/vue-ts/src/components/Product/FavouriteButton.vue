<template>

</template>


<script lang="ts">
import AppBasePage from '@/pages/AppBasePage.vue'
import { Options } from "vue-class-component";

@Options({
  name: "FavouriteButton",
})
export default class FavouriteButton extends AppBasePage {

}

</script>

<style lang="scss">
.favourite-content{
  padding: 8px;
  background: #e4e4e4;
  .fa-heart{ font-size: 20px;
    &.fas{
      color: red;
    }
  }
}
</style>