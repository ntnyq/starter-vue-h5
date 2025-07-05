import {
  defineConfig,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],

  presets: [
    presetWind3(),
    presetIcons({
      autoInstall: true,
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
