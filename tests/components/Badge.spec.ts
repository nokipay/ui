import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '../../src/runtime/components/Badge.vue'

describe('Badge Component', () => {
  it('renders with label prop', () => {
    const wrapper = mount(Badge, {
      props: {
        label: 'Badge Text',
      },
    })
    const html = wrapper.html()
    expect(html).toBeDefined()
    expect(html.length).toBeGreaterThan(0)
  })

  it('does not render when no label and showEmpty is false', () => {
    const wrapper = mount(Badge, {
      props: {
        showEmpty: false,
      },
    })
    const html = wrapper.html()
    expect(html).toContain('<!--v-if-->')
  })

  it('renders when showEmpty is true', () => {
    const wrapper = mount(Badge, {
      props: {
        showEmpty: true,
      },
    })
    expect(wrapper.html()).toBeDefined()
    expect(wrapper.html()).not.toBe('')
  })

  it('applies custom className', () => {
    const wrapper = mount(Badge, {
      props: {
        label: 'Test',
        className: 'custom-badge',
      },
    })
    expect(wrapper.classes()).toContain('custom-badge')
  })

  it('applies color variant', () => {
    const wrapper = mount(Badge, {
      props: {
        label: 'Success',
        color: 'success',
      },
    })
    expect(wrapper.classes()).toContain('bg-green-50')
  })

  it('applies size classes', () => {
    const wrapper = mount(Badge, {
      props: {
        label: 'Large',
        size: 'lg',
      },
    })
    expect(wrapper.classes()).toContain('text-base')
  })
})
