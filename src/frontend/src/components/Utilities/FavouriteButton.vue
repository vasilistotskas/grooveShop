<template>
  <button
    :class="btnClass"
    data-mdb-ripple-color="dark"
    title="Favourite Actions"
    type="button"
    @click="favouriteHandle()"
  >
    <font-awesome-icon v-if="!isFavourite" :icon="icon" />
    <font-awesome-icon v-else :icon="icon" :style="{ color: 'rgba(200,60,60,0.79)' }" />
  </button>
</template>

<script lang="ts">
import { some } from 'lodash'
import { useToast } from 'vue-toastification'
import UserModule from '@/state/user/data/UserModule'
import AuthModule from '@/state/auth/auth/AuthModule'
import { getModule, VuexModule } from 'vuex-module-decorators'
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
    module: {
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
    btnClass: {
      type: String,
      required: false,
      default: 'btn-outline-primary-three',
    },
  },
})
export default class FavouriteButton
  extends Vue
  implements FavouriteButtonInterface<VuexModule<ThisType<any>, any>>
{
  userModule = getModule(UserModule)
  authModule = getModule(AuthModule)
  model!: Record<string, never>
  module!: any
  getterType!: string
  dispatchType!: string
  isFavourite = false
  icon = faHeart
  useStore!: boolean
  btnClass!: string

  mounted(): void {
    this.isFavourite = this.getIsFavourite
  }

  get getModule() {
    return this.module
  }

  get getIsFavourite(): boolean {
    if (this.useStore) {
      return this.getModule[this.getterType]
    }
    const likes = this.model.likes
    const userEmail = this.userModule.getUserData.email

    return some(likes, { email: userEmail })
  }

  async favouriteHandle(): Promise<void> {
    const IsAuthenticated: boolean = this.authModule.isAuthenticated
    if (!IsAuthenticated) {
      toast.error('You are not logged in')
      return
    }
    await this.getModule[this.dispatchType](this.model).then((isFavourite: boolean) => {
      this.isFavourite = isFavourite
    })
    this.isFavourite ? toast.success('Added to Favourites') : toast.info('Removed From Favourites')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/components/Blog/BlogFavouriteButton';
</style>
