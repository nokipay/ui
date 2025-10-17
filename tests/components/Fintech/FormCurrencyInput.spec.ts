import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FormCurrencyInput from '../../../src/runtime/components/Form/FormCurrencyInput.vue'

describe('FormCurrencyInput Component', () => {
  describe('Basic Rendering', () => {
    it('should render with label', () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          label: 'Montant'
        }
      })
      
      expect(wrapper.text()).toContain('Montant')
    })
    
    it('should display currency symbol', () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          currency: 'EUR'
        }
      })
      
      expect(wrapper.text()).toContain('€')
    })
    
    it('should display currency code', () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          currency: 'EUR',
          showCurrencyCode: true
        }
      })
      
      expect(wrapper.text()).toContain('EUR')
    })
    
    it('should hide currency code when specified', () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          currency: 'EUR',
          showCurrencyCode: false
        }
      })
      
      expect(wrapper.text()).not.toContain('EUR')
    })
  })
  
  describe('Value Display', () => {
    it('should display initial value', () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: 100,
          currency: 'EUR'
        }
      })
      
      const input = wrapper.find('input')
      expect(input.element.value).toContain('100')
    })
    
    it('should format value on blur', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          currency: 'EUR'
        }
      })
      
      const input = wrapper.find('input')
      
      // Saisir une valeur
      await input.setValue('100')
      await input.trigger('blur')
      
      // Should be formatted
      expect(input.element.value).toBeTruthy()
    })
    
    it('should handle decimal input', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          currency: 'EUR'
        }
      })
      
      const input = wrapper.find('input')
      await input.setValue('19,99')
      
      // Should emit numeric value
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })
  })
  
  describe('Validation', () => {
    it('should validate positive amounts', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          min: 0
        }
      })
      
      const input = wrapper.find('input')
      await input.setValue('100')
      
      expect(wrapper.emitted('validate')?.[0]).toEqual([true])
    })
    
    it('should reject negative amounts', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          min: 0
        }
      })
      
      const input = wrapper.find('input')
      await input.setValue('-10')
      
      // Should show error
      expect(wrapper.text()).toContain('positif')
    })
    
    it('should validate min amount', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          min: 10
        }
      })
      
      const input = wrapper.find('input')
      await input.setValue('5')
      
      // Should show error
      expect(wrapper.text()).toContain('minimum')
    })
    
    it('should validate max amount', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          max: 100
        }
      })
      
      const input = wrapper.find('input')
      await input.setValue('150')
      
      // Should show error
      expect(wrapper.text()).toContain('maximum')
    })
    
    it('should reject more than 2 decimals', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null
        }
      })
      
      const input = wrapper.find('input')
      await input.setValue('10,123')
      
      // Should show error
      expect(wrapper.text()).toContain('décimales')
    })
    
    it('should emit validate event', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null
        }
      })
      
      const input = wrapper.find('input')
      await input.setValue('100')
      
      expect(wrapper.emitted('validate')).toBeTruthy()
    })
  })
  
  describe('User Interaction', () => {
    it('should emit update:modelValue on valid input', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null
        }
      })
      
      const input = wrapper.find('input')
      await input.setValue('100')
      
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted?.[0]).toEqual([100])
    })
    
    it('should emit focus event', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null
        }
      })
      
      const input = wrapper.find('input')
      await input.trigger('focus')
      
      expect(wrapper.emitted('focus')).toBeTruthy()
    })
    
    it('should emit blur event', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null
        }
      })
      
      const input = wrapper.find('input')
      await input.trigger('blur')
      
      expect(wrapper.emitted('blur')).toBeTruthy()
    })
    
    it('should clear value when clear() is called', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: 100
        }
      })
      
      // @ts-ignore - Exposed method
      wrapper.vm.clear()
      
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted?.[emitted.length - 1]).toEqual([null])
    })
  })
  
  describe('States', () => {
    it('should be disabled', () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          disabled: true
        }
      })
      
      const input = wrapper.find('input')
      expect(input.attributes('disabled')).toBeDefined()
    })
    
    it('should be readonly', () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          readonly: true
        }
      })
      
      const input = wrapper.find('input')
      expect(input.attributes('readonly')).toBeDefined()
    })
    
    it('should show required indicator', () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          label: 'Montant',
          required: true
        }
      })
      
      expect(wrapper.html()).toContain('*')
    })
  })
  
  describe('Different Currencies', () => {
    it('should work with USD', () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          currency: 'USD',
          locale: 'en-US'
        }
      })
      
      expect(wrapper.text()).toContain('$')
    })
    
    it('should work with GBP', () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          currency: 'GBP',
          locale: 'en-GB'
        }
      })
      
      expect(wrapper.text()).toContain('£')
    })
    
    it('should work with XOF', () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          currency: 'XOF'
        }
      })
      
      expect(wrapper.text()).toContain('CFA')
    })
  })
  
  describe('Real-world Scenarios', () => {
    it('should handle typical payment input', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          label: 'Montant du paiement',
          currency: 'EUR',
          min: 1,
          max: 10000,
          required: true
        }
      })
      
      const input = wrapper.find('input')
      await input.setValue('49,99')
      
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([49.99])
      expect(wrapper.emitted('validate')?.[0]).toEqual([true])
    })
    
    it('should handle wallet transfer', async () => {
      const wrapper = mount(FormCurrencyInput, {
        props: {
          modelValue: null,
          label: 'Montant à transférer',
          hint: 'Solde disponible: 1,234.56 €',
          currency: 'EUR',
          max: 1234.56
        }
      })
      
      const input = wrapper.find('input')
      await input.setValue('500')
      
      expect(wrapper.emitted('validate')?.[0]).toEqual([true])
    })
  })
})

