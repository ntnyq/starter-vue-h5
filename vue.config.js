const path = require('path')
const {
  aliases,
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
        data: '@import "@styles/core/style";',
      },
    },
  },

  devServer: {
    // port: 12345,
    open: true,
  },

  configureWebpack: config => {
    config.plugins.push(...plugins)
    config.resolve.alias = aliases
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
        config => config.devtool('cheap-source-map')
      )

    config
      .when(isProduction, config => {
        // Remove preload for runtime.js
        config
          .plugin('preload')
          .tap(args => {
            args[0].fileBlacklist.push(/runtime\..*\.js$/)
            return args
          })

        config
          .plugin('ScriptExtHtmlWebpackPlugin')
          .after('html')
          .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          }])
          .end()

        config
          .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial', // only package third parties that are initially dependent
              },
              vantUI: {
                name: 'chunk-vant',
                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                test: /[\\/]node_modules[\\/]_?vant(.*)/, // in order to adapt to cnpm
              },
            },
          })

        config.optimization.runtimeChunk('single')
      })
  },
}
