import type { Meta, StoryObj } from '@storybook/vue3'
import Card from './index.vue'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Titre de la card',
    },
    number: {
      control: 'number',
      description: 'Numéro ou identifiant',
    },
    icon: {
      control: 'text',
      description: 'Icône Iconify',
    },
    amount: {
      control: 'number',
      description: 'Montant à afficher',
    },
    variation: {
      control: 'number',
      description: 'Variation en pourcentage',
    },
  },
  args: {
    title: 'Card Title',
    number: 1,
    icon: 'heroicons:chart-bar',
    amount: 1250000,
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    title: 'Solde Total',
    number: 1,
    icon: 'heroicons:banknotes',
    amount: 5678900,
  },
}

export const WithVariation: Story = {
  args: {
    title: 'Revenus du Mois',
    number: 2,
    icon: 'heroicons:arrow-trending-up',
    amount: 12345678,
    variation: 15.5,
  },
}

export const NegativeVariation: Story = {
  args: {
    title: 'Dépenses',
    number: 3,
    icon: 'heroicons:arrow-trending-down',
    amount: 987654,
    variation: -8.2,
  },
}

export const LargeAmount: Story = {
  args: {
    title: 'Transactions Totales',
    number: 4,
    icon: 'heroicons:currency-dollar',
    amount: 987654321,
  },
}

export const AllCards: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <Card 
          title="Solde Total" 
          :number="1" 
          icon="heroicons:banknotes" 
          :amount="5678900" 
        />
        <Card 
          title="Revenus" 
          :number="2" 
          icon="heroicons:arrow-trending-up" 
          :amount="12345678" 
          :variation="15.5" 
        />
        <Card 
          title="Dépenses" 
          :number="3" 
          icon="heroicons:arrow-trending-down" 
          :amount="987654" 
          :variation="-8.2" 
        />
        <Card 
          title="Transactions" 
          :number="4" 
          icon="heroicons:currency-dollar" 
          :amount="987654321" 
        />
      </div>
    `,
  }),
}
