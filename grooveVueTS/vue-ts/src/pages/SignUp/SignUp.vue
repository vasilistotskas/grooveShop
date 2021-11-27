<template>
  <div class="page-sign-up mt-3 mb-5">
    <div class="container">
      <div class="col-12 col-md-4 mx-auto">
        <div class="card">
          <div class="card-body">
            <FormProvider
              :form="formManager.form"
              :errors="formManager.errors"
              title="Register"
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
                <ValidationErrors :errors="formManager.form.password.$errors"/>
              </div>

              <div class="confirm-password">
                <label :for="formManager.form.confirmPassword.$uid" class="label">
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
              <SubmitButtons
                  class="buttons"
                  gap="2rem"
                  @reset="formManager.resetFields()"
                  :submitting="formManager.submitting"/>
            </div>
              <p class="mt-4 plr-15">Or <router-link to="/log-in">click here</router-link> to log in!</p>
            </FormProvider>
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
  name: "SignUp",
  components: {
    FormProvider,
    BaseInput,
    SubmitButtons,
    ValidationErrors
  }
})

export default class SignUp extends Vue {

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
    name: {
      $value: "",
      $rules: [
        required("Name is required"),
        min(3)("Name has to be longer than 2 characters"),
        (name: any) =>
            new Promise<void>((resolve, reject) => {
              setTimeout(() => {
                  resolve();
              }, 2000);
            })
      ]
    },
    // email: {
    //   $value: "",
    //   $rules: [email("Please enter a valid email address")]
    // },
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

  handleSubmit = async () => {
    try {
      const formData = await validateFields()
      const apiData = {
        // @ts-ignore
        username: formData.name,
        // @ts-ignore
        password: formData.password
      }
      await store.dispatch('user/userSignUp', apiData)
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

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

</style>
