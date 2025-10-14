import type { Meta, StoryObj } from '@storybook/vue3'
import Badge from '../Badge.vue'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texte du badge',
    },
    color: {
      control: 'select',
      options: [
        'success',
        'warning',
        'error',
        'info',
        'default',
        'purple',
        'pink',
        'orange',
        'teal',
        'gray',
      ],
      description: 'Couleur du badge',
    },
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline'],
      description: 'Variant du badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du badge',
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Poids de la police',
    },
  },
  args: {
    label: 'Badge',
    color: 'success',
    variant: 'soft',
    size: 'md',
    fontWeight: 'medium',
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Success: Story = {
  args: {
    label: 'Success',
    color: 'success',
  },
}

export const Warning: Story = {
  args: {
    label: 'Warning',
    color: 'warning',
  },
}

export const Error: Story = {
  args: {
    label: 'Error',
    color: 'error',
  },
}

export const Info: Story = {
  args: {
    label: 'Info',
    color: 'info',
  },
}

export const Solid: Story = {
  args: {
    label: 'Solid Badge',
    variant: 'solid',
    color: 'success',
  },
}

export const Outline: Story = {
  args: {
    label: 'Outline Badge',
    variant: 'outline',
    color: 'info',
  },
}

export const Small: Story = {
  args: {
    label: 'Small',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    label: 'Large',
    size: 'lg',
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-col gap-6 p-6">
        <div>
          <h3 class="text-lg font-semibold mb-3">Soft Variants</h3>
          <div class="flex gap-2 flex-wrap">
            <Badge label="Success" color="success" variant="soft" />
            <Badge label="Warning" color="warning" variant="soft" />
            <Badge label="Error" color="error" variant="soft" />
            <Badge label="Info" color="info" variant="soft" />
            <Badge label="Purple" color="purple" variant="soft" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Solid Variants</h3>
          <div class="flex gap-2 flex-wrap">
            <Badge label="Success" color="success" variant="solid" />
            <Badge label="Warning" color="warning" variant="solid" />
            <Badge label="Error" color="error" variant="solid" />
            <Badge label="Info" color="info" variant="solid" />
            <Badge label="Purple" color="purple" variant="solid" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Outline Variants</h3>
          <div class="flex gap-2 flex-wrap">
            <Badge label="Success" color="success" variant="outline" />
            <Badge label="Warning" color="warning" variant="outline" />
            <Badge label="Error" color="error" variant="outline" />
            <Badge label="Info" color="info" variant="outline" />
            <Badge label="Purple" color="purple" variant="outline" />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-3">Sizes</h3>
          <div class="flex gap-2 items-center flex-wrap">
            <Badge label="Small" size="sm" />
            <Badge label="Medium" size="md" />
            <Badge label="Large" size="lg" />
          </div>
        </div>
      </div>
    `,
  }),
}
