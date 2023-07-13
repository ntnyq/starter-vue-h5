import {
  defineConfig,
  presetIcons,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],

  presets: [
    presetWind4(),
    presetIcons({
      autoInstall: true,
      extraProperties: {},
      scale: 1.2,
    }),
  ],

  shortcuts: [
    {
      'flex-center': 'flex items-center justify-center',
      'wh-full': 'w-full h-full',
    },
  ],
})
