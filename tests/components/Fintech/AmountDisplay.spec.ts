import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AmountDisplay from '../../../src/runtime/components/Fintech/AmountDisplay.vue'

describe('AmountDisplay Component', () => {
  describe('Basic Rendering', () => {
    it('should render amount correctly', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: 100,
          currency: 'EUR'
        }
      })
      
      expect(wrapper.text()).toContain('100')
    })
    
    it('should render with decimals', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: 19.99,
          currency: 'EUR'
        }
      })
      
      const text = wrapper.text()
      expect(text).toContain('19')
      expect(text).toContain('99')
    })
    
    it('should render currency symbol', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: 100,
          currency: 'EUR',
          showCurrency: true
        }
      })
      
      expect(wrapper.text()).toContain('€')
    })
    
    it('should hide currency symbol when showCurrency is false', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: 100,
          currency: 'EUR',
          showCurrency: false
        }
      })
      
      expect(wrapper.text()).not.toContain('€')
    })
  })
  
  describe('Currency Support', () => {
    it('should display EUR symbol', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 100, currency: 'EUR' }
      })
      expect(wrapper.text()).toContain('€')
    })
    
    it('should display USD symbol', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 100, currency: 'USD' }
      })
      expect(wrapper.text()).toContain('$')
    })
    
    it('should display GBP symbol', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 100, currency: 'GBP' }
      })
      expect(wrapper.text()).toContain('£')
    })
    
    it('should display CFA for XOF', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 10000, currency: 'XOF' }
      })
      expect(wrapper.text()).toContain('CFA')
    })
    
    it('should display CFA for XAF', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 10000, currency: 'XAF' }
      })
      expect(wrapper.text()).toContain('CFA')
    })
  })
  
  describe('Currency Position', () => {
    it('should display currency before when specified', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: 100,
          currency: 'EUR',
          currencyPosition: 'before'
        }
      })
      
      const html = wrapper.html()
      const euroIndex = html.indexOf('€')
      const numberIndex = html.indexOf('100')
      
      expect(euroIndex).toBeLessThan(numberIndex)
    })
    
    it('should display currency after by default', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: 100,
          currency: 'EUR'
        }
      })
      
      const html = wrapper.html()
      const euroIndex = html.indexOf('€')
      const numberIndex = html.indexOf('100')
      
      expect(euroIndex).toBeGreaterThan(numberIndex)
    })
  })
  
  describe('Sizes', () => {
    it('should apply xs size class', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 100, size: 'xs' }
      })
      expect(wrapper.classes()).toContain('amount-xs')
    })
    
    it('should apply md size class by default', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 100 }
      })
      expect(wrapper.classes()).toContain('amount-md')
    })
    
    it('should apply 2xl size class', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 100, size: '2xl' }
      })
      expect(wrapper.classes()).toContain('amount-2xl')
    })
  })
  
  describe('Colors', () => {
    it('should apply default color', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 100, color: 'default' }
      })
      expect(wrapper.classes()).toContain('amount-default')
    })
    
    it('should apply positive color', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 100, color: 'positive' }
      })
      expect(wrapper.classes()).toContain('amount-positive')
    })
    
    it('should apply negative color', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: -50, color: 'negative' }
      })
      expect(wrapper.classes()).toContain('amount-negative')
    })
    
    it('should apply muted color', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 100, color: 'muted' }
      })
      expect(wrapper.classes()).toContain('amount-muted')
    })
  })
  
  describe('Font Weights', () => {
    it('should apply normal weight by default', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 100 }
      })
      expect(wrapper.classes()).toContain('amount-weight-normal')
    })
    
    it('should apply bold weight', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 100, weight: 'bold' }
      })
      expect(wrapper.classes()).toContain('amount-weight-bold')
    })
  })
  
  describe('Decimals', () => {
    it('should show decimals by default', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 19.99, currency: 'EUR' }
      })
      
      expect(wrapper.text()).toContain('99')
    })
    
    it('should hide decimals when specified', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: 19.99,
          currency: 'EUR',
          showDecimals: false
        }
      })
      
      // Should show whole part only
      const text = wrapper.text()
      expect(text).toContain('19')
      expect(text).not.toContain(',99')
    })
    
    it('should display .00 for whole numbers', () => {
      const wrapper = mount(AmountDisplay, {
        props: { amount: 100, showDecimals: true }
      })
      
      expect(wrapper.text()).toContain('00')
    })
  })
  
  describe('Precision', () => {
    it('should handle float precision correctly', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: 0.1 + 0.2, // 0.30000000000000004
          currency: 'EUR'
        }
      })
      
      // Should display as 0.30 thanks to Money class
      const text = wrapper.text()
      expect(text).toContain('0')
      expect(text).toContain('30')
    })
    
    it('should handle large amounts', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: 1234567.89,
          currency: 'EUR',
          locale: 'fr-FR'
        }
      })
      
      // French format: 1 234 567,89
      const text = wrapper.text()
      expect(text).toContain('1')
      expect(text).toContain('234')
      expect(text).toContain('567')
      expect(text).toContain('89')
    })
  })
  
  describe('Accessibility', () => {
    it('should have title attribute with formatted value', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: 1234.56,
          currency: 'EUR',
          locale: 'fr-FR'
        }
      })
      
      const title = wrapper.attributes('title')
      expect(title).toBeDefined()
      expect(title).toContain('1')
      expect(title).toContain('234')
    })
  })
  
  describe('Real-world Scenarios', () => {
    it('should display transaction amount', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: 49.99,
          currency: 'EUR',
          size: 'lg',
          weight: 'semibold',
          color: 'positive'
        }
      })
      
      expect(wrapper.text()).toContain('49')
      expect(wrapper.text()).toContain('99')
      expect(wrapper.classes()).toContain('amount-lg')
      expect(wrapper.classes()).toContain('amount-positive')
    })
    
    it('should display wallet balance', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: 1523.47,
          currency: 'EUR',
          size: '2xl',
          weight: 'bold',
          showCurrency: true,
          showDecimals: true
        }
      })
      
      expect(wrapper.text()).toContain('1')
      expect(wrapper.text()).toContain('523')
      expect(wrapper.text()).toContain('47')
      expect(wrapper.text()).toContain('€')
    })
    
    it('should display refund amount as negative', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: -25.50,
          currency: 'EUR',
          color: 'negative'
        }
      })
      
      expect(wrapper.classes()).toContain('amount-negative')
    })
    
    it('should display XOF amount (no decimals typically)', () => {
      const wrapper = mount(AmountDisplay, {
        props: {
          amount: 15000,
          currency: 'XOF',
          showDecimals: false
        }
      })
      
      expect(wrapper.text()).toContain('15')
      expect(wrapper.text()).toContain('000')
      expect(wrapper.text()).toContain('CFA')
    })
  })
})

