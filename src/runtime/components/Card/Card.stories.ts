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
      description: 'Montant à afficher',
    },
    icon: {
      control: 'text',
      description: 'Icône Iconify',
    },
    currency: {
      control: 'text',
      description: 'Devise',
    },
    showCompact: {
      control: 'boolean',
      description: 'Afficher format compact pour grands nombres',
    },
    accentColor: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
      description: "Couleur d'accent du coin décoratif",
    },
    difference: {
      control: 'number',
      description: 'Pourcentage de différence vs période précédente',
    },
    isLoading: {
      control: 'boolean',
      description: 'État de chargement',
    },
    color: {
      control: 'text',
      description: "Couleur du border-top et de l'icône",
    },
    showIcon: {
      control: 'boolean',
      description: "Afficher l'icône",
    },
  },
  args: {
    title: 'Card Title',
    number: 1250000,
    icon: 'heroicons:chart-bar',
    currency: 'FCFA',
    showCompact: true,
    accentColor: 'primary',
    isLoading: false,
    color: 'gray-900',
    showIcon: true,
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    title: 'Solde Total',
    number: 5678900,
    icon: 'heroicons:banknotes',
  },
}

export const WithPositiveDifference: Story = {
  args: {
    title: 'Revenus du Mois',
    number: 12345678,
    icon: 'heroicons:arrow-trending-up',
    difference: 15.5,
    accentColor: 'success',
    color: 'green-600',
  },
}

export const WithNegativeDifference: Story = {
  args: {
    title: 'Dépenses',
    number: 987654,
    icon: 'heroicons:arrow-trending-down',
    difference: -8.2,
    accentColor: 'danger',
    color: 'red-600',
  },
}

export const LargeAmount: Story = {
  args: {
    title: 'Transactions Totales',
    number: 987654321,
    icon: 'heroicons:currency-dollar',
    accentColor: 'primary',
  },
}

export const LoadingState: Story = {
  args: {
    title: 'Chargement...',
    number: 0,
    icon: 'heroicons:arrow-path',
    isLoading: true,
  },
}

export const WithoutIcon: Story = {
  args: {
    title: 'Sans Icône',
    number: 1234567,
    icon: 'heroicons:chart-bar',
    showIcon: false,
  },
}

export const CustomColors: Story = {
  args: {
    title: 'Couleurs Personnalisées',
    number: 9876543,
    icon: 'heroicons:sparkles',
    color: 'purple-600',
    accentColor: 'warning',
  },
}

export const AllCards: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-50">
        <Card 
          title="Solde Total" 
          :number="5678900" 
          icon="heroicons:banknotes" 
        />
        <Card 
          title="Revenus" 
          :number="12345678" 
          icon="heroicons:arrow-trending-up" 
          :difference="15.5"
          accentColor="success"
          color="green-600"
        />
        <Card 
          title="Dépenses" 
          :number="987654" 
          icon="heroicons:arrow-trending-down" 
          :difference="-8.2"
          accentColor="danger"
          color="red-600"
        />
        <Card 
          title="Transactions" 
          :number="987654321" 
          icon="heroicons:currency-dollar" 
        />
        <Card 
          title="Utilisateurs Actifs" 
          :number="45678" 
          icon="heroicons:users" 
          :difference="23.1"
          accentColor="primary"
          color="primary"
        />
        <Card 
          title="Taux de Conversion" 
          :number="89" 
          icon="heroicons:chart-pie" 
          :difference="5.3"
          currency="%"
          :showCompact="false"
          color="teal-600"
        />
        <Card 
          title="Chargement..." 
          :number="0" 
          icon="heroicons:arrow-path" 
          :isLoading="true"
        />
        <Card 
          title="Sans Icône" 
          :number="1234567" 
          icon="heroicons:chart-bar"
          :showIcon="false"
        />
      </div>
    `,
  }),
}
