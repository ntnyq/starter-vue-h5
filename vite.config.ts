import { fileURLToPath, URL } from 'node:url'
import { VantResolver } from '@vant/auto-import-resolver'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Vue(),

    UnoCSS(),

    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue', 'pinia', 'vue-router'],
      resolvers: [VantResolver()],
    }),

    Components({
      dts: 'src/components.d.ts',
      resolvers: [VantResolver()],
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },

  optimizeDeps: {
    include: ['vue', 'vant', 'vue-router', '@vueuse/core'],
  },

  server: {
    open: true,
  },
})
