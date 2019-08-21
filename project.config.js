const webpack = require('webpack')
const { resolve } = require('path')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const {
  NODE_ENV,
  VUE_APP_ANALYZER,
} = process.env

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
  ...(
    NODE_ENV === 'production'
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
  ...(
    VUE_APP_ANALYZER
      ? [
        new BundleAnalyzerPlugin(),
      ]
      : []),
]

exports.aliases = {}

// For eslint-plugin-vue doesn't support eslint v6 currently
// eslint-disable-next-line no-unused-vars
for (const alias in aliasesConfig) {
  exports.aliases[alias] = resolve(__dirname, aliasesConfig[alias])
}

exports.plugins = plugins
