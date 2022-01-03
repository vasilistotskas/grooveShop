<template>
  <div class="page-sign-up mt-8 mb-5">
    <div class="container">
      <template v-if="registrationLoading">
        loading...
      </template>
      <template v-else-if="!registrationCompleted">
        <div class="card sign-up-card">
          <div class="card-body card-body-border-top">
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
                        :inputWithAddOn="true"
                        :inputWithAddOnIcon="envelopeIcon"
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
                        :inputWithAddOn="true"
                        :inputWithAddOnIcon="keyIcon"
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
                        :inputWithAddOn="true"
                        :inputWithAddOnIcon="keyIcon"
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
                <p class="register-login-field mt-4 mb-4">
                  Or
                  <router-link to="/log-in" aria-label="Log in">click here</router-link>
                  to log in!
                </p>
              </FormProvider>
          </div>
        </div>
      </template>
      <template v-else>
        <div id="registration-complete-view" class="registration-complete-message">
          <span>
            Registration complete. You should receive an email shortly with instructions on how to
            activate your account.
          </span>
          <p class="mt-3" v-if="activationEmailAtLocalStorage">
            If you cant find email check your spam folder , if its not there click
            <span class="registration-resend-action" @click="activationEmailResend">Here</span> to receive new activation email.
          </p>
          <div class="mt-3" v-else>
            <span>If you cant find email check your spam folder , if its not there fill in the form below with the email you just registered</span>
            <form class="mb-3 mt-3" @submit.prevent="submit">
              <div class="form-group">
                <div class="input-group-w-addon">
                <span class="input-group-addon">
                  <font-awesome-icon :icon="envelopeIcon" :style="{ color: '#080808' }"></font-awesome-icon>
                </span>
                  <input v-model="resendMailInputs.email" id="email" name="email" placeholder="email" class="form-control" type="email">
                </div>
              </div>
            </form>
            <button class="btn btn-outline-primary-two" @click="activationEmailResend(resendMailInputs)">
              send email
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store"
import { useToast } from "vue-toastification"
import { Options, Vue } from "vue-class-component"
import BaseInput from "@/components/Form/BaseInput.vue"
import { min, email, equal } from "@/components/Form/Utils"
import FormProvider from "@/components/Form/FormProvider.vue"
import SubmitButtons from "@/components/Form/SubmitButtons.vue"
import ValidationErrors from "@/components/Form/ValidationErrors.vue"
import { useValidation, ValidationError } from 'vue3-form-validation'
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope"
import {faKey} from "@fortawesome/free-solid-svg-icons/faKey";

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

  activationEmailAtLocalStorage = false
  resendMailInputs = {
    email: '',
  }

  mounted() {
    document.title = 'Sign Up'
  }

  updated() {
    const emailFromLocalStorage = store.getters['signup/getRegistrationEmail']
    if (emailFromLocalStorage) this.activationEmailAtLocalStorage = true
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

  get envelopeIcon(): typeof faEnvelope {
    return faEnvelope
  }

  get keyIcon(): typeof faKey {
    return faKey
  }

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

  async activationEmailResend(resendMailInputs: any): Promise<void> {
    let email = ''
    const emailFromLocalStorage = store.getters['signup/getRegistrationEmail']
    const emailFromFormInput = resendMailInputs.email

    if (emailFromLocalStorage) {
      email = emailFromLocalStorage
      this.activationEmailAtLocalStorage = true
    } else {
      email = emailFromFormInput
    }

    await store.dispatch('signup/activationEmailResend', email)
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
      await store.commit('signup/setRegistrationEmail', apiData.email)
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
  #registration-complete-view {
    display: grid;
    justify-content: center;
    align-content: center;
    height: 200px;
    text-align: center;
    span, p {
      color: $primary-color-5;
    }
  }
  .registration-resend-action, .register-login-field a {
    color: $primary-color-2;
    font-weight: 500;
    font-size: 17px;
    &:hover {
      cursor: pointer;
      color:  $primary-color-1!important;
    }
  }
</style>
