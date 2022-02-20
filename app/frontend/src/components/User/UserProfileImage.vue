<template>
  <div v-if="src" class="profile-image-grid-container">
    <form id="uploadImageForm" class="profile-image-grid-form" enctype="multipart/form-data" name="uploadImageForm"
          title="Change Profile Picture">
      <div class="profile-image-grid-content">
        <div :class="{ 'hovering': profileImageHovering }"
             class="profile-image-part"
             @mouseout="profileImageHovering = false"
             @mouseover="profileImageHovering = true"
        >
          <img :src="src"
               alt="User Image"
               class="rounded-circle img-fluid"
               height="110"
               width="110"
               loading="lazy"
          />
          <label class="profile-image-label" for="image">
            <input
                id="image"
                class="d-none"
                name="image"
                type="file"
                @change="updateUserImage"
            />
            <font-awesome-icon :icon="cameraIcon" size="3x"/>
          </label>
        </div>
        <div class="profile-fullname-part">
          <RouterLink :to="{ name: 'UserAccount' }" aria-label="MyAccount" class="btn-w-effect" title="My Account">
            <h5>{{ fullname }}</h5>
          </RouterLink>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'


@Options({
  name: 'UserProfileImage',
  props: {
    fullname: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    }
  }
})

export default class UserProfileImage extends Vue {

  profileImageHovering: boolean = false
  cameraIcon = faCamera

  async updateUserImage(): Promise<void> {
    const formEl = document.getElementById('uploadImageForm') as HTMLFormElement
    const data = new FormData(formEl)
    await store.dispatch('user/data/updateUserDetails', data)
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/components/User/UserProfileImage"

</style>