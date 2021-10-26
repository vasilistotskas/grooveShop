import { Action, Module, Mutation } from 'vuex-module-decorators'
import { useI18n } from "vue-i18n";
import { cloneDeep } from 'lodash'
import AppBaseModule from '@/state/common/AppBaseModule'
import AppSettings from '@/state/app/AppSettings'
import AppSettingsLocalizationOption from '@/state/app/AppSettingsLocalizationOption'

@Module({ namespaced: true })
export default class AppSettingsModule
    extends AppBaseModule
{
    settings = new AppSettings()

    get getSettings(): AppSettings {
        return this.settings
    }

    @Action
    async toggleLocalization(): Promise<AppSettingsLocalizationOption> {
        const currentLocalization = this.context.getters['getSettings'].localization
        const nextLocalization = (currentLocalization === AppSettingsLocalizationOption.English)
            ? AppSettingsLocalizationOption.Greek
            : AppSettingsLocalizationOption.English
        await this.context.dispatch('updateSetting', { key: 'localization', value: nextLocalization })
        return nextLocalization
    }

    @Action
    async updateI18n(): Promise<void> {
        const i18n = useI18n();
        i18n.locale.value = this.context.getters['getSettings'].localization
    }

    @Action
    async init(): Promise<void> {
        await this.context.dispatch('createUpdatable')
        await this.context.dispatch('updateI18n')
    }

    @Action
    async updateSetting({ key, value } : { key: keyof AppSettings, value: never }): Promise<void> {
        const settings = cloneDeep(this.context.getters['getSettings']) as AppSettings
        // Vue.set(settings, key, value)
        this.context.commit('setSettings', settings)
        await this.context.dispatch('createUpdatable')
        if ('localization' === key) {
            await this.context.dispatch('updateI18n')
        }
    }

    @Mutation
    setSettings(settings: AppSettings): void {
        this.settings = settings
    }


}