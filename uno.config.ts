import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [],

  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      autoInstall: true,
    }),
  ],

  transformers: [transformerDirectives(), transformerVariantGroup()],
})
