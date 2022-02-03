import EntityBase from '@/store/common/EntityBase'
import AppSettingsThemeModeOption from '@/store/app/AppSettingsThemeModeOption'
import AppSettingsLocalizationOption from '@/store/app/AppSettingsLocalizationOption'

export default class AppSettings extends EntityBase {
	themeMode = AppSettingsThemeModeOption.Light
	localization = AppSettingsLocalizationOption.Greek
}