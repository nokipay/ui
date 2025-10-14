import { config } from '@vue/test-utils'

// Configuration globale pour tous les tests
config.global.mocks = {
  $t: (key: string) => key,
  $route: {
    params: {},
    query: {},
  },
}

// Stubs globaux pour les composants @nuxt/ui
config.global.stubs = {
  UButton: {
    template: '<button><slot /></button>',
    props: ['color', 'loading', 'icon', 'label'],
  },
  UBadge: {
    template: '<span><slot /></span>',
    props: ['color', 'variant'],
  },
  UIcon: {
    template: '<i></i>',
    props: ['name', 'size'],
  },
  UModal: {
    template: '<div v-if="modelValue"><slot /></div>',
    props: ['modelValue'],
  },
  UCard: {
    template: '<div><slot name="header" /><slot /><slot name="footer" /></div>',
  },
  UAlert: {
    template: '<div>{{ title }}</div>',
    props: ['title', 'icon', 'color'],
  },
  UTooltip: {
    template: '<div><slot /></div>',
    props: ['text'],
  },
  UInput: {
    template: '<input />',
    props: ['modelValue', 'icon', 'placeholder', 'size'],
  },
  USelectMenu: {
    template: '<select><option v-for="opt in options" :value="opt">{{ opt }}</option></select>',
    props: ['modelValue', 'options'],
  },
  UPagination: {
    template: '<div>Pagination</div>',
    props: ['modelValue', 'total', 'pageCount'],
  },
  NuxtLink: {
    template: '<a><slot /></a>',
    props: ['to'],
  },
}

// Mock pour useNuxtApp si nécessaire
if (typeof global !== 'undefined') {
  global.useNuxtApp = () => ({
    $api: vi.fn(),
  })
}
