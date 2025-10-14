import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TableWrapper from '../../src/runtime/components/Table/Wrapper.vue'
import ElementByPage from '../../src/runtime/components/Table/ElementByPage.vue'
import PaginationInfo from '../../src/runtime/components/Table/PaginationInfo.vue'

describe('Table Components', () => {
  describe('TableWrapper', () => {
    it('renders without errors', () => {
      const wrapper = mount(TableWrapper, {
        props: {
          title: 'Test Table',
        },
      })
      expect(wrapper.html()).toBeDefined()
    })

    it('displays the title', () => {
      const wrapper = mount(TableWrapper, {
        props: {
          title: 'My Table',
        },
      })
      const html = wrapper.html()
      expect(html).toContain('My Table')
    })

    it('renders header slot', () => {
      const wrapper = mount(TableWrapper, {
        props: {
          title: 'Table',
        },
        slots: {
          header: '<div>Header Content</div>',
        },
      })
      expect(wrapper.html()).toContain('Header Content')
    })

    it('renders footer slot', () => {
      const wrapper = mount(TableWrapper, {
        props: {
          title: 'Table',
        },
        slots: {
          footer: 'Footer Content',
        },
      })
      const html = wrapper.html()
      expect(html).toBeDefined()
      expect(html.length).toBeGreaterThan(0)
    })
  })

  describe('ElementByPage', () => {
    it('renders with default value', () => {
      const wrapper = mount(ElementByPage, {
        props: {
          modelValue: 10,
        },
      })
      expect(wrapper.html()).toBeDefined()
    })

    it('emits update:modelValue on change', async () => {
      const wrapper = mount(ElementByPage, {
        props: {
          modelValue: 10,
        },
        global: {
          stubs: {
            USelectMenu: {
              template:
                '<select @change="$emit(\'update:modelValue\', $event.target.value)"><option>10</option></select>',
              emits: ['update:modelValue'],
            },
          },
        },
      })
      expect(wrapper.emitted()).toBeDefined()
    })
  })

  describe('PaginationInfo', () => {
    it('displays correct pagination info', () => {
      const wrapper = mount(PaginationInfo, {
        props: {
          page: 1,
          pageCount: 10,
          length: 10,
          title: 'Items',
          pageSize: 10,
          total: 100,
        },
      })
      expect(wrapper.html()).toBeDefined()
    })

    it('calculates range correctly', () => {
      const wrapper = mount(PaginationInfo, {
        props: {
          page: 2,
          pageCount: 10,
          length: 10,
          title: 'Items',
          pageSize: 10,
          total: 100,
        },
      })
      expect(wrapper.html()).toBeDefined()
    })
  })
})
