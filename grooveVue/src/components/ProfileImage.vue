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

<script>


import {toast} from "bulma-toast";

export default {
  name: 'ProfileImage',
  props: {
    fullname: '',
    src: ''
  },
  methods: {
    updateUserImage() {
      const data = new FormData(document.getElementById('uploadImageForm'))
      this.$store.dispatch('updateUserDetailsAction', data)
          .then(success => {
            toast({
              message: 'Image updated',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: 'bottom-right',
            })
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>