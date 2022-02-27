import EntityBase from '@/state/common/EntityBase'
import AppSettingsThemeModeOption from '@/state/app/AppSettingsThemeModeOption'
import AppSettingsLocalizationOption from '@/state/app/AppSettingsLocalizationOption'

export default class AppSettings extends EntityBase {
	themeMode = AppSettingsThemeModeOption.Light
	localization = AppSettingsLocalizationOption.Greek
}