<template>
  <li class="navigation-header-part toggle-dark-mode-part">
    <a
      :aria-label="'Toggle Dark Mode'"
      :title="'Toggle Dark Mode'"
      class="toggle-dark-mode-button"
      href="javascript:void(0);"
      @click="toggleThemeMode()"
    >
      <font-awesome-icon
        :icon="themeIconClass"
        size="lg"
      />
    </a>
  </li>
</template>

<script lang="ts">
import store from '@/store'
import { Options, Vue } from 'vue-class-component'
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun'
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon'
import AppSettingsThemeModeOption from '@/state/app/AppSettingsThemeModeOption'

@Options({
  name: 'ThemeModeSwitcher'
})
export default class ThemeModeSwitcher extends Vue {

  sunIcon = faSun
  moonIcon = faMoon

  themeModeFromPreference: AppSettingsThemeModeOption = AppSettingsThemeModeOption.light

  get getThemeMode(): AppSettingsThemeModeOption {
    return store.getters['settings/getSettings'].themeMode
  }

  get themeModeFromLocalStorage(): AppSettingsThemeModeOption {
    const themeModeFromLocalStorage = localStorage.getItem('themeModeFromLocalStorage') as AppSettingsThemeModeOption

    if (null === themeModeFromLocalStorage) {
      return AppSettingsThemeModeOption.no_theme
    }

    return themeModeFromLocalStorage
  }

  get themeIconClass(): typeof faMoon | typeof faSun {
    switch (this.getThemeMode) {
      case AppSettingsThemeModeOption.dark:
        return this.moonIcon
      case AppSettingsThemeModeOption.light:
      default:
        return this.sunIcon
    }
  }

  async created(): Promise<void> {

    this.$watch(
        () => this.getThemeMode,
        (newThemeMode: AppSettingsThemeModeOption, oldThemeMode: AppSettingsThemeModeOption) => {
          this.switchThemeModeFromTo(oldThemeMode, newThemeMode)
        }
    )

    this.$watch(
        () => this.themeModeFromPreference,
        () => {
          this.updateThemeModeFromPreference()
        }
    )

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.themeModeFromPreference = e.matches ? AppSettingsThemeModeOption.dark : AppSettingsThemeModeOption.light
    })

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.themeModeFromPreference = AppSettingsThemeModeOption.dark
    }
  }

  mounted(): void {
    this.updateThemeModeFromPreference()
  }

  public updateThemeModeFromLocalStorage(): void {
    store.dispatch('settings/toggleThemeModeFromPreference', this.themeModeFromLocalStorage).then(
        (themeMode) => this.updateThemeMode(themeMode)
    )
  }

  public updateThemeModeFromPreference(): void {
    if (AppSettingsThemeModeOption.no_theme === this.themeModeFromLocalStorage) {
      store.dispatch('settings/toggleThemeModeFromPreference', this.themeModeFromPreference).then(
          (themeMode) => this.updateThemeMode(themeMode)
      )
    } else {
      this.updateThemeModeFromLocalStorage()
    }
  }

  public toggleThemeMode(): void {
    store.dispatch('settings/toggleThemeMode').then(
        (themeMode) => this.updateThemeMode(themeMode)
    )
  }


  public updateThemeMode(themeMode: AppSettingsThemeModeOption = AppSettingsThemeModeOption.no_theme): void {
    if (AppSettingsThemeModeOption.no_theme === themeMode) {
      themeMode = this.getThemeMode
    }

    switch (themeMode) {
      case AppSettingsThemeModeOption.dark:
        this.switchThemeModeFromTo(AppSettingsThemeModeOption.light, AppSettingsThemeModeOption.dark)
        break
      case AppSettingsThemeModeOption.light:
      default:
        this.switchThemeModeFromTo(AppSettingsThemeModeOption.dark, AppSettingsThemeModeOption.light)
        break
    }
  }

  public switchThemeModeFromTo(from: AppSettingsThemeModeOption, to: AppSettingsThemeModeOption): void {
    const bodyElement = document.body
    bodyElement.classList.remove(from)
    bodyElement.classList.add(to)
    this.updateMetaTagElement('color-scheme', 'content', to)
  }

  public updateMetaTagElement(metaName: string, metaAttribute: string, newValue: string): void {
    const metaTagElement = <Element>document.querySelector(`meta[name=${ metaName }]`)
    metaTagElement.setAttribute(metaAttribute, newValue)
  }

}
</script>

<style lang="scss" scoped>

</style>

