<template>
  <div class="page-sign-up mt-8 mb-5">
    <div class="container">
      <div class="col-12 col-md-4 mx-auto">
        <div class="card sign-up-card">
          <div class="card-body card-body-border-top">
            <template v-if="registrationLoading">
              loading...
            </template>
            <template v-else-if="!registrationCompleted">
              <FormProvider
                  :form="formManager.form"
                  :errors="formManager.errors"
                  title="Register"
                  @submit="handleSubmit()">
                <div class="container">
                  <div class="email mb-3">
                    <label :for="formManager.form.email.$uid" class="label mb-2">Email</label>
                    <BaseInput
                        v-model="formManager.form.email.$value"
                        :has-error="formManager.form.email.$hasError"
                        :validating="formManager.form.email.$validating"
                        @blur="formManager.form.email.onBlur"
                        placeholder="Alice, Bob, Oscar"
                        :id="formManager.form.email.$uid"/>
                    <ValidationErrors
                        class="validation-errros"
                        :errors="formManager.form.email.$errors"/>
                  </div>
                  <div class="password mb-3">
                    <label :for="formManager.form.password.$uid" class="label mb-2">Password</label>
                    <BaseInput
                        v-model="formManager.form.password.$value"
                        :has-error="formManager.form.password.$hasError"
                        @blur="formManager.form.password.onBlur"
                        type="password"
                        :id="formManager.form.password.$uid"/>
                    <ValidationErrors :errors="formManager.form.password.$errors"/>
                  </div>

                  <div class="confirm-password mb-4">
                    <label :for="formManager.form.confirmPassword.$uid" class="label mb-2">
                      Confirm Password
                    </label>
                    <BaseInput
                        v-model="formManager.form.confirmPassword.$value"
                        :has-error="formManager.form.confirmPassword.$hasError"
                        @blur="formManager.form.confirmPassword.onBlur"
                        type="password"
                        :id="formManager.form.confirmPassword.$uid"/>
                    <ValidationErrors :errors="formManager.form.confirmPassword.$errors"/>
                  </div>
                  <span class="error" v-show="registrationError">
                    An error occured while processing your request.
                  </span>
                  <SubmitButtons
                      class="buttons"
                      gap="2rem"
                      @reset="formManager.resetFields()"
                      :submitting="formManager.submitting"/>
                </div>
                <p class="mt-4 mb-4 plr-15">Or <router-link to="/log-in" aria-label="Log in">click here</router-link> to log in!</p>
              </FormProvider>
            </template>
            <template v-else>
              <div class="registration-complete-message">
                <span>Registration complete. You should receive an email shortly with instructions on how to
                activate your account.</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store"
import { useToast } from "vue-toastification"
import { Options, Vue } from "vue-class-component"
import BaseInput from "@/components/Form/BaseInput.vue"
import FormProvider from "@/components/Form/FormProvider.vue"
import SubmitButtons from "@/components/Form/SubmitButtons.vue"
import ValidationErrors from "@/components/Form/ValidationErrors.vue"
import { useValidation, ValidationError } from 'vue3-form-validation'
import { required, min, email, equal } from "@/components/Form/Utils"

const toast = useToast()

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
  name: "Register",
  components: {
    FormProvider,
    BaseInput,
    SubmitButtons,
    ValidationErrors
  }
})

export default class Register extends Vue {

  mounted() {
    document.title = 'Sign Up'
  }

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
    email: {
      $value: "",
      $rules: [email("Please enter a valid email address")]
    },
    password: {
      $value: "",
      $rules: [
        min(8)("Password has to be longer than 7 characters"),
        {
          key: "pw",
          rule: equal("Passwords do not match")
        }
      ]
    },
    confirmPassword: {
      $value: "",
      $rules: [
        min(8)("Password has to be longer than 7 characters"),
        {
          key: "pw",
          rule: equal("Passwords do not match")
        }
      ]
    }
  })

  get registrationCompleted(): any {
    return store.getters['signup/getRegistrationCompleted']
  }

  get registrationError(): any {
    return store.getters['signup/getRegistrationError']
  }

  get registrationLoading(): any {
    return store.getters['signup/getRegistrationLoading']
  }

  async clearRegistrationStatus(): Promise<void> {
    await store.dispatch('signup/clearRegistrationStatus')
  }

  handleSubmit = async () => {
    try {
      const formData:any = await validateFields()
      const apiData = {
        first_name: 'who',
        last_name: 'me',
        email: formData.email,
        password: formData.password,
        re_password: formData.confirmPassword,
      }
      await store.dispatch('signup/createAccount', apiData)
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message)
      }
    }
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    this.clearRegistrationStatus()
    next()
  }
}
</script>

<style lang="scss" scoped>

.page-sign-up {
  min-height: 500px;
}
.buttons {
  margin-top: 1.25rem;
  grid-area: buttons;
}

.name {
  grid-area: name;
}

.email {
  grid-area: email;
}

.password {
  grid-area: password;
}

.confirm-password {
  grid-area: confirm-password;
}

.sign-up-card {
  max-width: 500px;
  display: block;
  margin: 0 auto;
  .card-body {
    grid-template-rows: unset;
  }
}
.registration-complete-message {
  span {
    color: $primary-color-4;
  }
}
</style>
