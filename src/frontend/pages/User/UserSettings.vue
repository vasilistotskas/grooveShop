<template>
  <div></div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { cloneDeep } from 'lodash'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '@/state/auth/auth/AuthModule'
import UserModule from '@/state/user/data/UserModule'
import { exactly, min } from '@/components/Form/Utils'
import RegionsModel from '@/state/country/RegionsModel'
import CountryModel from '@/state/country/CountryModel'
import CountryModule from '@/state/country/CountryModule'
import FormProvider from '@/components/Form/FormProvider.vue'
import FormBaseInput from '@/components/Form/FormBaseInput.vue'
import { Options as Component, Vue } from 'vue-class-component'
import UserProfileModel from '@/state/user/data/UserProfileModel'
import { HTMLElementEvent } from '@/state/common/Types/HelpingTypes'
import FormSubmitButtons from '@/components/Form/FormSubmitButtons.vue'
import UserProfileApiData from '@/state/user/Interface/UserProfileApiData'
import FormValidationErrors from '@/components/Form/FormValidationErrors.vue'

@Component({
  name: 'UserSettings',
  components: {
    FormProvider,
    FormBaseInput,
    FormSubmitButtons,
    FormValidationErrors,
  },
  props: {
    userData: {
      type: Object as PropType<UserProfileModel>,
      required: true,
    },
  },
})
export default class UserSettings extends Vue {
  authModule = getModule(AuthModule)
  countryModule = getModule(CountryModule)
  userModule = getModule(UserModule)
  userProfile = new UserProfileModel()
  userData = new UserProfileModel()
  submitButtonText = 'Update'

  get isAuthenticated(): boolean {
    return this.authModule.isAuthenticated
  }

  get availableCountries(): Array<CountryModel> {
    return this.countryModule.getCountries
  }

  get regionsBasedOnAlpha(): Array<RegionsModel> {
    return this.countryModule.getRegionsBasedOnAlpha
  }

  async mounted(): Promise<void> {
    document.title = 'My Settings'

    this.userProfileInitialize()
  }

  async restRegions(e: HTMLElementEvent<HTMLTextAreaElement>): Promise<void> {
    const countryAlpha2Key = e.target?.value
    await this.countryModule.findRegionsBasedOnAlphaFromInput(countryAlpha2Key)
    this.userProfile.region = 'choose'
  }

  handleSubmit = async () => {}

  public userProfileInitialize(): void {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/User/UserSettings';
</style>
