const webpack = require('webpack')
const { resolve } = require('path')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  vant: 'vant',
  axios: 'axios',
}

const cdns = {
  dev: {
    css: [],
    js: [],
  },
  build: {
    css: [
      'https://unpkg.com/vant/lib/index.css',
    ],
    js: [
      'https://unpkg.com/vue/dist/vue.min.js',
      'https://unpkg.com/vuex/dist/vuex.min.js',
      'https://unpkg.com/vue-router/dist/vue-router.min.js',
      'https://unpkg.com/vant/lib/vant.min.js',
      'https://unpkg.com/axios/dist/axios.min.js',
    ],
  },
}

const aliasesConfig = {
  '@': 'src',
  '@assets': 'src/assets',
  '@components': 'src/components',
  '@config': 'src/config',
  '@constants': 'src/constants',
  '@directives': 'src/directives',
  '@filters': 'src/filters',
  '@fonts': 'src/assets/fonts',
  '@icons': 'src/icons',
  '@i18n': 'src/i18n',
  '@images': 'src/assets/images',
  '@plugins': 'src/plugins',
  '@router': 'src/router',
  '@services': 'src/services',
  '@styles': 'src/styles',
  '@store': 'src/store',
  '@utils': 'src/utils',
  '@views': 'src/views',
}

const plugins = [
  ...(process.env.NODE_ENV === 'production'
    ? [
      new ImageminPlugin({
        pngquant: { quality: '65-80' },
        plugins: [
          imageminMozjpeg({
            quality: 70,
            progressive: true,
          }),
        ],
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // no i18n
    ]
    : []),
]

exports.aliases = {}

for (const alias in aliasesConfig) {
  exports.aliases[alias] = resolve(__dirname, aliasesConfig[alias])
}

exports.plugins = plugins
exports.externals = externals
exports.cdns = cdns
