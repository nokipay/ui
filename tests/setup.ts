import { config } from '@vue/test-utils'

// Configuration globale pour tous les tests
config.global.mocks = {
  $t: (key: string) => key,
  $route: {
    params: {},
    query: {},
  },
}

// Mock pour useNuxtApp si nécessaire
global.useNuxtApp = () => ({
  $api: vi.fn(),
})

