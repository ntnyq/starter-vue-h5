module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['body', /^.van\-/],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
  },
}
