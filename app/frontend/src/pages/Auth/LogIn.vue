<template>
  <div class="page-log-in mt-7 mb-5">
    <div class="container">
      <Breadcrumbs :bread-crumb-path="breadCrumbPath" />
      <div class="card login-card">
        <div class="card-body card-body-border-top">
          <FormProvider
            :errors="formManager.errors"
            :form="formManager.form"
            title="Log In"
            @submit="handleSubmit()"
          >
            <div class="container">
              <div class="email mb-3">
                <label :for="formManager.form.email.$uid" class="label mb-2">Email</label>
                <BaseInput
                  :id="formManager.form.email.$uid"
                  v-model="formManager.form.email.$value"
                  :has-error="formManager.form.email.$hasError"
                  :input-with-add-on="true"
                  :input-with-add-on-icon="envelopeIcon"
                  :validating="formManager.form.email.$validating"
                  placeholder="Alice, Bob, Oscar"
                  @blur="formManager.form.email.onBlur"
                />
                <ValidationErrors
                  :errors="formManager.form.email.$errors"
                  class="validation-errros"
                />
              </div>
              <div class="password mb-4">
                <label :for="formManager.form.password.$uid" class="label mb-2">Password</label>
                <BaseInput
                  :id="formManager.form.password.$uid"
                  v-model="formManager.form.password.$value"
                  :has-error="formManager.form.password.$hasError"
                  :input-with-add-on="true"
                  :input-with-add-on-icon="keyIcon"
                  type="password"
                  @blur="formManager.form.password.onBlur"
                />
                <ValidationErrors :errors="formManager.form.password.$errors" />
              </div>
              <SubmitButtons
                :submitting="formManager.submitting"
                class="buttons mt-3 mb-3"
                gap="2rem"
                @reset="formManager.resetFields()"
              />
            </div>

            <!-- 2 column grid layout for inline styling -->
            <div class="login-grid-part-one mb-3">
              <div class="grid-item-one">
                <!-- Checkbox -->
                <div class="form-check">
                  <input
                    id="form2Example3"
                    checked
                    class="form-check-input form-check-input-main"
                    type="checkbox"
                    value=""
                  />
                  <label class="form-check-label" for="form2Example3"> Remember me </label>
                </div>
              </div>
              <div class="grid-item-two">
                <!-- Simple link -->
                <RouterLink to="/password_reset">
                  Forgot password?
                </RouterLink>
              </div>
            </div>
          </FormProvider>

          <!-- Register buttons -->
          <div class="login-register-field">
            <p class="mb-1">
              Not a member?
              <RouterLink aria-label="Sign Up" to="/sign-up">Register</RouterLink>
            </p>
            <p class="mb-3">or sign up with:</p>
          </div>

          <div class="login-grid-part-socials mb-3">
            <!-- Facebook -->
            <a class="btn btn-outline-primary btn-floating mx-1" href="#!" role="button">
              <font-awesome-icon :icon="facebookIcon" :style="{ color: '#4267B2' }" size="lg" />
            </a>

            <!-- Google -->
            <a class="btn btn-outline-primary btn-floating mx-1" href="#!" role="button">
              <font-awesome-icon :icon="googleIcon" :style="{ color: '#DB4437' }" size="lg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import router from '@/routes';
import session from '@/api/session';
import { Options, Vue } from 'vue-class-component';
import { required } from '@/components/Form/Utils';
import BaseInput from '@/components/Form/BaseInput.vue';
import FormProvider from '@/components/Form/FormProvider.vue';
import SubmitButtons from '@/components/Form/SubmitButtons.vue';
import { faKey } from '@fortawesome/free-solid-svg-icons/faKey';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs.vue';
import ValidationErrors from '@/components/Form/ValidationErrors.vue';
import { useValidation, ValidationError } from 'vue3-form-validation';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';

let {
  validateFields
} = useValidation({});

@Options({
  name: 'LogIn',
  components: {
    FormProvider,
    BaseInput,
    SubmitButtons,
    ValidationErrors,
    Breadcrumbs
  }
})

export default class LogIn extends Vue {

  formManager = {
    validateFields
  } = useValidation({
    email: {
      $value: '',
      $rules: [
        required('Email is required')
      ]
    },
    password: {
      $value: '',
      $rules: [
        required('Password is required')
      ]
    }
  });

  get breadCrumbPath(): [] {
    const currentRouteMetaBreadcrumb: any = router.currentRoute.value.meta.breadcrumb;
    return currentRouteMetaBreadcrumb(router.currentRoute.value.params);
  }

  get envelopeIcon(): typeof faEnvelope {
    return faEnvelope;
  }

  get keyIcon(): typeof faKey {
    return faKey;
  }

  get facebookIcon(): typeof faFacebook {
    return faFacebook;
  }

  get googleIcon(): typeof faGoogle {
    return faGoogle;
  }

  mounted() {
    document.title = 'Log In';
  }

  handleSubmit = async () => {
    session.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem('token');

    try {
      const formData: any = await validateFields();
      const apiData = {
        email: formData.email,
        password: formData.password
      };
      await store.dispatch('auth/login', apiData)
        .then(() => {
          store.dispatch('user/data/userDataFromRemote');
        })
        .catch((error: Error) => {
          console.log(error);
        });
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e.message);
      }
    }
  };
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
        align-items: center;
      }
      .grid-item-two {
        a {
          color: $color-palette-main-fifth;
          font-weight: 500;
          font-size: 17px;
          &:hover {
            cursor: pointer;
            color:  $color-palette-main-primary!important;
          }
        }
      }
    }
    &-socials {
      display: grid;
      grid-template-columns: repeat(2,1fr);
      gap: 5px;
      a.btn {
        background: $color-palette-main-fourth;
        padding: 5px;
        border-radius: 5px;
      }
    }
  }
  .login-register-field {
    a {
      color: $color-palette-main-fourth;
      font-weight: 500;
      font-size: 16px;
      &:hover {
        cursor: pointer;
        color:  $color-palette-main-primary!important;
      }
    }
  }
</style>