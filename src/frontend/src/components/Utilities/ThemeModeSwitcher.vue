<template>
  <li class="navigation-header-part toggle-dark-mode-part">
    <button
      :aria-label="'Toggle Dark Mode'"
      :title="'Toggle Dark Mode'"
      rel="nofollow"
      class="toggle-dark-mode-button"
      @click="toggleThemeMode()"
    >
      <font-awesome-icon :icon="themeIconClass" size="lg" />
    </button>
  </li>
</template>

<script lang="ts">
import AppModule from '@/state/app/AppModule'
import { getModule } from 'vuex-module-decorators'
import AppSettingsModule from '@/state/app/AppSettingsModule'
import { Options as Component, Vue } from 'vue-class-component'
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun'
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon'
import AppSettingsThemeModeOption from '@/state/app/AppSettingsThemeModeOption'

@Component({
  name: 'ThemeModeSwitcher',
})
export default class ThemeModeSwitcher extends Vue {
  settingsModule = getModule(AppSettingsModule)
  sunIcon = faSun
  moonIcon = faMoon

  themeModeFromPreference: AppSettingsThemeModeOption = AppSettingsThemeModeOption.light

  get getThemeMode(): AppSettingsThemeModeOption {
    return this.settingsModule.getSettings.themeMode
  }

  get themeModeFromLocalStorage(): AppSettingsThemeModeOption {
    const themeModeFromLocalStorage = localStorage.getItem(
      'themeModeFromLocalStorage'
    ) as AppSettingsThemeModeOption

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
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.themeModeFromPreference = e.matches
        ? AppSettingsThemeModeOption.dark
        : AppSettingsThemeModeOption.light
    })

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.themeModeFromPreference = AppSettingsThemeModeOption.dark
    }
  }

  mounted(): void {
    this.updateThemeModeFromPreference()
  }

  private static switchThemeModeFromTo(
    from: AppSettingsThemeModeOption,
    to: AppSettingsThemeModeOption
  ): void {
    const bodyElement = document.body
    bodyElement.classList.remove(from)
    bodyElement.classList.add(to)

    const appModule = getModule(AppModule)
    appModule.updateMetaTagElement({
      metaName: 'color-scheme',
      metaAttribute: 'content',
      newValue: to,
    })
  }

  private updateThemeModeFromLocalStorage(): void {
    this.settingsModule
      .toggleThemeModeFromPreference(this.themeModeFromLocalStorage)
      .then((themeMode) => this.updateThemeMode(themeMode))
  }

  private updateThemeModeFromPreference(): void {
    if (AppSettingsThemeModeOption.no_theme === this.themeModeFromLocalStorage) {
      this.settingsModule
        .toggleThemeModeFromPreference(this.themeModeFromPreference)
        .then((themeMode) => this.updateThemeMode(themeMode))
    } else {
      this.updateThemeModeFromLocalStorage()
    }
  }

  private toggleThemeMode(): void {
    this.settingsModule.toggleThemeMode().then((themeMode) => this.updateThemeMode(themeMode))
  }

  private updateThemeMode(
    themeMode: AppSettingsThemeModeOption = AppSettingsThemeModeOption.no_theme
  ): void {
    if (AppSettingsThemeModeOption.no_theme === themeMode) {
      themeMode = this.getThemeMode
    }

    switch (themeMode) {
      case AppSettingsThemeModeOption.dark:
        ThemeModeSwitcher.switchThemeModeFromTo(
          AppSettingsThemeModeOption.light,
          AppSettingsThemeModeOption.dark
        )
        break
      case AppSettingsThemeModeOption.light:
      default:
        ThemeModeSwitcher.switchThemeModeFromTo(
          AppSettingsThemeModeOption.dark,
          AppSettingsThemeModeOption.light
        )
        break
    }
  }
}
</script>
<style lang="scss" scoped></style>
