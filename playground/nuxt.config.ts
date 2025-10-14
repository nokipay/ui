export default defineNuxtConfig({
  modules: ['../src/module', '@nuxtjs/tailwindcss'],

  devtools: { enabled: true },

  app: {
    head: {
      title: 'NxPay UI Playground',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'NxPay UI Component Playground' },
      ],
    },
  },

  css: ['~/assets/css/tailwind.css'],

  compatibilityDate: '2024-04-03',

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: true,
    viewer: true,
  },
})
