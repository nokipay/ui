import { defineNuxtModule, createResolver, installModule, addComponentsDir, addPlugin } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "@nokipay/ui",
    configKey: "uiLibrary"
  },
  defaults: {},
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    await installModule("@nuxt/ui");
    addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      pathPrefix: true,
      prefix: "Noki",
      global: true
    });
    addPlugin(resolver.resolve("./runtime/plugin"));
  }
});

export { module as default };
