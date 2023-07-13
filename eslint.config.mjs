// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  svgo: true,
  depend: {
    allowed: ['axios'],
  },
})
