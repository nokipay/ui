import { describe, it, expect } from 'vitest'
import {
  useFeeCalculation,
  calculateQuickFee
} from '../../src/runtime/composables/useFeeCalculation'
import type { FeeTier, FeeStructure } from '../../src/runtime/utils/schemas/fintech/fee'

describe('useFeeCalculation Composable', () => {
  describe('Simple Fee Calculation', () => {
    it('should calculate fee with single tier', () => {
      const { calculateFee } = useFeeCalculation()
      
      const tiers: FeeTier[] = [
        { min: 0, max: Infinity, rate: 0.02, fixed: 0.50 }
      ]
      
      const result = calculateFee(100, tiers)
      
      // 100 * 0.02 + 0.50 = 2.50
      expect(result.totalFee).toBe(2.50)
      expect(result.finalAmount).toBe(102.50)
    })
    
    it('should calculate fee with percentage only', () => {
      const { calculateFee } = useFeeCalculation()
      
      const tiers: FeeTier[] = [
        { min: 0, max: Infinity, rate: 0.025, fixed: 0 }
      ]
      
      const result = calculateFee(1000, tiers)
      
      // 1000 * 0.025 = 25
      expect(result.totalFee).toBe(25)
    })
    
    it('should calculate fee with fixed only', () => {
      const { calculateFee } = useFeeCalculation()
      
      const tiers: FeeTier[] = [
        { min: 0, max: Infinity, rate: 0, fixed: 5 }
      ]
      
      const result = calculateFee(100, tiers)
      
      expect(result.totalFee).toBe(5)
    })
  })
  
  describe('Tiered Fee Calculation', () => {
    it('should calculate with multiple tiers', () => {
      const { calculateFee } = useFeeCalculation()
      
      const tiers: FeeTier[] = [
        { min: 0, max: 100, rate: 0.02, fixed: 0.50 },
        { min: 100, max: 1000, rate: 0.015, fixed: 0.30 },
        { min: 1000, max: Infinity, rate: 0.01, fixed: 0.20 }
      ]
      
      const result = calculateFee(1250, tiers)
      
      // Tier 1: 100 * 0.02 + 0.50 = 2.50
      // Tier 2: 900 * 0.015 + 0.30 = 13.80
      // Tier 3: 250 * 0.01 + 0.20 = 2.70
      // Total: 2.50 + 13.80 + 2.70 = 19.00
      
      expect(result.totalFee).toBeCloseTo(19, 1)
      expect(result.breakdown.length).toBe(3)
    })
    
    it('should stop at appropriate tier', () => {
      const { calculateFee } = useFeeCalculation()
      
      const tiers: FeeTier[] = [
        { min: 0, max: 100, rate: 0.02, fixed: 0.50 },
        { min: 100, max: 1000, rate: 0.015, fixed: 0.30 },
        { min: 1000, max: Infinity, rate: 0.01, fixed: 0.20 }
      ]
      
      const result = calculateFee(50, tiers)
      
      // Should only use first tier
      expect(result.breakdown.length).toBe(1)
      expect(result.totalFee).toBe(1.50) // 50 * 0.02 + 0.50
    })
  })
  
  describe('Breakdown Details', () => {
    it('should provide detailed breakdown', () => {
      const { calculateFee } = useFeeCalculation()
      
      const tiers: FeeTier[] = [
        { min: 0, max: 100, rate: 0.02, fixed: 0.50 },
        { min: 100, max: Infinity, rate: 0.01, fixed: 0.30 }
      ]
      
      const result = calculateFee(250, tiers)
      
      expect(result.breakdown).toHaveLength(2)
      
      // First tier
      expect(result.breakdown[0].applicableAmount).toBe(100)
      expect(result.breakdown[0].variableFee).toBe(2) // 100 * 0.02
      expect(result.breakdown[0].fixedFee).toBe(0.50)
      expect(result.breakdown[0].totalFee).toBe(2.50)
      
      // Second tier
      expect(result.breakdown[1].applicableAmount).toBe(150)
      expect(result.breakdown[1].variableFee).toBe(1.50) // 150 * 0.01
      expect(result.breakdown[1].fixedFee).toBe(0.30)
      expect(result.breakdown[1].totalFee).toBe(1.80)
    })
  })
  
  describe('FeeStructure Object', () => {
    it('should work with FeeStructure object', () => {
      const { calculateFee } = useFeeCalculation()
      
      const structure: FeeStructure = {
        name: 'Standard',
        tiers: [
          { min: 0, max: Infinity, rate: 0.02, fixed: 0.50 }
        ],
        currency: 'EUR',
        active: true
      }
      
      const result = calculateFee(100, structure)
      
      expect(result.totalFee).toBe(2.50)
      expect(result.currency).toBe('EUR')
    })
  })
  
  describe('Precise Calculation', () => {
    it('should calculate with Money class precision', () => {
      const { calculateFeePrecise } = useFeeCalculation()
      
      const tiers: FeeTier[] = [
        { min: 0, max: Infinity, rate: 0.15, fixed: 0 }
      ]
      
      const fee = calculateFeePrecise(100, tiers)
      
      expect(fee.toNumber()).toBe(15)
      expect(fee.currency).toBe('EUR')
    })
    
    it('should handle float precision correctly', () => {
      const { calculateFeePrecise } = useFeeCalculation()
      
      const tiers: FeeTier[] = [
        { min: 0, max: Infinity, rate: 0.029, fixed: 0 }
      ]
      
      const fee = calculateFeePrecise(100, tiers)
      
      // 100 * 0.029 = 2.90 (pas 2.8999999...)
      expect(fee.toNumber()).toBeCloseTo(2.90, 2)
    })
  })
  
  describe('Calculate Total', () => {
    it('should calculate total (amount + fee)', () => {
      const { calculateTotal } = useFeeCalculation()
      
      const tiers: FeeTier[] = [
        { min: 0, max: Infinity, rate: 0.02, fixed: 0.50 }
      ]
      
      const total = calculateTotal(100, tiers)
      
      // 100 + (100 * 0.02 + 0.50) = 102.50
      expect(total.toNumber()).toBe(102.50)
    })
  })
  
  describe('Format Breakdown', () => {
    it('should format breakdown as strings', () => {
      const { calculateFee, formatBreakdown } = useFeeCalculation()
      
      const tiers: FeeTier[] = [
        { min: 0, max: 100, rate: 0.02, fixed: 0.50 },
        { min: 100, max: Infinity, rate: 0.01, fixed: 0.30 }
      ]
      
      const result = calculateFee(250, tiers)
      const formatted = formatBreakdown(result.breakdown)
      
      expect(formatted).toHaveLength(2)
      expect(formatted[0]).toContain('Palier 1')
      expect(formatted[0]).toContain('2.50')
      expect(formatted[1]).toContain('Palier 2')
    })
  })
  
  describe('Effective Rate', () => {
    it('should calculate effective rate', () => {
      const { calculateEffectiveRate } = useFeeCalculation()
      
      const rate = calculateEffectiveRate(1000, 25)
      
      // 25 / 1000 = 0.025 (2.5%)
      expect(rate).toBe(0.025)
    })
    
    it('should return 0 for zero amount', () => {
      const { calculateEffectiveRate } = useFeeCalculation()
      
      const rate = calculateEffectiveRate(0, 5)
      expect(rate).toBe(0)
    })
  })
  
  describe('Min/Max Fee', () => {
    it('should apply minimum fee', () => {
      const { applyMinMaxFee } = useFeeCalculation()
      
      const structure: FeeStructure = {
        name: 'Test',
        tiers: [],
        currency: 'EUR',
        active: true,
        minFee: { value: 2, currency: 'EUR' }
      }
      
      const adjusted = applyMinMaxFee(1, structure)
      expect(adjusted).toBe(2) // Ajusté au minimum
    })
    
    it('should apply maximum fee', () => {
      const { applyMinMaxFee } = useFeeCalculation()
      
      const structure: FeeStructure = {
        name: 'Test',
        tiers: [],
        currency: 'EUR',
        active: true,
        maxFee: { value: 50, currency: 'EUR' }
      }
      
      const adjusted = applyMinMaxFee(100, structure)
      expect(adjusted).toBe(50) // Plafonné au maximum
    })
    
    it('should not adjust if within min/max', () => {
      const { applyMinMaxFee } = useFeeCalculation()
      
      const structure: FeeStructure = {
        name: 'Test',
        tiers: [],
        currency: 'EUR',
        active: true,
        minFee: { value: 1, currency: 'EUR' },
        maxFee: { value: 100, currency: 'EUR' }
      }
      
      const adjusted = applyMinMaxFee(25, structure)
      expect(adjusted).toBe(25) // Pas modifié
    })
  })
  
  describe('calculateQuickFee helper', () => {
    it('should calculate fee quickly', () => {
      const tiers: FeeTier[] = [
        { min: 0, max: Infinity, rate: 0.02, fixed: 0.50 }
      ]
      
      const fee = calculateQuickFee(100, tiers)
      expect(fee).toBe(2.50)
    })
  })
  
  describe('Real-world Fee Structures', () => {
    it('should calculate standard payment fee', () => {
      const { calculateFee } = useFeeCalculation()
      
      const STANDARD_FEE: FeeTier[] = [
        { min: 0, max: Infinity, rate: 0.029, fixed: 0.30 }
      ]
      
      const result = calculateFee(49.99, STANDARD_FEE)
      
      // 49.99 * 0.029 + 0.30 ≈ 1.75
      expect(result.totalFee).toBeCloseTo(1.75, 2)
    })
    
    it('should calculate progressive fee structure', () => {
      const { calculateFee } = useFeeCalculation()
      
      const PROGRESSIVE: FeeTier[] = [
        { min: 0, max: 100, rate: 0.02, fixed: 0.50 },
        { min: 100, max: 500, rate: 0.015, fixed: 0.30 },
        { min: 500, max: Infinity, rate: 0.01, fixed: 0.20 }
      ]
      
      const result = calculateFee(750, PROGRESSIVE)
      
      // Tier 1: 100 * 0.02 + 0.50 = 2.50
      // Tier 2: 400 * 0.015 + 0.30 = 6.30
      // Tier 3: 250 * 0.01 + 0.20 = 2.70
      // Total: 11.50
      
      expect(result.totalFee).toBeCloseTo(11.50, 2)
      expect(result.breakdown.length).toBe(3)
    })
    
    it('should calculate premium fee (lower rate)', () => {
      const { calculateFee } = useFeeCalculation()
      
      const PREMIUM: FeeTier[] = [
        { min: 0, max: Infinity, rate: 0.005, fixed: 0.10 }
      ]
      
      const result = calculateFee(10000, PREMIUM)
      
      // 10000 * 0.005 + 0.10 = 50.10
      expect(result.totalFee).toBe(50.10)
    })
  })
})

