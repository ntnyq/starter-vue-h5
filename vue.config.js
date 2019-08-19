const path = require('path')
const { aliases, plugins } = require('./project.config')
const resolve = (...args) => path.resolve(__dirname, ...args)

module.exports = {
  publicPath: './',

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
  },

  chainWebpack: config => {
    config.resolve.extensions.store.add('.scss')

    // config
    //   .plugin('preload')
    //   .tap(args => {
    //     args[0].fileBlacklist.push(/runtime\..*\.js$/)
    //     return args
    //   })

    // set svg-sprite-loader
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

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
  },
}
