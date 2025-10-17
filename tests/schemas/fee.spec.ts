import { describe, it, expect } from 'vitest'
import {
  FeeTierSchema,
  FeeStructureSchema,
  SimpleFeeSchema,
  validateFeeStructure,
  parseFeeStructure,
  createFeeStructure,
  EXAMPLE_FEE_STRUCTURES
} from '../../src/runtime/utils/schemas/fintech/fee'

describe('Fee Schema', () => {
  describe('FeeTierSchema - Valid Cases', () => {
    it('should validate a valid fee tier', () => {
      const result = FeeTierSchema.safeParse({
        min: 0,
        max: 100,
        rate: 0.02,
        fixed: 0.50
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept zero rate and fixed', () => {
      const result = FeeTierSchema.safeParse({
        min: 0,
        max: 100,
        rate: 0,
        fixed: 0
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept Infinity as max', () => {
      const result = FeeTierSchema.safeParse({
        min: 1000,
        max: Infinity,
        rate: 0.01,
        fixed: 0.20
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept rate up to 100%', () => {
      const result = FeeTierSchema.safeParse({
        min: 0,
        max: 100,
        rate: 1, // 100%
        fixed: 0
      })
      
      expect(result.success).toBe(true)
    })
  })
  
  describe('FeeTierSchema - Invalid Cases', () => {
    it('should reject min >= max', () => {
      const result = FeeTierSchema.safeParse({
        min: 100,
        max: 100,
        rate: 0.02,
        fixed: 0.50
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject negative min', () => {
      const result = FeeTierSchema.safeParse({
        min: -10,
        max: 100,
        rate: 0.02,
        fixed: 0.50
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject negative rate', () => {
      const result = FeeTierSchema.safeParse({
        min: 0,
        max: 100,
        rate: -0.02,
        fixed: 0.50
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject rate > 100%', () => {
      const result = FeeTierSchema.safeParse({
        min: 0,
        max: 100,
        rate: 1.5, // 150%
        fixed: 0.50
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject negative fixed fee', () => {
      const result = FeeTierSchema.safeParse({
        min: 0,
        max: 100,
        rate: 0.02,
        fixed: -0.50
      })
      
      expect(result.success).toBe(false)
    })
  })
  
  describe('FeeStructureSchema - Valid Cases', () => {
    it('should validate a simple fee structure', () => {
      const result = FeeStructureSchema.safeParse({
        name: 'Standard',
        tiers: [
          { min: 0, max: Infinity, rate: 0.02, fixed: 0.50 }
        ],
        currency: 'EUR',
        active: true
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should validate tiered fee structure', () => {
      const result = FeeStructureSchema.safeParse({
        name: 'Progressive',
        tiers: [
          { min: 0, max: 100, rate: 0.02, fixed: 0.50 },
          { min: 100, max: 1000, rate: 0.015, fixed: 0.30 },
          { min: 1000, max: Infinity, rate: 0.01, fixed: 0.20 }
        ],
        currency: 'EUR',
        active: true
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept optional fields', () => {
      const result = FeeStructureSchema.safeParse({
        id: 'fee-123',
        name: 'Premium',
        description: 'Premium fee structure',
        tiers: [
          { min: 0, max: Infinity, rate: 0.01, fixed: 0.10 }
        ],
        currency: 'EUR',
        minFee: { value: 0.50, currency: 'EUR' },
        maxFee: { value: 50, currency: 'EUR' },
        active: true,
        validFrom: new Date('2025-01-01').toISOString(),
        validUntil: new Date('2025-12-31').toISOString()
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should default active to true', () => {
      const result = FeeStructureSchema.safeParse({
        name: 'Standard',
        tiers: [
          { min: 0, max: Infinity, rate: 0.02, fixed: 0.50 }
        ],
        currency: 'EUR'
      })
      
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.active).toBe(true)
      }
    })
  })
  
  describe('FeeStructureSchema - Invalid Cases', () => {
    it('should reject empty tiers', () => {
      const result = FeeStructureSchema.safeParse({
        name: 'Standard',
        tiers: [],
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject non-consecutive tiers', () => {
      const result = FeeStructureSchema.safeParse({
        name: 'Invalid',
        tiers: [
          { min: 0, max: 100, rate: 0.02, fixed: 0.50 },
          { min: 200, max: 1000, rate: 0.01, fixed: 0.30 } // Gap: 100-200
        ],
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject overlapping tiers', () => {
      const result = FeeStructureSchema.safeParse({
        name: 'Invalid',
        tiers: [
          { min: 0, max: 150, rate: 0.02, fixed: 0.50 },
          { min: 100, max: 1000, rate: 0.01, fixed: 0.30 } // Overlap: 100-150
        ],
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
    })
  })
  
  describe('SimpleFeeSchema', () => {
    it('should validate fixed fee', () => {
      const result = SimpleFeeSchema.safeParse({
        type: 'FIXED',
        value: 5,
        currency: 'EUR',
        description: 'Fixed transaction fee'
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should validate percentage fee', () => {
      const result = SimpleFeeSchema.safeParse({
        type: 'PERCENTAGE',
        value: 0.02, // 2%
        description: '2% transaction fee'
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should reject negative fee', () => {
      const result = SimpleFeeSchema.safeParse({
        type: 'FIXED',
        value: -5,
        currency: 'EUR'
      })
      
      expect(result.success).toBe(false)
    })
  })
  
  describe('Helper Functions', () => {
    it('should validate fee structure', () => {
      const result = validateFeeStructure({
        name: 'Test',
        tiers: [
          { min: 0, max: Infinity, rate: 0.02, fixed: 0.50 }
        ],
        currency: 'EUR'
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should parse fee structure', () => {
      const structure = parseFeeStructure({
        name: 'Test',
        tiers: [
          { min: 0, max: Infinity, rate: 0.02, fixed: 0.50 }
        ],
        currency: 'EUR'
      })
      
      expect(structure.name).toBe('Test')
      expect(structure.tiers.length).toBe(1)
    })
    
    it('should create fee structure with helper', () => {
      const structure = createFeeStructure(
        'Custom',
        [
          { min: 0, max: 100, rate: 0.02, fixed: 0.50 },
          { min: 100, max: Infinity, rate: 0.01, fixed: 0.30 }
        ],
        'USD'
      )
      
      expect(structure.name).toBe('Custom')
      expect(structure.currency).toBe('USD')
      expect(structure.tiers.length).toBe(2)
      expect(structure.active).toBe(true)
    })
  })
  
  describe('Example Fee Structures', () => {
    it('should have SIMPLE structure', () => {
      expect(EXAMPLE_FEE_STRUCTURES.SIMPLE).toBeDefined()
      expect(EXAMPLE_FEE_STRUCTURES.SIMPLE.name).toBe('Simple')
      expect(EXAMPLE_FEE_STRUCTURES.SIMPLE.tiers.length).toBe(1)
    })
    
    it('should have PROGRESSIVE structure', () => {
      expect(EXAMPLE_FEE_STRUCTURES.PROGRESSIVE).toBeDefined()
      expect(EXAMPLE_FEE_STRUCTURES.PROGRESSIVE.name).toBe('Progressive')
      expect(EXAMPLE_FEE_STRUCTURES.PROGRESSIVE.tiers.length).toBe(3)
    })
    
    it('should validate example structures', () => {
      const simpleResult = validateFeeStructure(EXAMPLE_FEE_STRUCTURES.SIMPLE)
      const progressiveResult = validateFeeStructure(EXAMPLE_FEE_STRUCTURES.PROGRESSIVE)
      
      expect(simpleResult.success).toBe(true)
      expect(progressiveResult.success).toBe(true)
    })
  })
})

