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

<script>
import axios from 'axios'
import router from "@/router";

export default {
  name: 'LogIn',
  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  mounted() {
    document.title = 'Log In | grooveShop'
  },
  methods: {
    async submitForm() {
      this.errors = []

      axios.defaults.headers.common["Authorization"] = ""
      localStorage.removeItem("token")

      const formData = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('userLogIn', formData)
          .then(success => {
            router.push('/')
          })
          .catch(error => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`)
              }
              console.log(JSON.stringify(error.response.data))
            } else if (error.message) {
              this.errors.push('Something went wrong. Please try again')

              console.log(JSON.stringify(error))
            }
          })

    }
  }
}
</script>