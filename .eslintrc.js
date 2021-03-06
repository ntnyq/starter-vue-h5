module.exports = {
  root: true,
  extends: [
    '@ntnyq/vue',
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
