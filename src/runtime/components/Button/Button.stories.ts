import type { Meta, StoryObj } from '@storybook/vue3'
import NokiButton from './index.vue'

const meta: Meta<typeof NokiButton> = {
  title: 'Components/Button',
  component: NokiButton,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['white', 'green', 'yellow', 'black', 'primary', 'secondary'],
      description: 'Couleur du bouton',
    },
    shadowType: {
      control: 'select',
      options: ['dark', 'soft'],
      description: "Type d'ombre",
    },
    label: {
      control: 'text',
      description: 'Texte du bouton',
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement',
    },
  },
  args: {
    label: 'Button',
    color: 'primary',
    shadowType: 'dark',
    loading: false,
  },
}

export default meta
type Story = StoryObj<typeof NokiButton>

export const Primary: Story = {
  args: {
    color: 'primary',
    label: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    color: 'secondary',
    label: 'Secondary Button',
  },
}

export const Green: Story = {
  args: {
    color: 'green',
    label: 'Green Button',
  },
}

export const White: Story = {
  args: {
    color: 'white',
    label: 'White Button',
  },
}

export const Black: Story = {
  args: {
    color: 'black',
    label: 'Black Button',
  },
}

export const Loading: Story = {
  args: {
    color: 'primary',
    label: 'Loading...',
    loading: true,
  },
}

export const WithSoftShadow: Story = {
  args: {
    color: 'primary',
    label: 'Soft Shadow',
    shadowType: 'soft',
  },
}

export const AllColors: Story = {
  render: () => ({
    components: { NokiButton },
    template: `
      <div class="flex flex-col gap-4 p-6">
        <div class="flex gap-4 flex-wrap">
          <NokiButton color="primary" label="Primary" />
          <NokiButton color="secondary" label="Secondary" />
          <NokiButton color="green" label="Green" />
          <NokiButton color="yellow" label="Yellow" />
          <NokiButton color="white" label="White" />
          <NokiButton color="black" label="Black" />
        </div>
        <div class="flex gap-4 flex-wrap">
          <NokiButton color="primary" label="Loading" :loading="true" />
          <NokiButton color="secondary" label="Loading" :loading="true" />
        </div>
      </div>
    `,
  }),
}
