<template>
  <div class="page-log-in mt-3 mb-5">
    <div class="container">
      <div class="col-12 col-md-4 mx-auto">
        <div class="card">
          <div class="card-body">
            <FormProvider
                :form="formManager.form"
                :errors="formManager.errors"
                title="Log In"
                @submit="handleSubmit()">
              <div class="container">
                <div class="name">
                  <label :for="formManager.form.name.$uid" class="label">Name</label>
                  <BaseInput
                      v-model="formManager.form.name.$value"
                      :has-error="formManager.form.name.$hasError"
                      :validating="formManager.form.name.$validating"
                      @blur="formManager.form.name.onBlur"
                      placeholder="Alice, Bob, Oscar"
                      :id="formManager.form.name.$uid"/>
                  <ValidationErrors
                      class="validation-errros"
                      :errors="formManager.form.name.$errors"/>
                </div>
                <div class="password">
                  <label :for="formManager.form.password.$uid" class="label">Password</label>
                  <BaseInput
                      v-model="formManager.form.password.$value"
                      :has-error="formManager.form.password.$hasError"
                      @blur="formManager.form.password.onBlur"
                      type="password"
                      :id="formManager.form.password.$uid"/>
                  <ValidationErrors :errors="formManager.form.password.$errors" />
                </div>
                <SubmitButtons
                    class="buttons mt-3 mb-3"
                    gap="2rem"
                    @reset="formManager.resetFields()"
                    :submitting="formManager.submitting"/>
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
                      checked/>
                    <label class="form-check-label" for="form2Example3"> Remember me </label>
                  </div>
                </div>
                <div class="col">
                  <!-- Simple link -->
                  <a href="#!">Forgot password?</a>
                </div>
              </div>
            </FormProvider>

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
import { required } from "@/components/Form/Utils"
import BaseInput from "@/components/Form/BaseInput.vue"
import FormProvider from "@/components/Form/FormProvider.vue"
import SubmitButtons from "@/components/Form/SubmitButtons.vue"
import ValidationErrors from "@/components/Form/ValidationErrors.vue"
import { useValidation, ValidationError } from 'vue3-form-validation'

let {
  form,
  submitting,
  validating,
  errors,
  hasError,
  validateFields,
  resetFields,
  add,
  remove
} = useValidation({})

@Options({
  name: "LogIn",
  components: {
    FormProvider,
    BaseInput,
    SubmitButtons,
    ValidationErrors
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

  formManager = {
    form,
    submitting,
    validating,
    errors,
    hasError,
    validateFields,
    resetFields,
    add,
    remove
  } = useValidation({
    name: {
      $value: "",
      $rules: [
        required("Name is required")
      ]
    },
    password: {
      $value: "",
      $rules: [
        required("Password is required")
      ]
    }
  })

  mounted() {
    document.title = 'Log In'
  }


  handleSubmit = async () => {
    axios.defaults.headers.common["Authorization"] = ""
    localStorage.removeItem("token")

    try {
      const formData = await validateFields()
      const apiData = {
        // @ts-ignore
        username: formData.name,
        // @ts-ignore
        password: formData.password
      }
      await store.dispatch('user/userLogIn', apiData)
          .then((success: any) => {
            store.dispatch('user/data/userDataFromRemote')
          })
          .catch((error: Error) => {
            console.log(error)
          })
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message)
      }
    }
  }
}

</script>
