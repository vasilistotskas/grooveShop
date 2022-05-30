<template>
  <button
    class="btn-outline-primary-three"
    data-mdb-ripple-color="dark"
    title="Favourite Actions"
    type="button"
    @click="favouriteHandle()"
  >
    <font-awesome-icon
      v-if="!isFavourite"
      :icon="icon"
      size="2x"
    />
    <font-awesome-icon
      v-else
      :icon="icon"
      :style="{ color: 'rgba(200,60,60,0.79)' }"
      size="2x"
    />
  </button>
</template>

<script lang="ts">
import store from '@/store'
import { useToast } from 'vue-toastification'
import { Options, Vue } from 'vue-class-component'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import FavouriteButtonInterface from '@/components/Utilities/Interface/FavouriteButtonInterface'

const toast = useToast()

@Options({
  name: 'FavouriteButton',
  props: {
    model: {
      type: Object,
      required: true
    },
    getterType: {
      type: String,
      required: true
    },
    dispatchType: {
      type: String,
      required: true
    },
    icon: {
      type: Object,
      required: false,
      default: faHeart
    }
  }
})
export default class FavouriteButton extends Vue implements FavouriteButtonInterface<Partial<any>> {

  model!: Partial<any>
  getterType!: string
  dispatchType!: string
  isFavourite = false
  icon = faHeart

  mounted(): void {
    this.isFavourite = store.getters[this.getterType]
    this.computeIsFavourite()
  }

  computeIsFavourite(): void {
    return store.getters[this.getterType]
  }

  async favouriteHandle(): Promise<void> {
    this.isFavourite = await store.dispatch(this.dispatchType, this.model)
    this.isFavourite ? toast.success('Added to Favourites') : toast.info('Removed From Favourites')
  }

}

</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/Blog/BlogFavouriteButton"

</style>
