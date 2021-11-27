<template>
  <div class="page-log-in mt-3 mb-5">
    <div class="container">
      <div class="col-4 mx-auto">
        <div class="card">
          <div class="card-body">
            <h1 class="title mb-3 text-center">Log in</h1>
            <form @submit.prevent="submitForm">
              <!-- Email input -->
              <div class="form-outline mb-4">
                <input type="text" id="form2Example1" class="form-control" v-model="username" />
                <label class="form-label" for="form2Example1">Username</label>
              </div>

              <!-- Password input -->
              <div class="form-outline mb-4">
                <input type="password" id="form2Example2" class="form-control" v-model="password" />
                <label class="form-label" for="form2Example2">Password</label>
              </div>
              <!-- 2 column grid layout for inline styling -->
              <div class="row mb-4">
                <div class="col d-flex justify-content-center">
                  <!-- Checkbox -->
                  <div class="form-check">
                    <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="form2Example3"
                            checked
                    />
                    <label class="form-check-label" for="form2Example3"> Remember me </label>
                  </div>
                </div>

                <div class="col">
                  <!-- Simple link -->
                  <a href="#!">Forgot password?</a>
                </div>
              </div>

              <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-block mb-4 w-100">Sign in</button>

              <!-- Register buttons -->
              <div class="text-center">
                <p>Not a member? <router-link to="/sign-up">Register</router-link></p>
                <p>or sign up with:</p>
                <!-- Facebook -->
                <a class="btn btn-primary btn-floating mx-1" style="background-color: #3b5998;" href="#!" role="button"
                ><i class="fab fa-facebook-f"></i
                ></a>

                <!-- Google -->
                <a class="btn btn-primary btn-floating mx-1" style="background-color: #dd4b39;" href="#!" role="button"
                ><i class="fab fa-google"></i
                ></a>

                <!-- Twitter -->
                <a class="btn btn-primary btn-floating mx-1" style="background-color: #55acee;" href="#!" role="button"
                ><i class="fab fa-twitter"></i
                ></a>

                <!-- Github -->
                <a class="btn btn-primary btn-floating mx-1" style="background-color: #333333;" href="#!" role="button"
                ><i class="fab fa-github"></i
                ></a>

              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import store from '@/store'
import { Options, Vue } from "vue-class-component"

@Options({
  name: "LogIn",
  components: {

  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
})

export default class LogIn extends Vue {
  username!: string
  password!: string

  mounted() {
    document.title = 'Log In'
  }

  async submitForm(): Promise<void> {

    axios.defaults.headers.common["Authorization"] = ""
    localStorage.removeItem("token")

    const formData = {
      username: this.username,
      password: this.password
    }

    store.dispatch('user/userLogIn', formData)
        .then((success: any) => {
          store.dispatch('user/data/userDataFromRemote')
        })
        .catch((error: Error) => {
          console.log(error)
        })

  }
}

</script>
