import { describe, it, expect } from 'vitest'
import {
  WalletSchema,
  WalletLimitsSchema,
  WalletHistorySchema,
  WalletOperationSchema,
  WalletStatusEnum,
  WalletTypeEnum,
  validateWallet,
  parseWallet,
  createEmptyWallet
} from '../../src/runtime/utils/schemas/fintech/wallet'

describe('Wallet Schema', () => {
  describe('WalletSchema - Valid Cases', () => {
    it('should validate a valid wallet', () => {
      const result = WalletSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        ownerId: '223e4567-e89b-12d3-a456-426614174000',
        type: 'PERSONAL',
        status: 'ACTIVE',
        balance: { value: 1000, currency: 'EUR' },
        availableBalance: { value: 900, currency: 'EUR' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept all wallet statuses', () => {
      const statuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'FROZEN', 'CLOSED']
      
      statuses.forEach(status => {
        const result = WalletSchema.safeParse({
          id: '123e4567-e89b-12d3-a456-426614174000',
          ownerId: '223e4567-e89b-12d3-a456-426614174000',
          type: 'PERSONAL',
          status,
          balance: { value: 1000, currency: 'EUR' },
          availableBalance: { value: 1000, currency: 'EUR' },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        
        expect(result.success).toBe(true)
      })
    })
    
    it('should accept all wallet types', () => {
      const types = ['PERSONAL', 'BUSINESS', 'SAVINGS', 'ESCROW']
      
      types.forEach(type => {
        const result = WalletSchema.safeParse({
          id: '123e4567-e89b-12d3-a456-426614174000',
          ownerId: '223e4567-e89b-12d3-a456-426614174000',
          type,
          status: 'ACTIVE',
          balance: { value: 1000, currency: 'EUR' },
          availableBalance: { value: 1000, currency: 'EUR' },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        
        expect(result.success).toBe(true)
      })
    })
    
    it('should accept optional fields', () => {
      const result = WalletSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        ownerId: '223e4567-e89b-12d3-a456-426614174000',
        type: 'PERSONAL',
        status: 'ACTIVE',
        balance: { value: 1000, currency: 'EUR' },
        availableBalance: { value: 800, currency: 'EUR' },
        blockedBalance: { value: 200, currency: 'EUR' },
        name: 'Mon Wallet Principal',
        description: 'Wallet pour transactions courantes',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastTransactionAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept availableBalance equal to balance', () => {
      const result = WalletSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        ownerId: '223e4567-e89b-12d3-a456-426614174000',
        type: 'PERSONAL',
        status: 'ACTIVE',
        balance: { value: 1000, currency: 'EUR' },
        availableBalance: { value: 1000, currency: 'EUR' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(true)
    })
  })
  
  describe('WalletSchema - Invalid Cases', () => {
    it('should reject availableBalance > balance', () => {
      const result = WalletSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        ownerId: '223e4567-e89b-12d3-a456-426614174000',
        type: 'PERSONAL',
        status: 'ACTIVE',
        balance: { value: 1000, currency: 'EUR' },
        availableBalance: { value: 1100, currency: 'EUR' }, // > balance
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('balance disponible')
      }
    })
    
    it('should reject different currencies for balance and availableBalance', () => {
      const result = WalletSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        ownerId: '223e4567-e89b-12d3-a456-426614174000',
        type: 'PERSONAL',
        status: 'ACTIVE',
        balance: { value: 1000, currency: 'EUR' },
        availableBalance: { value: 900, currency: 'USD' }, // Devise différente
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.errors[0].message).toContain('devises')
      }
    })
    
    it('should reject invalid owner UUID', () => {
      const result = WalletSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        ownerId: 'invalid-uuid',
        type: 'PERSONAL',
        status: 'ACTIVE',
        balance: { value: 1000, currency: 'EUR' },
        availableBalance: { value: 1000, currency: 'EUR' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(false)
    })
  })
  
  describe('WalletLimitsSchema', () => {
    it('should validate wallet limits', () => {
      const result = WalletLimitsSchema.safeParse({
        walletId: '123e4567-e89b-12d3-a456-426614174000',
        maxBalance: { value: 10000, currency: 'EUR' },
        maxTransactionAmount: { value: 5000, currency: 'EUR' },
        dailyLimit: { value: 2000, currency: 'EUR' },
        monthlyLimit: { value: 10000, currency: 'EUR' },
        minTransactionAmount: { value: 0.01, currency: 'EUR' },
        maxTransactionsPerDay: 50,
        maxTransactionsPerMonth: 500
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept optional limits', () => {
      const result = WalletLimitsSchema.safeParse({
        walletId: '123e4567-e89b-12d3-a456-426614174000',
        dailyLimit: { value: 1000, currency: 'EUR' }
      })
      
      expect(result.success).toBe(true)
    })
  })
  
  describe('WalletHistorySchema', () => {
    it('should validate wallet history', () => {
      const result = WalletHistorySchema.safeParse({
        walletId: '123e4567-e89b-12d3-a456-426614174000',
        period: {
          start: new Date('2025-01-01').toISOString(),
          end: new Date('2025-12-31').toISOString()
        },
        initialBalance: { value: 1000, currency: 'EUR' },
        finalBalance: { value: 1500, currency: 'EUR' },
        totalCredits: { value: 2000, currency: 'EUR' },
        totalDebits: { value: 1500, currency: 'EUR' },
        transactionCount: {
          total: 100,
          credits: 40,
          debits: 60
        }
      })
      
      expect(result.success).toBe(true)
    })
  })
  
  describe('WalletOperationSchema', () => {
    it('should validate credit operation', () => {
      const result = WalletOperationSchema.safeParse({
        type: 'CREDIT',
        walletId: '123e4567-e89b-12d3-a456-426614174000',
        amount: { value: 100, currency: 'EUR' },
        balanceBefore: { value: 500, currency: 'EUR' },
        balanceAfter: { value: 600, currency: 'EUR' },
        reference: 'TRX-123',
        description: 'Payment received',
        operatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should validate debit operation', () => {
      const result = WalletOperationSchema.safeParse({
        type: 'DEBIT',
        walletId: '123e4567-e89b-12d3-a456-426614174000',
        amount: { value: 50, currency: 'EUR' },
        balanceBefore: { value: 600, currency: 'EUR' },
        balanceAfter: { value: 550, currency: 'EUR' },
        operatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(true)
    })
  })
  
  describe('Helper Functions', () => {
    it('should validate wallet', () => {
      const result = validateWallet({
        id: '123e4567-e89b-12d3-a456-426614174000',
        ownerId: '223e4567-e89b-12d3-a456-426614174000',
        type: 'PERSONAL',
        status: 'ACTIVE',
        balance: { value: 1000, currency: 'EUR' },
        availableBalance: { value: 1000, currency: 'EUR' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should parse wallet', () => {
      const wallet = parseWallet({
        id: '123e4567-e89b-12d3-a456-426614174000',
        ownerId: '223e4567-e89b-12d3-a456-426614174000',
        type: 'PERSONAL',
        status: 'ACTIVE',
        balance: { value: 1000, currency: 'EUR' },
        availableBalance: { value: 1000, currency: 'EUR' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(wallet.type).toBe('PERSONAL')
      expect(wallet.balance.value).toBe(1000)
    })
    
    it('should create empty wallet', () => {
      const wallet = createEmptyWallet(
        '223e4567-e89b-12d3-a456-426614174000',
        'USD',
        'BUSINESS'
      )
      
      expect(wallet.ownerId).toBe('223e4567-e89b-12d3-a456-426614174000')
      expect(wallet.type).toBe('BUSINESS')
      expect(wallet.status).toBe('ACTIVE')
      expect(wallet.balance.value).toBe(0)
      expect(wallet.balance.currency).toBe('USD')
      expect(wallet.availableBalance.value).toBe(0)
    })
    
    it('should create empty wallet with defaults', () => {
      const wallet = createEmptyWallet('223e4567-e89b-12d3-a456-426614174000')
      
      expect(wallet.type).toBe('PERSONAL')
      expect(wallet.balance.currency).toBe('EUR')
    })
  })
  
  describe('Real-world Scenarios', () => {
    it('should validate wallet with blocked balance', () => {
      const result = WalletSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        ownerId: '223e4567-e89b-12d3-a456-426614174000',
        type: 'PERSONAL',
        status: 'ACTIVE',
        balance: { value: 1000, currency: 'EUR' },
        availableBalance: { value: 800, currency: 'EUR' },
        blockedBalance: { value: 200, currency: 'EUR' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should validate business wallet with limits', () => {
      const walletResult = WalletSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        ownerId: '223e4567-e89b-12d3-a456-426614174000',
        type: 'BUSINESS',
        status: 'ACTIVE',
        balance: { value: 50000, currency: 'EUR' },
        availableBalance: { value: 50000, currency: 'EUR' },
        name: 'Business Main Wallet',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      const limitsResult = WalletLimitsSchema.safeParse({
        walletId: '123e4567-e89b-12d3-a456-426614174000',
        maxBalance: { value: 100000, currency: 'EUR' },
        dailyLimit: { value: 10000, currency: 'EUR' },
        monthlyLimit: { value: 50000, currency: 'EUR' }
      })
      
      expect(walletResult.success).toBe(true)
      expect(limitsResult.success).toBe(true)
    })
    
    it('should validate wallet operation sequence', () => {
      // Crédit
      const creditResult = WalletOperationSchema.safeParse({
        type: 'CREDIT',
        walletId: '123e4567-e89b-12d3-a456-426614174000',
        amount: { value: 100, currency: 'EUR' },
        balanceBefore: { value: 500, currency: 'EUR' },
        balanceAfter: { value: 600, currency: 'EUR' },
        reference: 'TRX-001',
        operatedAt: new Date().toISOString()
      })
      
      // Débit
      const debitResult = WalletOperationSchema.safeParse({
        type: 'DEBIT',
        walletId: '123e4567-e89b-12d3-a456-426614174000',
        amount: { value: 50, currency: 'EUR' },
        balanceBefore: { value: 600, currency: 'EUR' },
        balanceAfter: { value: 550, currency: 'EUR' },
        reference: 'TRX-002',
        operatedAt: new Date().toISOString()
      })
      
      expect(creditResult.success).toBe(true)
      expect(debitResult.success).toBe(true)
    })
  })
})

