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

exports.externals = externals
exports.cdns = cdns
