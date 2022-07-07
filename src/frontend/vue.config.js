process.env.NODE_ENV = 'development'

module.exports = {
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

  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: './src/sw.js',
      compileSrc: true,
      swDest: 'service-worker.js',
      exclude: ['index.html', '/index.html', 'manifest.json', '/manifest.json', 'robots.txt', '/robots.txt', /index\.html$/, /manifest\.html$/, /manifest\.json$/, /robots\.txt$/],
    },
  },
}
