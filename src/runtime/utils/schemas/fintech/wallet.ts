import { z } from 'zod'
import { AmountSchema } from './amount'

/**
 * Statuts possibles d'un wallet
 */
export const WalletStatusEnum = z.enum([
  'ACTIVE',       // Actif
  'INACTIVE',     // Inactif
  'SUSPENDED',    // Suspendu
  'FROZEN',       // Gelé
  'CLOSED'        // Fermé
])

export type WalletStatus = z.infer<typeof WalletStatusEnum>

/**
 * Types de wallet
 */
export const WalletTypeEnum = z.enum([
  'PERSONAL',     // Personnel
  'BUSINESS',     // Entreprise
  'SAVINGS',      // Épargne
  'ESCROW'        // Séquestre
])

export type WalletType = z.infer<typeof WalletTypeEnum>

/**
 * Schema pour un wallet (portefeuille)
 */
export const WalletSchema = z.object({
  /**
   * ID unique du wallet
   */
  id: z.string().uuid('ID de wallet invalide'),
  
  /**
   * ID du propriétaire
   */
  ownerId: z.string().uuid('ID propriétaire invalide'),
  
  /**
   * Type de wallet
   */
  type: WalletTypeEnum,
  
  /**
   * Statut du wallet
   */
  status: WalletStatusEnum,
  
  /**
   * Balance actuelle
   */
  balance: AmountSchema,
  
  /**
   * Balance disponible (balance - montants bloqués)
   */
  availableBalance: AmountSchema,
  
  /**
   * Balance bloquée
   */
  blockedBalance: AmountSchema.optional(),
  
  /**
   * Nom du wallet (optionnel)
   */
  name: z.string().optional(),
  
  /**
   * Description (optionnel)
   */
  description: z.string().optional(),
  
  /**
   * Date de création
   */
  createdAt: z.string().datetime(),
  
  /**
   * Date de mise à jour
   */
  updatedAt: z.string().datetime(),
  
  /**
   * Date de dernière transaction
   */
  lastTransactionAt: z.string().datetime().optional()
}).refine(
  (data) => {
    // Vérifier que availableBalance <= balance
    return data.availableBalance.value <= data.balance.value
  },
  'La balance disponible ne peut pas dépasser la balance totale'
).refine(
  (data) => {
    // Vérifier que les devises sont identiques
    return data.availableBalance.currency === data.balance.currency
  },
  'Les devises doivent être identiques'
)

export type Wallet = z.infer<typeof WalletSchema>

/**
 * Schema pour les limites d'un wallet
 */
export const WalletLimitsSchema = z.object({
  /**
   * ID du wallet
   */
  walletId: z.string().uuid(),
  
  /**
   * Limite de balance maximale
   */
  maxBalance: AmountSchema.optional(),
  
  /**
   * Limite de transaction unique
   */
  maxTransactionAmount: AmountSchema.optional(),
  
  /**
   * Limite journalière
   */
  dailyLimit: AmountSchema.optional(),
  
  /**
   * Limite mensuelle
   */
  monthlyLimit: AmountSchema.optional(),
  
  /**
   * Montant minimal par transaction
   */
  minTransactionAmount: AmountSchema.optional(),
  
  /**
   * Nombre maximum de transactions par jour
   */
  maxTransactionsPerDay: z.number().int().positive().optional(),
  
  /**
   * Nombre maximum de transactions par mois
   */
  maxTransactionsPerMonth: z.number().int().positive().optional()
})

export type WalletLimits = z.infer<typeof WalletLimitsSchema>

/**
 * Schema pour l'historique d'un wallet
 */
export const WalletHistorySchema = z.object({
  /**
   * ID du wallet
   */
  walletId: z.string().uuid(),
  
  /**
   * Période
   */
  period: z.object({
    start: z.string().datetime(),
    end: z.string().datetime()
  }),
  
  /**
   * Balance initiale
   */
  initialBalance: AmountSchema,
  
  /**
   * Balance finale
   */
  finalBalance: AmountSchema,
  
  /**
   * Total des crédits
   */
  totalCredits: AmountSchema,
  
  /**
   * Total des débits
   */
  totalDebits: AmountSchema,
  
  /**
   * Nombre de transactions
   */
  transactionCount: z.object({
    total: z.number().int().nonnegative(),
    credits: z.number().int().nonnegative(),
    debits: z.number().int().nonnegative()
  })
})

export type WalletHistory = z.infer<typeof WalletHistorySchema>

/**
 * Schema pour une opération sur wallet (crédit/débit)
 */
export const WalletOperationSchema = z.object({
  /**
   * Type d'opération
   */
  type: z.enum(['CREDIT', 'DEBIT']),
  
  /**
   * ID du wallet
   */
  walletId: z.string().uuid(),
  
  /**
   * Montant de l'opération
   */
  amount: AmountSchema,
  
  /**
   * Balance avant l'opération
   */
  balanceBefore: AmountSchema,
  
  /**
   * Balance après l'opération
   */
  balanceAfter: AmountSchema,
  
  /**
   * Référence (ex: ID de transaction)
   */
  reference: z.string().optional(),
  
  /**
   * Description
   */
  description: z.string().optional(),
  
  /**
   * Métadonnées
   */
  metadata: z.record(z.unknown()).optional(),
  
  /**
   * Date de l'opération
   */
  operatedAt: z.string().datetime()
})

export type WalletOperation = z.infer<typeof WalletOperationSchema>

/**
 * Helper pour valider un wallet
 */
export const validateWallet = (data: unknown) => {
  return WalletSchema.safeParse(data)
}

/**
 * Helper pour parser un wallet (throw si erreur)
 */
export const parseWallet = (data: unknown): Wallet => {
  return WalletSchema.parse(data)
}

/**
 * Helper pour créer un wallet vide
 */
export const createEmptyWallet = (
  ownerId: string,
  currency: 'EUR' | 'USD' | 'GBP' | 'XOF' | 'XAF' = 'EUR',
  type: WalletType = 'PERSONAL'
): Omit<Wallet, 'id' | 'createdAt' | 'updatedAt'> => {
  const now = new Date().toISOString()
  
  return {
    ownerId,
    type,
    status: 'ACTIVE',
    balance: {
      value: 0,
      currency
    },
    availableBalance: {
      value: 0,
      currency
    }
  }
}

/**
 * Schema pour statistiques de wallets
 */
export const WalletStatsSchema = z.object({
  /**
   * Nombre total de wallets
   */
  total: z.number().int().nonnegative(),
  
  /**
   * Répartition par statut
   */
  byStatus: z.record(WalletStatusEnum, z.number().int().nonnegative()),
  
  /**
   * Répartition par type
   */
  byType: z.record(WalletTypeEnum, z.number().int().nonnegative()),
  
  /**
   * Balance totale (tous wallets)
   */
  totalBalance: AmountSchema,
  
  /**
   * Balance moyenne
   */
  averageBalance: AmountSchema
})

export type WalletStats = z.infer<typeof WalletStatsSchema>

