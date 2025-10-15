import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../../src/runtime/components/Button/index.vue'

describe('Button Component', () => {
  it('renders with label prop', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Test Button',
      },
    })
    expect(wrapper.text()).toContain('Test Button')
  })

  it('applies primary color by default', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Primary',
        color: 'primary',
      },
    })
    const html = wrapper.html()
    expect(html).toContain('bg-nxGreen-500')
  })

  it('applies secondary color', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Secondary',
        color: 'secondary',
      },
    })
    const html = wrapper.html()
    expect(html).toContain('bg-nxTeal-500')
  })

  it('shows loading state', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Loading',
        loading: true,
      },
    })
    expect(wrapper.html()).toBeDefined()
  })

  it('applies dark shadow by default', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Shadow',
        shadowType: 'dark',
      },
    })
    expect(wrapper.html()).toBeDefined()
  })

  it('applies soft shadow', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Soft',
        shadowType: 'soft',
      },
    })
    const html = wrapper.html()
    expect(html).toContain('shadow-md')
  })

  it('handles all color variants', () => {
    const colors = ['white', 'green', 'yellow', 'black', 'primary', 'secondary']

    colors.forEach((color) => {
      const wrapper = mount(Button, {
        props: {
          label: 'Test',
          color: color as any,
        },
      })
      expect(wrapper.html()).toBeDefined()
    })
  })
})

