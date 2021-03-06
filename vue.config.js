const path = require('path')
const {
  plugins,
  externals,
  cdns,
} = require('./project.config')
const resolve = (...args) => path.resolve(__dirname, ...args)
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: process.env.BASE_URL || './',

  assetsDir: 'static',

  productionSourceMap: false,

  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/core/style";',
      },
    },
  },

  devServer: {
    open: true,
  },

  configureWebpack: config => {
    config.plugins.push(...plugins)
    isProduction && process.env.VUE_APP_CDN_ENABLE && Object.assign(config, { externals })
  },

  chainWebpack: config => {
    config.resolve.extensions.store.add('.scss')

    // Set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

    // Inject cdns config
    config
      .when(process.env.VUE_APP_CDN_ENABLE, config => {
        config
          .plugin('html')
          .tap(args => {
            args[0].cdn = cdns[isProduction ? 'build' : 'dev']
            return args
          })
      })

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(!isProduction,
        config => config.devtool('cheap-source-map'),
      )
  },
}
