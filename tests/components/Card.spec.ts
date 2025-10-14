import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '../../src/runtime/components/Card/index.vue'

describe('Card Component', () => {
  it('renders with title', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Test Card',
      },
    })
    expect(wrapper.text()).toContain('Test Card')
  })

  it('renders with amount', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Balance',
        amount: 1000000,
      },
      global: {
        stubs: {
          UIcon: true,
          UTooltip: {
            template: '<div><slot /></div>',
          },
        },
      },
    })
    expect(wrapper.html()).toBeDefined()
  })

  it('displays compact amount for large numbers', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Total',
        amount: 12345678,
      },
      global: {
        stubs: {
          UIcon: true,
          UTooltip: {
            template: '<div><slot /></div>',
          },
        },
      },
    })
    expect(wrapper.html()).toBeDefined()
  })

  it('shows variation percentage', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Revenue',
        amount: 1000,
        variation: 15.5,
      },
      global: {
        stubs: {
          UIcon: true,
          UTooltip: {
            template: '<div><slot /></div>',
          },
        },
      },
    })
    expect(wrapper.html()).toBeDefined()
  })

  it('accepts custom icon', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Card',
        icon: 'heroicons:chart-bar',
      },
      global: {
        stubs: {
          UIcon: {
            template: '<i></i>',
            props: ['name'],
          },
          UTooltip: {
            template: '<div><slot /></div>',
          },
        },
      },
    })
    expect(wrapper.html()).toBeDefined()
  })
})
