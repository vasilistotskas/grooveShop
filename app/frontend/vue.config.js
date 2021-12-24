module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/app.scss";
        `
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  },

  publicPath: "/",
  // outputDir must be added to Django's TEMPLATE_DIRS
  outputDir: './dist/',
  // assetsDir must match Django's STATIC_URL
  assetsDir: 'static/static/',
}
