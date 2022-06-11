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
import { Options as Component, Vue } from 'vue-class-component'
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun'
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon'
import AppSettingsThemeModeOption from '@/state/app/AppSettingsThemeModeOption'

@Component({
  name: 'ThemeModeSwitcher'
})
export default class ThemeModeSwitcher extends Vue {

  static sunIcon = faSun
  static moonIcon = faMoon

  static themeModeFromPreference: AppSettingsThemeModeOption = AppSettingsThemeModeOption.light

  static get getThemeMode(): AppSettingsThemeModeOption {
    return store.getters['settings/getSettings'].themeMode
  }

  static get themeModeFromLocalStorage(): AppSettingsThemeModeOption {
    const themeModeFromLocalStorage = localStorage.getItem('themeModeFromLocalStorage') as AppSettingsThemeModeOption

    if (null === themeModeFromLocalStorage) {
      return AppSettingsThemeModeOption.no_theme
    }

    return themeModeFromLocalStorage
  }

  static get themeIconClass(): typeof faMoon | typeof faSun {
    switch (ThemeModeSwitcher.getThemeMode) {
      case AppSettingsThemeModeOption.dark:
        return ThemeModeSwitcher.moonIcon
      case AppSettingsThemeModeOption.light:
      default:
        return ThemeModeSwitcher.sunIcon
    }
  }

  static watch = {
    getThemeMode: (newThemeMode: AppSettingsThemeModeOption, oldThemeMode: AppSettingsThemeModeOption) => {
      ThemeModeSwitcher.switchThemeModeFromTo(oldThemeMode, newThemeMode)
    },
    themeModeFromPreference: () => {
      ThemeModeSwitcher.updateThemeModeFromPreference()
    }
  }

  async created(): Promise<void> {

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      ThemeModeSwitcher.themeModeFromPreference = e.matches ? AppSettingsThemeModeOption.dark : AppSettingsThemeModeOption.light
    })

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      ThemeModeSwitcher.themeModeFromPreference = AppSettingsThemeModeOption.dark
    }
  }

  mounted(): void {
    ThemeModeSwitcher.updateThemeModeFromPreference()
  }

  private static switchThemeModeFromTo(from: AppSettingsThemeModeOption, to: AppSettingsThemeModeOption): void {
    const bodyElement = document.body
    bodyElement.classList.remove(from)
    bodyElement.classList.add(to)

    store.dispatch('app/updateMetaTagElement', {
      'metaName': 'color-scheme',
      'metaAttribute': 'content',
      'newValue': to
    })
  }

  private static updateThemeModeFromLocalStorage(): void {
    store.dispatch('settings/toggleThemeModeFromPreference', ThemeModeSwitcher.themeModeFromLocalStorage).then(
        (themeMode) => ThemeModeSwitcher.updateThemeMode(themeMode)
    )
  }

  private static updateThemeModeFromPreference(): void {
    if (AppSettingsThemeModeOption.no_theme === ThemeModeSwitcher.themeModeFromLocalStorage) {
      store.dispatch('settings/toggleThemeModeFromPreference', ThemeModeSwitcher.themeModeFromPreference).then(
          (themeMode) => ThemeModeSwitcher.updateThemeMode(themeMode)
      )
    } else {
      ThemeModeSwitcher.updateThemeModeFromLocalStorage()
    }
  }

  private static toggleThemeMode(): void {
    store.dispatch('settings/toggleThemeMode').then(
        (themeMode) => ThemeModeSwitcher.updateThemeMode(themeMode)
    )
  }

  private static updateThemeMode(themeMode: AppSettingsThemeModeOption = AppSettingsThemeModeOption.no_theme): void {
    if (AppSettingsThemeModeOption.no_theme === themeMode) {
      themeMode = ThemeModeSwitcher.getThemeMode
    }

    switch (themeMode) {
      case AppSettingsThemeModeOption.dark:
        ThemeModeSwitcher.switchThemeModeFromTo(AppSettingsThemeModeOption.light, AppSettingsThemeModeOption.dark)
        break
      case AppSettingsThemeModeOption.light:
      default:
        ThemeModeSwitcher.switchThemeModeFromTo(AppSettingsThemeModeOption.dark, AppSettingsThemeModeOption.light)
        break
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

