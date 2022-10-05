import { cloneDeep } from 'lodash'
import store from '@/DynamicStore'
import AppSettings from '@/State/App/AppSettings'
import AppBaseModule from '@/State/Common/AppBaseModule'
import { Action, Module, Mutation } from 'vuex-module-decorators'
import AppSettingsUpdatable from '@/State/App/AppSettingsUpdatable'
import AppSettingsThemeModeOption from '@/State/App/AppSettingsThemeModeOption'

@Module({
  dynamic: true,
  namespaced: true,
  store: store,
  stateFactory: true,
  name: 'settings',
})
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
  async toggleThemeMode(): Promise<AppSettingsThemeModeOption> {
    const currentThemeMode = this.context.getters['getSettings'].themeMode
    const nextThemeMode =
      currentThemeMode === AppSettingsThemeModeOption.light
        ? AppSettingsThemeModeOption.dark
        : AppSettingsThemeModeOption.light
    await this.context.dispatch('updateSetting', { key: 'themeMode', value: nextThemeMode })

    localStorage.setItem('themeModeFromLocalStorage', nextThemeMode)

    return nextThemeMode
  }

  @Action
  async toggleThemeModeFromPreference(
    themeModePreference: AppSettingsThemeModeOption
  ): Promise<AppSettingsThemeModeOption> {
    const themeModeFromPreference = themeModePreference

    await this.context.dispatch('updateSetting', {
      key: 'themeMode',
      value: themeModeFromPreference,
    })
    return themeModeFromPreference
  }

  @Action
  async init(): Promise<void> {
    await this.context.dispatch('createUpdatable')
  }

  @Action
  async updateSetting({ key, value }: { key: keyof AppSettings; value: never }): Promise<void> {
    const settings = cloneDeep(this.context.getters['getSettings']) as AppSettings
    settings.themeMode = value

    this.context.commit('setSettings', settings)
    await this.context.dispatch('createUpdatable')
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
