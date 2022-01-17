<template>
  <div v-if="src" class="profile-image-grid-container">
    <form id="uploadImageForm" class="profile-image-grid-form" enctype="multipart/form-data" name="uploadImageForm">
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
          />
          <label class="profile-image-label" for="image">
            <input
              id="image"
              class="d-none"
              name="image"
              type="file"
              @change="updateUserImage"
            />
            <font-awesome-icon :icon="cameraIcon" :style="{ color: 'white' }" size="3x" />
          </label>
        </div>
        <div class="profile-fullname-part">
          <RouterLink :to="{ name: 'MyAccount' }" aria-label="MyAccount" class="btn-w-effect">
            <h5>{{ fullname }}</h5>
          </RouterLink>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { Options, Vue } from 'vue-class-component';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';

@Options({
  name: 'ProfileImage',
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

  profileImageHovering: boolean = false;

  get cameraIcon(): typeof faCamera {
    return faCamera;
  }

  async updateUserImage(): Promise<void> {
    const formEl = document.getElementById('uploadImageForm') as HTMLFormElement;
    const data = new FormData(formEl);
    await store.dispatch('user/data/updateUserDetails', data);
  }

}
</script>

<style lang="scss" scoped>
  .profile-image-grid {
    &-container {
      display: grid;
      border-bottom: 1px solid $primary-color-4;
    }
    &-form {
      display: grid;
      grid-template-rows: minmax(90px, 1fr);
      background-color: $primary-color-7;
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
  .profile-fullname-part {
    h5 {
      font-weight: 500;
    }
  }
</style>