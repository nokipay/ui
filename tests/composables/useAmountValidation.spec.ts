import { describe, it, expect } from 'vitest'
import {
  useAmountValidation,
  validateAmountQuick
} from '../../src/runtime/composables/useAmountValidation'

describe('useAmountValidation Composable', () => {
  describe('Basic Validation', () => {
    it('should validate positive amount', () => {
      const { validate } = useAmountValidation()
      const result = validate(100)
      
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })
    
    it('should reject negative amount', () => {
      const { validate } = useAmountValidation()
      const result = validate(-10)
      
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.errors[0]).toContain('positif')
    })
    
    it('should reject zero', () => {
      const { validate } = useAmountValidation()
      const result = validate(0)
      
      expect(result.valid).toBe(false)
    })
    
    it('should reject more than 2 decimals', () => {
      const { validate } = useAmountValidation()
      const result = validate(10.123)
      
      expect(result.valid).toBe(false)
      expect(result.errors[0]).toContain('décimales')
    })
  })
  
  describe('Min/Max Validation', () => {
    it('should enforce minimum amount', () => {
      const { validate } = useAmountValidation({ min: 10 })
      
      expect(validate(10).valid).toBe(true)
      expect(validate(15).valid).toBe(true)
      expect(validate(9).valid).toBe(false)
      expect(validate(5).valid).toBe(false)
    })
    
    it('should enforce maximum amount', () => {
      const { validate } = useAmountValidation({ max: 100 })
      
      expect(validate(100).valid).toBe(true)
      expect(validate(50).valid).toBe(true)
      expect(validate(101).valid).toBe(false)
      expect(validate(200).valid).toBe(false)
    })
    
    it('should enforce both min and max', () => {
      const { validate } = useAmountValidation({ min: 10, max: 100 })
      
      expect(validate(9).valid).toBe(false)
      expect(validate(10).valid).toBe(true)
      expect(validate(50).valid).toBe(true)
      expect(validate(100).valid).toBe(true)
      expect(validate(101).valid).toBe(false)
    })
  })
  
  describe('Required Validation', () => {
    it('should accept null when not required', () => {
      const { validate } = useAmountValidation({ required: false })
      const result = validate(null)
      
      expect(result.valid).toBe(true)
    })
    
    it('should reject null when required', () => {
      const { validate } = useAmountValidation({ required: true })
      const result = validate(null)
      
      expect(result.valid).toBe(false)
      expect(result.errors[0]).toContain('requis')
    })
  })
  
  describe('Currency Validation', () => {
    it('should validate with EUR', () => {
      const { validate } = useAmountValidation({ currency: 'EUR' })
      const result = validate(100)
      
      expect(result.valid).toBe(true)
    })
    
    it('should validate with different currencies', () => {
      const currencies = ['EUR', 'USD', 'GBP', 'XOF', 'XAF']
      
      currencies.forEach(currency => {
        const { validate } = useAmountValidation({ currency })
        const result = validate(100)
        expect(result.valid).toBe(true)
      })
    })
  })
  
  describe('Reactive State', () => {
    it('should update errors ref', () => {
      const { validate, errors } = useAmountValidation()
      
      validate(-10)
      expect(errors.value.length).toBeGreaterThan(0)
      
      validate(100)
      expect(errors.value.length).toBe(0)
    })
    
    it('should update isValid computed', () => {
      const { validate, isValid } = useAmountValidation()
      
      validate(-10)
      expect(isValid.value).toBe(false)
      
      validate(100)
      expect(isValid.value).toBe(true)
    })
    
    it('should update lastValidatedAmount', () => {
      const { validate, lastValidatedAmount } = useAmountValidation()
      
      validate(100)
      expect(lastValidatedAmount.value).toBe(100)
      
      validate(200)
      expect(lastValidatedAmount.value).toBe(200)
    })
  })
  
  describe('Reset Method', () => {
    it('should reset errors', () => {
      const { validate, reset, errors } = useAmountValidation()
      
      validate(-10)
      expect(errors.value.length).toBeGreaterThan(0)
      
      reset()
      expect(errors.value).toHaveLength(0)
    })
    
    it('should reset lastValidatedAmount', () => {
      const { validate, reset, lastValidatedAmount } = useAmountValidation()
      
      validate(100)
      expect(lastValidatedAmount.value).toBe(100)
      
      reset()
      expect(lastValidatedAmount.value).toBeNull()
    })
  })
  
  describe('isWithinLimits Method', () => {
    it('should check if amount is within limits', () => {
      const { isWithinLimits } = useAmountValidation({ min: 10, max: 100 })
      
      expect(isWithinLimits(9)).toBe(false)
      expect(isWithinLimits(10)).toBe(true)
      expect(isWithinLimits(50)).toBe(true)
      expect(isWithinLimits(100)).toBe(true)
      expect(isWithinLimits(101)).toBe(false)
    })
  })
  
  describe('errorMessage Computed', () => {
    it('should return empty string when no errors', () => {
      const { validate, errorMessage } = useAmountValidation()
      
      validate(100)
      expect(errorMessage.value).toBe('')
    })
    
    it('should return formatted error message', () => {
      const { validate, errorMessage } = useAmountValidation()
      
      validate(-10)
      expect(errorMessage.value).toBeTruthy()
      expect(errorMessage.value.length).toBeGreaterThan(0)
    })
  })
  
  describe('Async Validation', () => {
    it('should validate synchronously first', async () => {
      const { validateAsync } = useAmountValidation()
      
      const result = await validateAsync(-10)
      expect(result.valid).toBe(false)
    })
    
    it('should call async validator if provided', async () => {
      const { validateAsync } = useAmountValidation()
      
      let called = false
      const asyncValidator = async (amount: number) => {
        called = true
        return true
      }
      
      await validateAsync(100, asyncValidator)
      expect(called).toBe(true)
    })
    
    it('should handle async validator rejection', async () => {
      const { validateAsync } = useAmountValidation()
      
      const asyncValidator = async (amount: number) => {
        return false // Reject
      }
      
      const result = await validateAsync(100, asyncValidator)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Validation côté serveur échouée')
    })
    
    it('should handle async validator error', async () => {
      const { validateAsync } = useAmountValidation()
      
      const asyncValidator = async (amount: number) => {
        throw new Error('Network error')
      }
      
      const result = await validateAsync(100, asyncValidator)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Erreur lors de la validation')
    })
  })
  
  describe('validateAmountQuick helper', () => {
    it('should return true for valid amount', () => {
      const isValid = validateAmountQuick(100)
      expect(isValid).toBe(true)
    })
    
    it('should return false for invalid amount', () => {
      const isValid = validateAmountQuick(-10)
      expect(isValid).toBe(false)
    })
    
    it('should respect options', () => {
      const isValid = validateAmountQuick(5, { min: 10 })
      expect(isValid).toBe(false)
    })
  })
  
  describe('Real-world Scenarios', () => {
    it('should validate payment amount', () => {
      const { validate } = useAmountValidation({
        min: 1,
        max: 10000,
        currency: 'EUR',
        required: true
      })
      
      expect(validate(null).valid).toBe(false) // Required
      expect(validate(0.50).valid).toBe(false) // < min
      expect(validate(49.99).valid).toBe(true)
      expect(validate(15000).valid).toBe(false) // > max
    })
    
    it('should validate wallet transfer', () => {
      const walletBalance = 1234.56
      const { validate } = useAmountValidation({
        min: 0.01,
        max: walletBalance,
        required: true
      })
      
      expect(validate(0).valid).toBe(false) // Zero
      expect(validate(500).valid).toBe(true) // OK
      expect(validate(walletBalance).valid).toBe(true) // Max balance
      expect(validate(1300).valid).toBe(false) // > balance
    })
    
    it('should validate XOF amount (CFA)', () => {
      const { validate } = useAmountValidation({
        currency: 'XOF',
        min: 100,
        max: 1000000
      })
      
      expect(validate(10000).valid).toBe(true)
      expect(validate(50).valid).toBe(false) // < min
    })
  })
})

