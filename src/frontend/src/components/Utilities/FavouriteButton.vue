<template>
  <button class="btn-outline-primary-three" data-mdb-ripple-color="dark" title="Favourite Actions" type="button" @click="favouriteHandle()">
    <font-awesome-icon v-if="!isFavourite" :icon="icon" size="2x" />
    <font-awesome-icon v-else :icon="icon" :style="{ color: 'rgba(200,60,60,0.79)' }" size="2x" />
  </button>
</template>

<script lang="ts">
import store from '@/store'
import { some } from 'lodash'
import { useToast } from 'vue-toastification'
import { Options as Component, Vue } from 'vue-class-component'
import { faHeart } from '@fortawesome/free-solid-svg-icons/faHeart'
import FavouriteButtonInterface from '@/components/Utilities/Interface/FavouriteButtonInterface'

const toast = useToast()

@Component({
  name: 'FavouriteButton',
  props: {
    model: {
      type: Object,
      required: true,
    },
    getterType: {
      type: String,
      required: false,
      default: '',
    },
    dispatchType: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: Object,
      required: false,
      default: faHeart,
    },
    useStore: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
export default class FavouriteButton extends Vue implements FavouriteButtonInterface<Record<any, any>> {
  model!: Record<any, any>
  getterType!: string
  dispatchType!: string
  isFavourite = false
  icon = faHeart
  useStore!: boolean

  mounted(): void {
    this.isFavourite = this.getIsFavourite
  }

  get getIsFavourite(): boolean {
    if (this.useStore) {
      return store.getters[this.getterType]
    }
    const likes = this.model.likes
    const userEmail = store.getters['user/getUserData'].email

    return some(likes, { email: userEmail })
  }

  async favouriteHandle(): Promise<void> {
    const IsAuthenticated: boolean = store.getters['auth/isAuthenticated']
    if (!IsAuthenticated) {
      toast.error('You are not logged in')
      return
    }
    await store.dispatch(this.dispatchType, this.model).then((isFavourite: boolean) => {
      this.isFavourite = isFavourite
    })
    this.isFavourite ? toast.success('Added to Favourites') : toast.info('Removed From Favourites')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Blog/BlogFavouriteButton';
</style>
