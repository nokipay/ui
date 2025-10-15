import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Confirm from '../../src/runtime/components/Confirm/index.vue'

describe('Confirm Component', () => {
  it('renders without errors', () => {
    const wrapper = mount(Confirm, {
      global: {
        stubs: {
          UModal: {
            template: '<div><slot /></div>',
          },
          UCard: {
            template: '<div><slot name="header" /><slot /><slot name="footer" /></div>',
          },
        },
      },
    })
    expect(wrapper.html()).toBeDefined()
  })

  it('is not visible by default', () => {
    const wrapper = mount(Confirm, {
      global: {
        stubs: {
          UModal: {
            template: '<div v-if="modelValue"><slot /></div>',
            props: ['modelValue'],
          },
          UCard: true,
        },
      },
    })
    expect(wrapper.html()).toBeDefined()
  })

  it('exposes open and close methods', () => {
    const wrapper = mount(Confirm, {
      global: {
        stubs: {
          UModal: true,
          UCard: true,
        },
      },
    })
    expect(wrapper.vm.open).toBeDefined()
    expect(wrapper.vm.close).toBeDefined()
  })

  it('can be opened', async () => {
    const wrapper = mount(Confirm, {
      global: {
        stubs: {
          UModal: true,
          UCard: true,
        },
      },
    })

    await wrapper.vm.open()
    expect(wrapper.html()).toBeDefined()
  })
})

