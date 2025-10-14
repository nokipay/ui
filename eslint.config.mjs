import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import prettier from 'eslint-plugin-prettier/recommended'

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: {
      semi: false,
      quotes: 'single',
    },
  },
  dirs: {
    src: ['./src'],
  },
})
  .append(prettier)
  .override('nuxt/vue/rules', {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
    },
  })
