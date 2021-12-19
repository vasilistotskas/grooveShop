<template>
  <div class="page-log-in mt-8 mb-5">
    <div class="container">
      <div class="col-12 col-md-4 mx-auto">
        <div class="card login-card">
          <div class="card-body card-body-border-top">
            <FormProvider
                :form="formManager.form"
                :errors="formManager.errors"
                title="Log In"
                @submit="handleSubmit()">
              <div class="container">
                <div class="name mb-3">
                  <label :for="formManager.form.name.$uid" class="label mb-2">Name</label>
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
                <div class="password mb-4">
                  <label :for="formManager.form.password.$uid" class="label mb-2">Password</label>
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
              <div class="login-grid-part-one mb-3">
                <div class="grid-item-one">
                  <!-- Checkbox -->
                  <div class="form-check">
                    <input
                      class="form-check-input form-check-input-main"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                      checked/>
                    <label class="form-check-label" for="form2Example3"> Remember me </label>
                  </div>
                </div>
                <div class="grid-item-two">
                  <!-- Simple link -->
                  <a href="#!">Forgot password?</a>
                </div>
              </div>
            </FormProvider>

            <!-- Register buttons -->
            <div class="text-center">
              <p class="mb-1">Not a member? <router-link to="/sign-up" aria-label="Sign Up">Register</router-link></p>
              <p class="mb-3">or sign up with:</p>
            </div>

            <div class="login-grid-part-socials mb-3">
              <!-- Facebook -->
              <a class="btn btn-outline-primary btn-floating mx-1" href="#!" role="button">
                <font-awesome-icon :icon="['fab', 'facebook']" size="lg" :style="{ color: '#4267B2' }"></font-awesome-icon>
              </a>

              <!-- Google -->
              <a class="btn btn-outline-primary btn-floating mx-1" href="#!" role="button">
                <font-awesome-icon :icon="['fab', 'google']" size="lg" :style="{ color: '#DB4437' }"></font-awesome-icon>
              </a>

              <!-- Twitter -->
              <a class="btn btn-outline-primary btn-floating mx-1" href="#!" role="button">
                <font-awesome-icon :icon="['fab', 'twitter']" size="lg" :style="{ color: '#1DA1F2' }"></font-awesome-icon>
              </a>

              <!-- Github -->
              <a class="btn btn-outline-primary btn-floating mx-1" href="#!" role="button">
                <font-awesome-icon :icon="['fab', 'github']" size="lg" :style="{ color: 'white' }"></font-awesome-icon>
              </a>
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
  }
})

export default class LogIn extends Vue {

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
      const formData:any = await validateFields()
      const apiData = {
        username: formData.name,
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

<style lang="scss" scoped>
  .login-card {
    max-width: 500px;
    display: block;
    margin: 0 auto;
    .card-body {
      grid-template-rows: unset!important;
    }
  }
  .login-grid-part {
    &-one {
      display: grid;
      grid-template-columns: repeat(2,1fr);
      .form-check {
        display: grid;
        grid-template-columns: 20% 80%;
      }
    }
    &-socials {
      display: grid;
      grid-template-columns: repeat(4,1fr);
      gap: 5px;
    }
  }
</style>