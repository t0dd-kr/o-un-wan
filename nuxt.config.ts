import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  modules: [
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'storeToRefs'],
      },
    ],
    ['@nuxtjs/tailwindcss', { viewer: true }],
    'nuxt-icon',
  ],
  imports: {
    dirs: ['store/**/*', 'store/*'],
  },
  runtimeConfig: {
    MONGO_PORT: '27017',
    MONGO_HOST: '127.0.0.1',
    MONGO_USERNAME: 't0dd',
    MONGO_PASSWORD: 't0dd',
    MONGO_DB_NAME: 'ouw',
  },

  ssr: false,
})
