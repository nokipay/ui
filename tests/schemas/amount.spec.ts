import { describe, it, expect } from 'vitest'
import {
  AmountSchema,
  NegativeAmountSchema,
  NonNegativeAmountSchema,
  createAmountSchema,
  validateAmount,
  parseAmount
} from '../../src/runtime/utils/schemas/fintech/amount'

describe('Amount Schema', () => {
  describe('AmountSchema - Valid Cases', () => {
    it('should validate a valid amount', () => {
      const result = AmountSchema.safeParse({
        value: 100,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.value).toBe(100)
        expect(result.data.currency).toBe('EUR')
      }
    })
    
    it('should accept all supported currencies', () => {
      const currencies = ['EUR', 'USD', 'GBP', 'XOF', 'XAF']
      
      currencies.forEach(currency => {
        const result = AmountSchema.safeParse({
          value: 100,
          currency
        })
        expect(result.success).toBe(true)
      })
    })
    
    it('should accept amount with 2 decimals', () => {
      const result = AmountSchema.safeParse({
        value: 19.99,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept amount with 1 decimal', () => {
      const result = AmountSchema.safeParse({
        value: 10.5,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept formatted field', () => {
      const result = AmountSchema.safeParse({
        value: 100,
        currency: 'EUR',
        formatted: '100,00 €'
      })
      
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.formatted).toBe('100,00 €')
      }
    })
    
    it('should accept very small amounts', () => {
      const result = AmountSchema.safeParse({
        value: 0.01,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept large amounts up to 1M', () => {
      const result = AmountSchema.safeParse({
        value: 999999.99,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(true)
    })
  })
  
  describe('AmountSchema - Invalid Cases', () => {
    it('should reject negative amounts', () => {
      const result = AmountSchema.safeParse({
        value: -10,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('positif')
      }
    })
    
    it('should reject zero', () => {
      const result = AmountSchema.safeParse({
        value: 0,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject more than 2 decimals', () => {
      const result = AmountSchema.safeParse({
        value: 10.123,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('2 décimales')
      }
    })
    
    it('should reject amount > 1M', () => {
      const result = AmountSchema.safeParse({
        value: 1000001,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('maximum')
      }
    })
    
    it('should reject unsupported currency', () => {
      const result = AmountSchema.safeParse({
        value: 100,
        currency: 'JPY'
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('non supportée')
      }
    })
    
    it('should reject Infinity', () => {
      const result = AmountSchema.safeParse({
        value: Infinity,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject NaN', () => {
      const result = AmountSchema.safeParse({
        value: NaN,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject missing value', () => {
      const result = AmountSchema.safeParse({
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject missing currency', () => {
      const result = AmountSchema.safeParse({
        value: 100
      })
      
      expect(result.success).toBe(false)
    })
  })
  
  describe('NegativeAmountSchema', () => {
    it('should accept negative amounts', () => {
      const result = NegativeAmountSchema.safeParse({
        value: -10,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should reject positive amounts', () => {
      const result = NegativeAmountSchema.safeParse({
        value: 10,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject zero', () => {
      const result = NegativeAmountSchema.safeParse({
        value: 0,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should enforce -1M minimum', () => {
      const result = NegativeAmountSchema.safeParse({
        value: -1000001,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
    })
  })
  
  describe('NonNegativeAmountSchema', () => {
    it('should accept zero', () => {
      const result = NonNegativeAmountSchema.safeParse({
        value: 0,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept positive amounts', () => {
      const result = NonNegativeAmountSchema.safeParse({
        value: 100,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should reject negative amounts', () => {
      const result = NonNegativeAmountSchema.safeParse({
        value: -10,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
    })
  })
  
  describe('createAmountSchema with custom limits', () => {
    it('should enforce custom minimum', () => {
      const schema = createAmountSchema({ min: 10 })
      
      const validResult = schema.safeParse({
        value: 10,
        currency: 'EUR'
      })
      expect(validResult.success).toBe(true)
      
      const invalidResult = schema.safeParse({
        value: 9,
        currency: 'EUR'
      })
      expect(invalidResult.success).toBe(false)
    })
    
    it('should enforce custom maximum', () => {
      const schema = createAmountSchema({ max: 100 })
      
      const validResult = schema.safeParse({
        value: 100,
        currency: 'EUR'
      })
      expect(validResult.success).toBe(true)
      
      const invalidResult = schema.safeParse({
        value: 101,
        currency: 'EUR'
      })
      expect(invalidResult.success).toBe(false)
    })
    
    it('should enforce both min and max', () => {
      const schema = createAmountSchema({ min: 10, max: 100 })
      
      expect(schema.safeParse({ value: 9, currency: 'EUR' }).success).toBe(false)
      expect(schema.safeParse({ value: 10, currency: 'EUR' }).success).toBe(true)
      expect(schema.safeParse({ value: 50, currency: 'EUR' }).success).toBe(true)
      expect(schema.safeParse({ value: 100, currency: 'EUR' }).success).toBe(true)
      expect(schema.safeParse({ value: 101, currency: 'EUR' }).success).toBe(false)
    })
  })
  
  describe('Helper functions', () => {
    describe('validateAmount', () => {
      it('should validate valid amount', () => {
        const result = validateAmount({
          value: 100,
          currency: 'EUR'
        })
        
        expect(result.success).toBe(true)
      })
      
      it('should return errors for invalid amount', () => {
        const result = validateAmount({
          value: -10,
          currency: 'EUR'
        })
        
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error.errors.length).toBeGreaterThan(0)
        }
      })
    })
    
    describe('parseAmount', () => {
      it('should parse valid amount', () => {
        const amount = parseAmount({
          value: 100,
          currency: 'EUR'
        })
        
        expect(amount.value).toBe(100)
        expect(amount.currency).toBe('EUR')
      })
      
      it('should throw on invalid amount', () => {
        expect(() => {
          parseAmount({
            value: -10,
            currency: 'EUR'
          })
        }).toThrow()
      })
    })
  })
  
  describe('Real-world scenarios', () => {
    it('should validate typical transaction amount', () => {
      const result = AmountSchema.safeParse({
        value: 49.99,
        currency: 'EUR',
        formatted: '49,99 €'
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should validate XOF currency (CFA)', () => {
      const result = AmountSchema.safeParse({
        value: 10000,
        currency: 'XOF'
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should validate payment with formatted string', () => {
      const result = AmountSchema.safeParse({
        value: 1234.56,
        currency: 'USD',
        formatted: '$1,234.56'
      })
      
      expect(result.success).toBe(true)
    })
  })
})

