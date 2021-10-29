<template>
  <form id="uploadImageForm" name="uploadImageForm" enctype="multipart/form-data">
    <div class="py-11 px-5 text-center mb-5 box">
      <img :src="this.src" class="mb-5 rounded-circle" alt="User Image" width="72" height="72">
      <h2 class="fw-bold">{{this.fullname}}</h2>
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
</template>

<script lang="ts">
import {Options} from "vue-class-component";
import AppBaseLayout from '@/layouts/AppBaseLayout.vue'
import store from '@/store'

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

export default class ProfileImage extends AppBaseLayout {

  updateUserImage() {
    const formEl = document.getElementById('uploadImageForm') as HTMLFormElement;
    const data = new FormData(formEl)
    store.dispatch('updateUserDetailsAction', data)}
}
</script>
