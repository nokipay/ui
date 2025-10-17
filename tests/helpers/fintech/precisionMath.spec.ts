import { describe, it, expect } from 'vitest'
import { Money } from '../../../src/runtime/utils/helpers/fintech/precisionMath'

describe('Money - Precision Math', () => {
  describe('Construction', () => {
    it('should create from number', () => {
      const money = new Money(19.99, 'EUR')
      expect(money.toNumber()).toBe(19.99)
      expect(money.toString()).toBe('19.99')
      expect(money.currency).toBe('EUR')
    })
    
    it('should create from string', () => {
      const money = new Money('19.99', 'EUR')
      expect(money.toNumber()).toBe(19.99)
      expect(money.toString()).toBe('19.99')
    })
    
    it('should create with different currencies', () => {
      const eur = new Money(100, 'EUR')
      const usd = new Money(100, 'USD')
      const gbp = new Money(100, 'GBP')
      
      expect(eur.currency).toBe('EUR')
      expect(usd.currency).toBe('USD')
      expect(gbp.currency).toBe('GBP')
    })
    
    it('should default to EUR', () => {
      const money = new Money(10)
      expect(money.currency).toBe('EUR')
    })
    
    it('should handle zero', () => {
      const money = new Money(0, 'EUR')
      expect(money.toNumber()).toBe(0)
      expect(money.toString()).toBe('0.00')
    })
    
    it('should handle negative amounts', () => {
      const money = new Money(-10.50, 'EUR')
      expect(money.toNumber()).toBe(-10.50)
      expect(money.toString()).toBe('-10.50')
    })
  })
  
  describe('Addition', () => {
    it('should handle float precision correctly', () => {
      const a = new Money(0.1, 'EUR')
      const b = new Money(0.2, 'EUR')
      const sum = a.add(b)
      
      // ✅ CRITICAL TEST: Pas d'erreur float
      expect(sum.toNumber()).toBe(0.3)
      expect(sum.toString()).toBe('0.30')
    })
    
    it('should add multiple amounts', () => {
      const a = new Money(10.50, 'EUR')
      const b = new Money(20.25, 'EUR')
      const c = new Money(5.15, 'EUR')
      
      const total = a.add(b).add(c)
      expect(total.toNumber()).toBe(35.90)
    })
    
    it('should handle large sums', () => {
      const a = new Money(999999.99, 'EUR')
      const b = new Money(0.01, 'EUR')
      
      const sum = a.add(b)
      expect(sum.toNumber()).toBe(1000000)
    })
    
    it('should throw on currency mismatch', () => {
      const eur = new Money(10, 'EUR')
      const usd = new Money(10, 'USD')
      
      expect(() => eur.add(usd)).toThrow('Currency mismatch')
    })
  })
  
  describe('Subtraction', () => {
    it('should subtract correctly', () => {
      const a = new Money(10.50, 'EUR')
      const b = new Money(3.25, 'EUR')
      
      const result = a.subtract(b)
      expect(result.toNumber()).toBe(7.25)
    })
    
    it('should handle negative results', () => {
      const a = new Money(5, 'EUR')
      const b = new Money(10, 'EUR')
      
      const result = a.subtract(b)
      expect(result.toNumber()).toBe(-5)
      expect(result.toString()).toBe('-5.00')
    })
    
    it('should handle precision in subtraction', () => {
      const a = new Money(1, 'EUR')
      const b = new Money(0.3, 'EUR')
      
      const result = a.subtract(b)
      expect(result.toNumber()).toBe(0.7)
    })
  })
  
  describe('Multiplication', () => {
    it('should multiply by integer', () => {
      const money = new Money(10, 'EUR')
      const result = money.multiply(3)
      
      expect(result.toNumber()).toBe(30)
    })
    
    it('should multiply by decimal factor', () => {
      const money = new Money(100, 'EUR')
      const result = money.multiply(0.15) // 15% fee
      
      expect(result.toNumber()).toBe(15)
    })
    
    it('should handle fractional multiplication', () => {
      const money = new Money(10, 'EUR')
      const result = money.multiply(1.5)
      
      expect(result.toNumber()).toBe(15)
    })
    
    it('should multiply by zero', () => {
      const money = new Money(100, 'EUR')
      const result = money.multiply(0)
      
      expect(result.toNumber()).toBe(0)
    })
  })
  
  describe('Division', () => {
    it('should divide correctly', () => {
      const money = new Money(100, 'EUR')
      const result = money.divide(4)
      
      expect(result.toNumber()).toBe(25)
    })
    
    it('should handle decimal division', () => {
      const money = new Money(100, 'EUR')
      const result = money.divide(3)
      
      // Division par 3 donne 33.33 (arrondi)
      expect(result.toNumber()).toBeCloseTo(33.33, 2)
    })
    
    it('should divide by decimal', () => {
      const money = new Money(50, 'EUR')
      const result = money.divide(2.5)
      
      expect(result.toNumber()).toBe(20)
    })
  })
  
  describe('Comparison', () => {
    it('should compare equality', () => {
      const a = new Money(10.50, 'EUR')
      const b = new Money(10.50, 'EUR')
      const c = new Money(10.51, 'EUR')
      
      expect(a.equals(b)).toBe(true)
      expect(a.equals(c)).toBe(false)
    })
    
    it('should compare greater than', () => {
      const a = new Money(20, 'EUR')
      const b = new Money(10, 'EUR')
      
      expect(a.greaterThan(b)).toBe(true)
      expect(b.greaterThan(a)).toBe(false)
    })
    
    it('should compare less than', () => {
      const a = new Money(10, 'EUR')
      const b = new Money(20, 'EUR')
      
      expect(a.lessThan(b)).toBe(true)
      expect(b.lessThan(a)).toBe(false)
    })
    
    it('should compare greater than or equal', () => {
      const a = new Money(20, 'EUR')
      const b = new Money(20, 'EUR')
      const c = new Money(10, 'EUR')
      
      expect(a.greaterThanOrEqual(b)).toBe(true)
      expect(a.greaterThanOrEqual(c)).toBe(true)
      expect(c.greaterThanOrEqual(a)).toBe(false)
    })
    
    it('should compare less than or equal', () => {
      const a = new Money(10, 'EUR')
      const b = new Money(10, 'EUR')
      const c = new Money(20, 'EUR')
      
      expect(a.lessThanOrEqual(b)).toBe(true)
      expect(a.lessThanOrEqual(c)).toBe(true)
      expect(c.lessThanOrEqual(a)).toBe(false)
    })
  })
  
  describe('State Checks', () => {
    it('should check if positive', () => {
      const positive = new Money(10, 'EUR')
      const negative = new Money(-10, 'EUR')
      const zero = new Money(0, 'EUR')
      
      expect(positive.isPositive()).toBe(true)
      expect(negative.isPositive()).toBe(false)
      expect(zero.isPositive()).toBe(false)
    })
    
    it('should check if negative', () => {
      const positive = new Money(10, 'EUR')
      const negative = new Money(-10, 'EUR')
      const zero = new Money(0, 'EUR')
      
      expect(negative.isNegative()).toBe(true)
      expect(positive.isNegative()).toBe(false)
      expect(zero.isNegative()).toBe(false)
    })
    
    it('should check if zero', () => {
      const zero = new Money(0, 'EUR')
      const nonZero = new Money(10, 'EUR')
      
      expect(zero.isZero()).toBe(true)
      expect(nonZero.isZero()).toBe(false)
    })
  })
  
  describe('Absolute Value', () => {
    it('should return absolute value', () => {
      const negative = new Money(-10.50, 'EUR')
      const abs = negative.abs()
      
      expect(abs.toNumber()).toBe(10.50)
    })
    
    it('should keep positive value unchanged', () => {
      const positive = new Money(10.50, 'EUR')
      const abs = positive.abs()
      
      expect(abs.toNumber()).toBe(10.50)
    })
  })
  
  describe('Formatting', () => {
    it('should format in French locale', () => {
      const money = new Money(1234.56, 'EUR')
      const formatted = money.format('fr-FR')
      
      expect(formatted).toContain('1')
      expect(formatted).toContain('234')
      expect(formatted).toContain('56')
      expect(formatted).toContain('€')
    })
    
    it('should format in US locale', () => {
      const money = new Money(1234.56, 'USD')
      const formatted = money.format('en-US')
      
      expect(formatted).toContain('1')
      expect(formatted).toContain('234')
      expect(formatted).toContain('56')
      expect(formatted).toContain('$')
    })
    
    it('should default to fr-FR', () => {
      const money = new Money(100, 'EUR')
      const formatted = money.format()
      
      expect(formatted).toContain('€')
    })
  })
  
  describe('Static Methods', () => {
    it('should create zero amount', () => {
      const zero = Money.zero('EUR')
      
      expect(zero.toNumber()).toBe(0)
      expect(zero.currency).toBe('EUR')
      expect(zero.isZero()).toBe(true)
    })
    
    it('should create from cents', () => {
      const money = Money.fromCents(1999, 'EUR')
      
      expect(money.toNumber()).toBe(19.99)
      expect(money.toString()).toBe('19.99')
    })
    
    it('should create from bigint cents', () => {
      const money = Money.fromCents(1999n, 'EUR')
      
      expect(money.toNumber()).toBe(19.99)
    })
  })
  
  describe('Edge Cases', () => {
    it('should handle very large amounts', () => {
      const money = new Money(999999999.99, 'EUR')
      expect(money.toNumber()).toBe(999999999.99)
    })
    
    it('should handle very small amounts', () => {
      const money = new Money(0.01, 'EUR')
      expect(money.toNumber()).toBe(0.01)
      expect(money.toString()).toBe('0.01')
    })
    
    it('should handle multiple decimal places input (truncate)', () => {
      const money = new Money(10.12345, 'EUR')
      // Should truncate to 2 decimal places
      expect(money.toNumber()).toBe(10.12)
    })
    
    it('should handle string with single decimal', () => {
      const money = new Money('10.5', 'EUR')
      expect(money.toNumber()).toBe(10.5)
      expect(money.toString()).toBe('10.50')
    })
    
    it('should handle string with no decimal', () => {
      const money = new Money('10', 'EUR')
      expect(money.toNumber()).toBe(10)
      expect(money.toString()).toBe('10.00')
    })
  })
  
  describe('Real-world Scenarios', () => {
    it('should calculate total cart with multiple items', () => {
      const items = [
        new Money(19.99, 'EUR'),
        new Money(5.50, 'EUR'),
        new Money(12.75, 'EUR')
      ]
      
      const total = items.reduce((sum, item) => sum.add(item), Money.zero('EUR'))
      expect(total.toNumber()).toBe(38.24)
    })
    
    it('should calculate discount percentage', () => {
      const price = new Money(100, 'EUR')
      const discount = price.multiply(0.20) // 20% discount
      const finalPrice = price.subtract(discount)
      
      expect(discount.toNumber()).toBe(20)
      expect(finalPrice.toNumber()).toBe(80)
    })
    
    it('should split bill equally', () => {
      const total = new Money(99.99, 'EUR')
      const perPerson = total.divide(3)
      
      expect(perPerson.toNumber()).toBeCloseTo(33.33, 2)
    })
    
    it('should calculate compound operations', () => {
      const basePrice = new Money(100, 'EUR')
      const withTax = basePrice.multiply(1.20) // +20% tax
      const withDiscount = withTax.multiply(0.90) // -10% discount
      const withFee = withDiscount.add(new Money(5, 'EUR')) // +5€ fee
      
      expect(withFee.toNumber()).toBeCloseTo(113, 0)
    })
    
    it('should handle currency exchange simulation', () => {
      const eur = new Money(100, 'EUR')
      const exchangeRate = 1.10 // 1 EUR = 1.10 USD
      const usdAmount = eur.multiply(exchangeRate)
      
      // Créer nouveau Money en USD
      const usd = new Money(usdAmount.toNumber(), 'USD')
      
      expect(usd.toNumber()).toBe(110)
      expect(usd.currency).toBe('USD')
    })
  })
})

