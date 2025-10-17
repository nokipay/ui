import type { Meta, StoryObj } from '@storybook/vue3'
import AmountDisplay from './AmountDisplay.vue'

const meta: Meta<typeof AmountDisplay> = {
  title: 'Fintech/AmountDisplay',
  component: AmountDisplay,
  tags: ['autodocs'],
  argTypes: {
    amount: {
      control: 'number',
      description: 'Montant à afficher'
    },
    currency: {
      control: 'select',
      options: ['EUR', 'USD', 'GBP', 'XOF', 'XAF'],
      description: 'Code devise ISO'
    },
    locale: {
      control: 'select',
      options: ['fr-FR', 'en-US', 'en-GB'],
      description: 'Locale pour formatage'
    },
    showCurrency: {
      control: 'boolean',
      description: 'Afficher le symbole de devise'
    },
    showDecimals: {
      control: 'boolean',
      description: 'Afficher les décimales'
    },
    currencyPosition: {
      control: 'select',
      options: ['before', 'after'],
      description: 'Position du symbole devise'
    },
    color: {
      control: 'select',
      options: ['default', 'positive', 'negative', 'muted'],
      description: 'Couleur du montant'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Taille du texte'
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Poids de la police'
    }
  }
}

export default meta
type Story = StoryObj<typeof AmountDisplay>

// Default
export const Default: Story = {
  args: {
    amount: 1234.56,
    currency: 'EUR'
  }
}

// Différentes Devises
export const Euro: Story = {
  args: {
    amount: 1234.56,
    currency: 'EUR',
    size: 'lg',
    weight: 'semibold'
  }
}

export const Dollar: Story = {
  args: {
    amount: 1234.56,
    currency: 'USD',
    size: 'lg',
    weight: 'semibold'
  }
}

export const Pound: Story = {
  args: {
    amount: 1234.56,
    currency: 'GBP',
    size: 'lg',
    weight: 'semibold'
  }
}

export const XOF: Story = {
  args: {
    amount: 50000,
    currency: 'XOF',
    size: 'lg',
    weight: 'semibold',
    showDecimals: false
  }
}

// Tailles
export const Sizes: Story = {
  render: () => ({
    components: { AmountDisplay },
    template: `
      <div class="space-y-4">
        <div><AmountDisplay :amount="100" size="xs" /> - Extra Small</div>
        <div><AmountDisplay :amount="100" size="sm" /> - Small</div>
        <div><AmountDisplay :amount="100" size="md" /> - Medium (default)</div>
        <div><AmountDisplay :amount="100" size="lg" /> - Large</div>
        <div><AmountDisplay :amount="100" size="xl" /> - Extra Large</div>
        <div><AmountDisplay :amount="100" size="2xl" /> - 2XL</div>
      </div>
    `
  })
}

// Couleurs
export const Colors: Story = {
  render: () => ({
    components: { AmountDisplay },
    template: `
      <div class="space-y-4 p-4 bg-gray-50">
        <div><AmountDisplay :amount="100" color="default" /> - Default</div>
        <div><AmountDisplay :amount="100" color="positive" /> - Positive (Gain)</div>
        <div><AmountDisplay :amount="-50" color="negative" /> - Negative (Perte)</div>
        <div><AmountDisplay :amount="100" color="muted" /> - Muted</div>
      </div>
    `
  })
}

// Poids
export const Weights: Story = {
  render: () => ({
    components: { AmountDisplay },
    template: `
      <div class="space-y-4">
        <div><AmountDisplay :amount="1234.56" weight="normal" /> - Normal</div>
        <div><AmountDisplay :amount="1234.56" weight="medium" /> - Medium</div>
        <div><AmountDisplay :amount="1234.56" weight="semibold" /> - Semibold</div>
        <div><AmountDisplay :amount="1234.56" weight="bold" /> - Bold</div>
      </div>
    `
  })
}

// Position Devise
export const CurrencyPositions: Story = {
  render: () => ({
    components: { AmountDisplay },
    template: `
      <div class="space-y-4">
        <div>
          <AmountDisplay :amount="100" currency="EUR" currencyPosition="before" />
          - Before (€100)
        </div>
        <div>
          <AmountDisplay :amount="100" currency="EUR" currencyPosition="after" />
          - After (100€)
        </div>
      </div>
    `
  })
}

// Avec/Sans Décimales
export const Decimals: Story = {
  render: () => ({
    components: { AmountDisplay },
    template: `
      <div class="space-y-4">
        <div>
          <AmountDisplay :amount="19.99" :showDecimals="true" />
          - Avec décimales
        </div>
        <div>
          <AmountDisplay :amount="19.99" :showDecimals="false" />
          - Sans décimales
        </div>
      </div>
    `
  })
}

// Cas d'Usage Réels
export const TransactionAmount: Story = {
  args: {
    amount: 149.99,
    currency: 'EUR',
    size: 'xl',
    weight: 'bold',
    color: 'positive'
  },
  decorators: [
    () => ({
      template: `
        <div class="p-6 bg-white rounded-lg shadow-md">
          <p class="text-sm text-gray-500 mb-2">Montant de la transaction</p>
          <story />
        </div>
      `
    })
  ]
}

export const WalletBalance: Story = {
  args: {
    amount: 2543.78,
    currency: 'EUR',
    size: '2xl',
    weight: 'bold',
    color: 'default'
  },
  decorators: [
    () => ({
      template: `
        <div class="p-8 bg-gradient-to-br from-nxGreen-50 to-nxTeal-50 rounded-xl">
          <p class="text-sm text-gray-600 mb-2">Balance disponible</p>
          <story />
        </div>
      `
    })
  ]
}

export const RefundAmount: Story = {
  args: {
    amount: -75.00,
    currency: 'EUR',
    size: 'lg',
    weight: 'semibold',
    color: 'negative'
  },
  decorators: [
    () => ({
      template: `
        <div class="p-6 bg-red-50 rounded-lg border border-red-200">
          <p class="text-sm text-red-600 mb-2">Montant du remboursement</p>
          <story />
        </div>
      `
    })
  ]
}

// Précision Float
export const FloatPrecision: Story = {
  render: () => ({
    components: { AmountDisplay },
    template: `
      <div class="space-y-6 p-6 bg-white rounded-lg shadow">
        <div>
          <p class="text-sm text-gray-500 mb-2">Sans Money class (JavaScript natif)</p>
          <code class="text-red-600">0.1 + 0.2 = {{ 0.1 + 0.2 }}</code>
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-2">Avec Money class (précis)</p>
          <AmountDisplay 
            :amount="0.3" 
            currency="EUR" 
            size="lg" 
            weight="bold" 
            color="positive"
          />
        </div>
      </div>
    `
  })
}

// Comparison Table
export const ComparisonTable: Story = {
  render: () => ({
    components: { AmountDisplay },
    template: `
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Description
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Montant
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4 text-sm text-gray-900">Vente</td>
            <td class="px-6 py-4 text-right">
              <AmountDisplay :amount="1234.56" color="positive" weight="medium" />
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4 text-sm text-gray-900">Frais</td>
            <td class="px-6 py-4 text-right">
              <AmountDisplay :amount="-24.69" color="negative" weight="medium" />
            </td>
          </tr>
          <tr class="bg-gray-50">
            <td class="px-6 py-4 text-sm font-semibold text-gray-900">Total</td>
            <td class="px-6 py-4 text-right">
              <AmountDisplay :amount="1209.87" size="lg" weight="bold" color="positive" />
            </td>
          </tr>
        </tbody>
      </table>
    `
  })
}

