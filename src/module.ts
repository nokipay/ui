import { defineNuxtModule, addPlugin, createResolver, installModule, addComponentsDir } from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nokipay/ui',
    configKey: 'uiLibrary'
  },
  defaults: {},
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      pathPrefix: false,
      prefix: 'Noki',
      global: true
    })

    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})