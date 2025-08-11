import { defineNuxtModule, addPlugin, createResolver, installModule, addComponentsDir } from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nokipay/ui',
    configKey: 'uiLibrary'
  },
  defaults: {},
  async setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Install Nuxt UI as dependency
    await installModule('@nuxt/ui')

    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
      pathPrefix: true,
      prefix: 'Noki',
      global: true
    })

    addPlugin(resolver.resolve('./runtime/plugin'))
  }
})