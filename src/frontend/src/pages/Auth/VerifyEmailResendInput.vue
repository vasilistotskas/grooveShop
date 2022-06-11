<template>
  <div
    id="registration-complete-view"
    class="registration-complete-message container mt-8"
  >
    <div class="registration-complete-message-content">
      <span>Please enter the email with which you registered</span>
      <form
        class="mb-3 mt-3"
        @submit.prevent="submit"
      >
        <div class="form-group">
          <div class="input-group-w-addon">
            <span class="input-group-addon">
              <font-awesome-icon :icon="envelopeIcon" />
            </span>
            <input
              id="email"
              v-model="resendMailInputs.email"
              class="form-control"
              name="email"
              placeholder="email"
              type="email"
            >
          </div>
        </div>
      </form>
      <button
        class="btn btn-outline-primary-two"
        title="Activation Email Resend"
        @click="activationEmailResend(resendMailInputs)"
      >
        send email
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'
import { Options as Component, Vue } from 'vue-class-component'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'

@Component({
  name: 'VerifyEmailResendInput',
  props: {
    activationEmailAtLocalStorage: {
      type: Boolean,
      default: false
    }
  }
})

export default class VerifyEmailResendInput extends Vue {

  activationEmailAtLocalStorage = false
  resendMailInputs = {
    email: ''
  }
  envelopeIcon = faEnvelope

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


}
</script>

<style lang="scss">
@import "@/assets/styles/pages/Auth/VerifyEmailResendInput"

</style>