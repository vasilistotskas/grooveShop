<template>
  <div class="page-sign-up mt-3 mb-5">
    <div class="container">
      <div class="col-4 mx-auto">
        <div class="card">
          <div class="card-body">
          <h1 class="title mb-5 text-center">Sign up</h1>
            <form @submit.prevent="submitForm">
              <div class="form-outline mb-4">
                <label class="form-label">Username</label>
                <div class="control">
                  <input class="form-control" type="text" v-model="username">
                </div>
              </div>

              <div class="form-outline mb-4">
                <label class="form-label">Password</label>
                <div class="control">
                  <input class="form-control" type="password" v-model="password">
                </div>
              </div>

              <div class="form-outline mb-4">
                <label class="form-label">Repeat password</label>
                <div class="control">
                  <input class="form-control" type="password" v-model="password2">
                </div>
              </div>

              <div class="form-outline mb-4">
                <div class="control">
                  <button class="btn btn-primary btn-block mb-4 w-100">Sign up</button>
                </div>
              </div>

              Or
              <router-link to="/log-in">click here</router-link>
              to log in!
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AppBasePage from '@/pages/AppBasePage.vue'
import { Options } from "vue-class-component"
import store from "@/store"
import { useToast } from "vue-toastification"

const toast = useToast()

@Options({
  name: "SignUp"
})

export default class SignUp extends AppBasePage {

  username: string = ''
  password: string = ''
  password2: string = ''
  errors: Array<any> = []

  private async submitForm(): Promise<void> {
    if (this.username === '') {
      this.errors.push('The username is missing')
    }

    if (this.password === '') {
      this.errors.push('The password is too short')
    }

    if (this.password !== this.password2) {
      this.errors.push('The passwords doesn\'t match')
    }

    if (!this.errors.length) {
      const formData = {
        username: this.username,
        password: this.password
      }
      await store.dispatch('user/userSignUp', formData)
    }
    else {
      toast.error(this.errors)
    }
  }
}
</script>
