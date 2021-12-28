<template>
  <div class="profile-image-grid-container" v-if="this.src">
    <form class="profile-image-grid-form" id="uploadImageForm" name="uploadImageForm" enctype="multipart/form-data">
      <div class="profile-image-grid-content">
        <div class="profile-image-part"
             @mouseover="profileImageHovering = true"
             @mouseout="profileImageHovering = false"
             :class="{ 'hovering': profileImageHovering }">
          <img :src="this.src"
               class="rounded-circle img-fluid"
               alt="User Image"
               width="110"
               height="110">
          <label for="image" class="profile-image-label">
            <input
                class="d-none"
                type="file"
                id="image"
                name="image"
                @change="updateUserImage">
            <font-awesome-icon :icon="cameraIcon" size="3x" :style="{ color: 'white' }"></font-awesome-icon>
          </label>
        </div>
        <div class="profile-fullname-part">
          <h5 class="fw-bold">{{this.fullname}}</h5>
        </div>


      </div>
    </form>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue} from "vue-class-component"
import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera"

@Options({
  name: "ProfileImage",
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

export default class ProfileImage extends Vue {

  get cameraIcon(): typeof faCamera {
    return faCamera
  }

  profileImageHovering: boolean = false

  async updateUserImage(): Promise<void> {
    const formEl = document.getElementById('uploadImageForm') as HTMLFormElement;
    const data = new FormData(formEl)
    await store.dispatch('user/data/updateUserDetails', data)
  }

}
</script>

<style lang="scss" scoped>

  .profile-image-grid {

    &-container {
      display: grid;
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 20px;
    }
    &-form {
      display: grid;
      grid-template-rows: minmax(90px, 1fr);
      background-color: white;
      border-radius: 10px;
      gap: 25px;
      justify-content: center;
      align-content: center;
      img.rounded-circle {
        border-radius: 60px;
      }
    }
    &-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      align-items: center;
      position: relative;
      gap: 20px;
      .profile-image-part {
        label.profile-image-label {
          transition: all 0.3s ease-in-out;
          opacity: 0;
          visibility: hidden;
        }
        &:hover {
          img {
            box-shadow: rgb(0 0 0 / 20%) 0 3px 5px -1px, rgb(0 0 0 / 14%) 0 6px 10px 0, rgb(0 0 0 / 12%) 0 1px 18px 0;
          }
          cursor: pointer;
          label.profile-image-label {
            transition: all 0.3s ease-in-out;
            opacity: 1;
            visibility: visible;
          }
        }
      }
      label {
        position: absolute;
        left: 32px;
        top: 30px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>