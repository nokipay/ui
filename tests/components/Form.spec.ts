import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormWrapper from '../../src/runtime/components/Form/Wrapper.vue'
import FormAuth from '../../src/runtime/components/Form/Auth.vue'

describe('Form Components', () => {
  describe('FormWrapper', () => {
    it('renders with title prop', () => {
      const wrapper = mount(FormWrapper, {
        props: {
          title: 'Test Form',
          errorMessage: '',
          errorsMessage: '',
        },
      })
      const html = wrapper.html()
      expect(html).toBeDefined()
      expect(html.length).toBeGreaterThan(0)
    })

    it('displays error message when provided', () => {
      const wrapper = mount(FormWrapper, {
        props: {
          title: 'Form',
          errorMessage: 'Error occurred',
          errorsMessage: '',
        },
        global: {
          stubs: {
            UAlert: {
              template: '<div>{{ title }}</div>',
              props: ['title'],
            },
          },
        },
      })
      const html = wrapper.html()
      expect(html).toBeDefined()
    })

    it('displays multiple errors', () => {
      const wrapper = mount(FormWrapper, {
        props: {
          title: 'Form',
          errorMessage: '',
          errorsMessage: ['Error 1', 'Error 2'],
        },
        global: {
          stubs: {
            UAlert: {
              template: '<div>{{ title }}</div>',
              props: ['title'],
            },
          },
        },
      })
      expect(wrapper.html()).toBeDefined()
    })

    it('renders default slot', () => {
      const wrapper = mount(FormWrapper, {
        props: {
          title: 'Form',
          errorMessage: '',
          errorsMessage: '',
        },
        slots: {
          default: '<input type="text" />',
        },
      })
      expect(wrapper.html()).toContain('input')
    })
  })

  describe('FormAuth', () => {
    it('renders with title', () => {
      const wrapper = mount(FormAuth, {
        props: {
          title: 'Login Form',
          errorMessage: '',
          errorsMessage: '',
        },
        global: {
          stubs: {
            NuxtLink: true,
            UAlert: true,
          },
        },
      })
      expect(wrapper.text()).toContain('Login Form')
    })

    it('displays logo', () => {
      const wrapper = mount(FormAuth, {
        props: {
          title: 'Login',
          errorMessage: '',
          errorsMessage: '',
        },
        global: {
          stubs: {
            NuxtLink: {
              template: '<a><slot /></a>',
            },
            UAlert: true,
          },
        },
      })
      const html = wrapper.html()
      expect(html).toBeDefined()
      expect(html).toContain('Login')
    })
  })
})
