export default defineNuxtConfig({
  modules: ['../src/module', '@nuxtjs/tailwindcss'],
  
  devtools: { enabled: true },
  
  css: ['~/assets/css/tailwind.css'],
  
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: true,
    viewer: true,
  },
  
  compatibilityDate: '2024-04-03',
  
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
})
