let zlib = require('zlib')

process.env.NODE_ENV = 'development'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // assetsDir must match Django's STATIC_URL
  assetsDir: 'backend/static/',
  // outputDir must be added to Django's TEMPLATE_DIRS
  outputDir: './dist/',
  productionSourceMap: false,

  chainWebpack: (config) => {
    //Minimize the code
    config.optimization.minimize(true)
    //Split the code
    config.optimization.splitChunks({
      chunks: 'all',
    })

    config.module.rule('images').use('image-webpack-loader').loader('image-webpack-loader').options({ bypassOnDebug: true }).end()
  },

  devServer: {
    onBeforeSetupMiddleware({ app }) {
      app.use('*.js', (req, res, next) => {
        if (req.get('Accept-Encoding').includes('gz')) {
          req.url += '.gz'
          res.set('Content-Encoding', 'gz')
          res.set('Content-Type', 'application/javascript; charset=utf-8')
        }
        next()
      })
    },
  },

  transpileDependencies: ['vue-meta'],

  pluginOptions: {
    compression: {
      brotli: {
        filename: '[file].br[query]',
        algorithm: 'brotliCompress',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        minRatio: 0.8,
      },
      gzip: {
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      },
    },
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
      exclude: ['index.html', 'manifest.json', 'robots.txt'],
      // ...other Workbox options...
    },
  },

  configureWebpack: {
    devtool: 'eval-source-map',
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 100000,
      },
    },
  },
}
