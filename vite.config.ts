import { URL, fileURLToPath } from 'node:url'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  base: './',

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/core/style" as *;',
      },
    },
  },

  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: true,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },

  esbuild: {
    // Prevent esbuild convert utf to ascii
    charset: 'utf8',
  },

  optimizeDeps: {
    include: ['vue', 'vant', 'vue-router', '@vueuse/core'],
  },

  server: {
    open: true,
    host: true,
  },

  build: {
    cssCodeSplit: false,
    manifest: true,
  },

  plugins: [
    Vue(),

    splitVendorChunkPlugin(),

    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: ['vue', 'pinia', 'vue-router'],
      eslintrc: {
        enabled: true,
      },
      resolvers: [],
    }),

    Components({
      dts: 'src/components.d.ts',
      resolvers: [VantResolver()],
    }),
  ],
})
