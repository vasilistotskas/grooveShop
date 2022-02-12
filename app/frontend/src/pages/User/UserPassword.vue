<template>
  <FormProvider id="userPasswordForm"
                :errors="formManager.errors"
                :form="formManager.form"
                name="userPasswordForm"
                title=""
                @submit="handleSubmit()"
  >
    <div class="grid-account-password-fields">
      <div class="current_password">
        <label :for="formManager.form.current_password.$uid" class="label">Current Password</label>
        <FormBaseInput
            :id="formManager.form.current_password.$uid"
            v-model="formManager.form.current_password.$value"
            :has-error="formManager.form.current_password.$hasError"
            :placeholder="'Current Password'"
            :validating="formManager.form.current_password.$validating"
            type="password"
        />
        <FormValidationErrors
            :errors="formManager.form.current_password.$errors"
            class="validation-errros"
        />
      </div>
      <div class="new_password">
        <label :for="formManager.form.new_password.$uid" class="label">New Password</label>
        <FormBaseInput
            :id="formManager.form.new_password.$uid"
            v-model="formManager.form.new_password.$value"
            :has-error="formManager.form.new_password.$hasError"
            :placeholder="'New Password'"
            :validating="formManager.form.new_password.$validating"
            type="password"
        />
        <FormValidationErrors
            :errors="formManager.form.new_password.$errors"
            class="validation-errros"
        />
      </div>
      <div class="re_new_password">
        <label :for="formManager.form.re_new_password.$uid" class="label">Retype New Password</label>
        <FormBaseInput
            :id="formManager.form.re_new_password.$uid"
            v-model="formManager.form.re_new_password.$value"
            :has-error="formManager.form.re_new_password.$hasError"
            :placeholder="'Retype New Password'"
            :validating="formManager.form.re_new_password.$validating"
            type="password"
        />
        <FormValidationErrors
            :errors="formManager.form.re_new_password.$errors"
            class="validation-errros"
        />
      </div>
      <div class="button">
        <FormSubmitButtons
            :submit-text="submitButtonText"
            :submitting="formManager.submitting"
            class="buttons float-end"
            gap="2rem"
            @reset="formManager.resetFields()"
        />
      </div>
    </div>
  </FormProvider>

  <button
      class="btn btn-outline-primary-two"
      title="Log Out from all devices"
      @click="clearAllAccountSessions"
  >
    Log Out from all devices
  </button>
</template>

<script lang="ts">

import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import { equal, min } from '@/components/Form/Utils'
import FormProvider from '@/components/Form/FormProvider.vue'
import FormBaseInput from '@/components/Form/FormBaseInput.vue'
import { useValidation, ValidationError } from 'vue3-form-validation'
import FormSubmitButtons from '@/components/Form/FormSubmitButtons.vue'
import FormValidationErrors from '@/components/Form/FormValidationErrors.vue'

let {
  validateFields
} = useValidation({})

@Options({
  name: 'UserPassword',
  components: {
    FormProvider,
    FormBaseInput,
    FormSubmitButtons,
    FormValidationErrors
  },
  props: {
    userData: {
      type: Object,
      required: true
    }
  }
})

export default class UserPassword extends Vue {

  submitButtonText: string = 'Update'

  formManager = {
    validateFields
  } = useValidation({
    current_password: {
      $value: '',
      $rules: [
        min(8)('Password has to be longer than 7 characters')
      ]
    },
    new_password: {
      $value: '',
      $rules: [
        min(8)('Password has to be longer than 7 characters'),
        {
          key: 'pw',
          rule: equal('Passwords do not match')
        }
      ]
    },
    re_new_password: {
      $value: '',
      $rules: [
        min(8)('Password has to be longer than 7 characters'),
        {
          key: 'pw',
          rule: equal('Passwords do not match')
        }
      ]
    }
  })

  handleSubmit = async () => {
    try {
      const formData: any = await validateFields()
      const apiData = {
        current_password: formData.current_password,
        new_password: formData.new_password,
        re_new_password: formData.re_new_password
      }

      await store.dispatch('password/updateUserPassword', apiData)
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message)
      }
    }
  }

  clearAllAccountSessions() {
    store.dispatch('auth/clearAllAccountSessions')
  }

}

</script>

<style lang="scss" scoped>
@import "@/assets/styles/pages/User/UserPassword"

</style>