const webpack = require('webpack')

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
    css: ['https://unpkg.com/vant/lib/index.css'],
    js: [
      'https://unpkg.com/vue/dist/vue.min.js',
      'https://unpkg.com/vuex/dist/vuex.min.js',
      'https://unpkg.com/vue-router/dist/vue-router.min.js',
      'https://unpkg.com/vant/lib/vant.min.js',
      'https://unpkg.com/axios/dist/axios.min.js',
    ],
  },
}

const plugins = [
  ...(process.env.NODE_ENV === 'production'
    ? [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // no i18n
    ]
    : []),
]

exports.plugins = plugins
exports.externals = externals
exports.cdns = cdns
