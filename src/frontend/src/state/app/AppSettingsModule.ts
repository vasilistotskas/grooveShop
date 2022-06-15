import { useI18n } from 'vue-i18n'
import { cloneDeep } from 'lodash'
import AppSettings from '@/state/app/AppSettings'
import AppBaseModule from '@/state/common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import AppSettingsUpdatable from '@/state/app/AppSettingsUpdatable'
import AppSettingsThemeModeOption from '@/state/app/AppSettingsThemeModeOption'
import AppSettingsLocalizationOption from '@/state/app/AppSettingsLocalizationOption'

@Module({ namespaced: true })
export default class AppSettingsModule extends AppBaseModule {
  settings = new AppSettings()
  settingsUpdatable!: AppSettingsUpdatable

  get getSettings(): AppSettings {
    return this.settings
  }

  get getSettingsUpdatable(): AppSettingsUpdatable {
    return this.settingsUpdatable
  }

  @Action
  async toggleLocalization(): Promise<AppSettingsLocalizationOption> {
    const currentLocalization = this.context.getters['getSettings'].localization
    const nextLocalization = currentLocalization === AppSettingsLocalizationOption.English ? AppSettingsLocalizationOption.Greek : AppSettingsLocalizationOption.English
    await this.context.dispatch('updateSetting', { key: 'localization', value: nextLocalization })
    return nextLocalization
  }

  @Action
  async toggleThemeMode(): Promise<AppSettingsThemeModeOption> {
    const currentThemeMode = this.context.getters['getSettings'].themeMode
    const nextThemeMode = currentThemeMode === AppSettingsThemeModeOption.light ? AppSettingsThemeModeOption.dark : AppSettingsThemeModeOption.light
    await this.context.dispatch('updateSetting', { key: 'themeMode', value: nextThemeMode })

    localStorage.setItem('themeModeFromLocalStorage', nextThemeMode)

    return nextThemeMode
  }

  @Action
  async toggleThemeModeFromPreference(themeModePreference: AppSettingsThemeModeOption): Promise<AppSettingsThemeModeOption> {
    const themeModeFromPreference = themeModePreference

    await this.context.dispatch('updateSetting', { key: 'themeMode', value: themeModeFromPreference })
    return themeModeFromPreference
  }

  @Action
  async updateI18n(): Promise<void> {
    const i18n = useI18n()
    i18n.locale.value = this.context.getters['getSettings'].localization
  }

  @Action
  async init(): Promise<void> {
    await this.context.dispatch('createUpdatable')
    await this.context.dispatch('updateI18n')
  }

  @Action
  async updateSetting({ key, value }: { key: keyof AppSettings; value: never }): Promise<void> {
    const settings = cloneDeep(this.context.getters['getSettings']) as AppSettings
    settings.themeMode = value

    this.context.commit('setSettings', settings)
    await this.context.dispatch('createUpdatable')
    if ('localization' === key) {
      await this.context.dispatch('updateI18n')
    }
  }

  @Action
  async createUpdatable(): Promise<void> {
    const settingsUpdatable = new AppSettingsUpdatable()
    await settingsUpdatable.transformFromEntityBase(this.context.getters['getSettings'])
    this.context.commit('setSettingsUpdatable', settingsUpdatable)
  }

  @Mutation
  setSettings(settings: AppSettings): void {
    this.settings = settings
  }

  @Mutation
  setSettingsUpdatable(settingsUpdatable: AppSettingsUpdatable): void {
    this.settingsUpdatable = settingsUpdatable
  }
}
