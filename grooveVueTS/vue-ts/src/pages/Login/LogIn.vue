<template>
  <div class="page-log-in mt-5">
    <div class="container">
      <div class="col-4 mx-auto">
        <h1 class="title mb-5">Log in</h1>

        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" class="input" v-model="username">
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="control">
              <input type="password" class="input" v-model="password">
            </div>
          </div>

          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-dark">Log in</button>
            </div>
          </div>

          Or
          <router-link to="/sign-up">click here</router-link>
          to sign up!
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AppBaseLayout from '@/layouts/AppBaseLayout.vue'
import axios from 'axios'
import router from "@/routes";

@Options({
  name: "LogIn",
  components: {

  },
  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
})

export default class LogIn extends AppBaseLayout {
  username!: string
  password!: string
  errors: Array<any> = []

  async submitForm() {

    axios.defaults.headers.common["Authorization"] = ""
    localStorage.removeItem("token")

    const formData = {
      username: this.username,
      password: this.password
    }
    this.$store.dispatch('user/userLogIn', formData)
        .then((success: any) => {
          router.push('/')
          this.$store.dispatch('user/data/userDataFromRemote')
        })
        .catch((error: Error) => {
          if (error) {
            for (const property in error) {
              this.errors.push(`${error}`)
            }
            console.log(JSON.stringify(error))
          } else if (error) {
            this.errors.push('Something went wrong. Please try again')

            console.log(JSON.stringify(error))
          }
        })

  }
}

</script>