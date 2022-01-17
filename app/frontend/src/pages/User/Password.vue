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
        <BaseInput
          :id="formManager.form.current_password.$uid"
          v-model="formManager.form.current_password.$value"
          :has-error="formManager.form.current_password.$hasError"
          :placeholder="'Current Password'"
          :validating="formManager.form.current_password.$validating"
          type="password"
        />
        <ValidationErrors
          :errors="formManager.form.current_password.$errors"
          class="validation-errros"
        />
      </div>
      <div class="new_password">
        <label :for="formManager.form.new_password.$uid" class="label">New Password</label>
        <BaseInput
          :id="formManager.form.new_password.$uid"
          v-model="formManager.form.new_password.$value"
          :has-error="formManager.form.new_password.$hasError"
          :placeholder="'New Password'"
          :validating="formManager.form.new_password.$validating"
          type="password"
        />
        <ValidationErrors
          :errors="formManager.form.new_password.$errors"
          class="validation-errros"
        />
      </div>
      <div class="re_new_password">
        <label :for="formManager.form.re_new_password.$uid" class="label">Retype New Password</label>
        <BaseInput
          :id="formManager.form.re_new_password.$uid"
          v-model="formManager.form.re_new_password.$value"
          :has-error="formManager.form.re_new_password.$hasError"
          :placeholder="'Retype New Password'"
          :validating="formManager.form.re_new_password.$validating"
          type="password"
        />
        <ValidationErrors
          :errors="formManager.form.re_new_password.$errors"
          class="validation-errros"
        />
      </div>
      <div class="button">
        <SubmitButtons
          :submit-text="submitButtonText"
          :submitting="formManager.submitting"
          class="buttons float-end"
          gap="2rem"
          @reset="formManager.resetFields()"
        />
      </div>
    </div>
  </FormProvider>
</template>

<script lang="ts">

import store from '@/store';
import { Options, Vue } from 'vue-class-component';
import { equal, min } from '@/components/Form/Utils';
import BaseInput from '@/components/Form/BaseInput.vue';
import FormProvider from '@/components/Form/FormProvider.vue';
import SubmitButtons from '@/components/Form/SubmitButtons.vue';
import ValidationErrors from '@/components/Form/ValidationErrors.vue';
import { useValidation, ValidationError } from 'vue3-form-validation';

let {
  validateFields
} = useValidation({});

@Options({
  name: 'Password',
  components: {
    FormProvider,
    BaseInput,
    SubmitButtons,
    ValidationErrors
  },
  props: {
    userData: {
      type: Object,
      required: true
    }
  }
})

export default class Password extends Vue {

  submitButtonText: string = 'Update';

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
  });

  handleSubmit = async () => {
    try {
      const formData: any = await validateFields();
      const apiData = {
        current_password: formData.current_password,
        new_password: formData.new_password,
        re_new_password: formData.re_new_password
      };

      await store.dispatch('password/updateUserPassword', apiData);
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message);
      }
    }
  };
}

</script>

<style lang="scss" scoped>
  .grid-account-password-fields {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 15px;
    .current_password, .new_password, .re_new_password {
      display: grid;
      gap: 12px;
    }
  }
</style>