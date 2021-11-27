<template>
  <div class="card">
    <div class="card-body">
      <form id="uploadImageForm" name="uploadImageForm" enctype="multipart/form-data">
        <div class="text-center">
          <img :src="this.src" class="mb-5 rounded-circle" alt="User Image" width="72" height="72">
          <h4 class="fw-bold">{{this.fullname}}</h4>
          <label class="btn btn-primary mt-5" for="image">
            <input
                class="d-none"
                type="file"
                id="image"
                name="image"
                @change="updateUserImage"
            >
            Change Picture
          </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue} from "vue-class-component"

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


  async updateUserImage(): Promise<void> {
    const formEl = document.getElementById('uploadImageForm') as HTMLFormElement;
    const data = new FormData(formEl)
    await store.dispatch('user/data/updateUserDetails', data)
  }

}
</script>
