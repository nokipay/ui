import { describe, it, expect } from 'vitest'
import {
  TransactionSchema,
  DetailedTransactionSchema,
  TransactionListSchema,
  TransactionFiltersSchema,
  TransactionStatusEnum,
  TransactionTypeEnum,
  validateTransaction,
  parseTransaction
} from '../../src/runtime/utils/schemas/fintech/transaction'

describe('Transaction Schema', () => {
  describe('TransactionSchema - Valid Cases', () => {
    it('should validate a valid transaction', () => {
      const result = TransactionSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: {
          value: 100,
          currency: 'EUR'
        },
        type: 'TRANSFER',
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept all transaction statuses', () => {
      const statuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED']
      
      statuses.forEach(status => {
        const result = TransactionSchema.safeParse({
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: { value: 100, currency: 'EUR' },
          type: 'TRANSFER',
          status,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        
        expect(result.success).toBe(true)
      })
    })
    
    it('should accept all transaction types', () => {
      const types = ['TRANSFER', 'PAYMENT', 'WITHDRAWAL', 'DEPOSIT', 'REFUND', 'FEE']
      
      types.forEach(type => {
        const result = TransactionSchema.safeParse({
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: { value: 100, currency: 'EUR' },
          type,
          status: 'COMPLETED',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        
        expect(result.success).toBe(true)
      })
    })
    
    it('should accept optional fields', () => {
      const result = TransactionSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: { value: 100, currency: 'EUR' },
        type: 'TRANSFER',
        status: 'COMPLETED',
        description: 'Payment for services',
        reference: 'REF123',
        metadata: { userId: '123', note: 'Test' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(true)
    })
  })
  
  describe('TransactionSchema - Invalid Cases', () => {
    it('should reject invalid UUID', () => {
      const result = TransactionSchema.safeParse({
        id: 'invalid-uuid',
        amount: { value: 100, currency: 'EUR' },
        type: 'TRANSFER',
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject invalid amount', () => {
      const result = TransactionSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: { value: -10, currency: 'EUR' }, // Négatif
        type: 'TRANSFER',
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject invalid status', () => {
      const result = TransactionSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: { value: 100, currency: 'EUR' },
        type: 'TRANSFER',
        status: 'INVALID_STATUS',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject invalid type', () => {
      const result = TransactionSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: { value: 100, currency: 'EUR' },
        type: 'INVALID_TYPE',
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(false)
    })
    
    it('should reject invalid date format', () => {
      const result = TransactionSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: { value: 100, currency: 'EUR' },
        type: 'TRANSFER',
        status: 'COMPLETED',
        createdAt: '2025-10-17', // Pas ISO datetime
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(false)
    })
  })
  
  describe('DetailedTransactionSchema', () => {
    it('should validate detailed transaction', () => {
      const result = DetailedTransactionSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: { value: 100, currency: 'EUR' },
        type: 'TRANSFER',
        status: 'COMPLETED',
        senderId: '223e4567-e89b-12d3-a456-426614174000',
        senderName: 'John Doe',
        receiverId: '323e4567-e89b-12d3-a456-426614174000',
        receiverName: 'Jane Smith',
        fee: { value: 2, currency: 'EUR' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should reject invalid sender UUID', () => {
      const result = DetailedTransactionSchema.safeParse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: { value: 100, currency: 'EUR' },
        type: 'TRANSFER',
        status: 'COMPLETED',
        senderId: 'invalid',
        receiverId: '323e4567-e89b-12d3-a456-426614174000',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(false)
    })
  })
  
  describe('TransactionListSchema', () => {
    it('should validate transaction list with pagination', () => {
      const result = TransactionListSchema.safeParse({
        transactions: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            amount: { value: 100, currency: 'EUR' },
            type: 'TRANSFER',
            status: 'COMPLETED',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ],
        pagination: {
          page: 1,
          perPage: 10,
          total: 50,
          totalPages: 5
        }
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept empty transaction list', () => {
      const result = TransactionListSchema.safeParse({
        transactions: [],
        pagination: {
          page: 1,
          perPage: 10,
          total: 0,
          totalPages: 0
        }
      })
      
      expect(result.success).toBe(true)
    })
  })
  
  describe('TransactionFiltersSchema', () => {
    it('should validate filters', () => {
      const result = TransactionFiltersSchema.safeParse({
        status: ['COMPLETED', 'PENDING'],
        type: ['TRANSFER'],
        minAmount: 10,
        maxAmount: 1000,
        startDate: new Date('2025-01-01').toISOString(),
        endDate: new Date('2025-12-31').toISOString(),
        search: 'John'
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should accept empty filters', () => {
      const result = TransactionFiltersSchema.safeParse({})
      
      expect(result.success).toBe(true)
    })
    
    it('should accept partial filters', () => {
      const result = TransactionFiltersSchema.safeParse({
        status: ['COMPLETED'],
        minAmount: 100
      })
      
      expect(result.success).toBe(true)
    })
  })
  
  describe('TransactionStatsSchema', () => {
    it('should validate transaction stats', () => {
      const result = TransactionStatsSchema.safeParse({
        total: 100,
        totalAmount: { value: 5000, currency: 'EUR' },
        byStatus: {
          PENDING: 10,
          PROCESSING: 5,
          COMPLETED: 80,
          FAILED: 3,
          CANCELLED: 2,
          REFUNDED: 0
        },
        byType: {
          TRANSFER: 50,
          PAYMENT: 30,
          WITHDRAWAL: 10,
          DEPOSIT: 5,
          REFUND: 3,
          FEE: 2
        },
        period: {
          start: new Date('2025-01-01').toISOString(),
          end: new Date('2025-12-31').toISOString()
        }
      })
      
      expect(result.success).toBe(true)
    })
  })
  
  describe('Helper Functions', () => {
    it('should validate valid transaction', () => {
      const result = validateTransaction({
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: { value: 100, currency: 'EUR' },
        type: 'TRANSFER',
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(result.success).toBe(true)
    })
    
    it('should parse valid transaction', () => {
      const transaction = parseTransaction({
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: { value: 100, currency: 'EUR' },
        type: 'TRANSFER',
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      expect(transaction.id).toBe('123e4567-e89b-12d3-a456-426614174000')
      expect(transaction.amount.value).toBe(100)
    })
    
    it('should throw on invalid transaction', () => {
      expect(() => {
        parseTransaction({ invalid: 'data' })
      }).toThrow()
    })
  })
})

