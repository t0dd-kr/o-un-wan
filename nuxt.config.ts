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
    ['@nuxtjs/tailwindcss', { viewer: true }],
    '@vueuse/nuxt',
    'nuxt-icon',
  ],
  alias: {
    // basic aliases
    '@/': '/',
    '@assets/': '/assets/',
    '@composables/': '/composables/',
    '@layouts/': '/layouts/',
    '@middleware/': '/middleware/',
    '@plugins/': '/plugins/',
    '@pages/': '/pages/',
    '@views/': '/pages/',
    '@server/': '/server/',

    // aliases with depth
    '@@images/': '/assets/images/',
    '@@fonts/': '/assets/fonts/',
    '@@styles/': '/assets/styles/',

    // alias shortcuts
    'a~/': '/assets/',
    'c~/': '/composables/',
    'l~/': '/layouts/',
    'm~/': '/middleware/',
    'pl~/': '/plugins/',
    'pa~/': '/pages/',
    's~/': '/server/',
  },
})
