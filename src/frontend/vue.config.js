process.env.NODE_ENV = 'development'

module.exports = {
  // Default value
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // assetsDir must match Django's STATIC_URL
  assetsDir: 'backend/static/',
  // outputDir must be added to Django's TEMPLATE_DIRS
  outputDir: './dist/',
  productionSourceMap: false,

  transpileDependencies: ['vue-meta'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true,
    },
  },

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'eval-source-map'

      config.output.devtoolModuleFilenameTemplate = (info) =>
        info.resourcePath.match(/^\.\/\S*?\.vue$/)
          ? `webpack-generated:///${info.resourcePath}?${info.hash}`
          : `webpack-yourCode:///${info.resourcePath}`

      config.output.devtoolFallbackModuleFilenameTemplate = 'webpack:///[resource-path]?[hash]'
    }
  },
}
