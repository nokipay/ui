import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import '../playground/assets/css/tailwind.css'

// Configuration globale de Vue pour Storybook
setup((app) => {
  // Ajouter des plugins globaux si nécessaire
  app.config.globalProperties.$t = (key: string) => key
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1f2937',
        },
        {
          name: 'nxpay',
          value: 'linear-gradient(135deg, #77F07F 0%, #3FC995 50%, #40A0AE 100%)',
        },
      ],
    },
    docs: {
      toc: true,
    },
  },
}

export default preview

