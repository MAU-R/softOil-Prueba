
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineNuxtConfig({
  css: [
    '~/assets/css/tailwind.css',
    'quasar/src/css/index.sass'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
    "nuxt-quasar-vite"
  ],

});

