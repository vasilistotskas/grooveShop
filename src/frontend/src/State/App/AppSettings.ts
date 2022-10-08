import EntityBase from '@/State/Common/EntityBase'
import AppSettingsThemeModeOption from '@/State/App/AppSettingsThemeModeOption'

export default class AppSettings extends EntityBase {
  themeMode = AppSettingsThemeModeOption.light
}
