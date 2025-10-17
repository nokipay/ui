import { z } from 'zod'
import { AmountSchema } from './amount'

/**
 * Statuts possibles d'une transaction
 */
export const TransactionStatusEnum = z.enum([
  'PENDING',      // En attente
  'PROCESSING',   // En cours de traitement
  'COMPLETED',    // Complétée avec succès
  'FAILED',       // Échouée
  'CANCELLED',    // Annulée
  'REFUNDED'      // Remboursée
])

export type TransactionStatus = z.infer<typeof TransactionStatusEnum>

/**
 * Types de transactions
 */
export const TransactionTypeEnum = z.enum([
  'TRANSFER',     // Transfert entre comptes
  'PAYMENT',      // Paiement marchand
  'WITHDRAWAL',   // Retrait
  'DEPOSIT',      // Dépôt
  'REFUND',       // Remboursement
  'FEE'           // Frais
])

export type TransactionType = z.infer<typeof TransactionTypeEnum>

/**
 * Schema de base pour une transaction
 * Utilisable dans UI Library (générique)
 */
export const TransactionSchema = z.object({
  /**
   * ID unique de la transaction
   */
  id: z.string().uuid('ID de transaction invalide'),
  
  /**
   * Montant de la transaction
   */
  amount: AmountSchema,
  
  /**
   * Type de transaction
   */
  type: TransactionTypeEnum,
  
  /**
   * Statut de la transaction
   */
  status: TransactionStatusEnum,
  
  /**
   * Description (optionnel)
   */
  description: z.string().optional(),
  
  /**
   * Référence externe (optionnel)
   */
  reference: z.string().optional(),
  
  /**
   * Métadonnées additionnelles (optionnel)
   */
  metadata: z.record(z.unknown()).optional(),
  
  /**
   * Date de création
   */
  createdAt: z.string().datetime('Date de création invalide'),
  
  /**
   * Date de mise à jour
   */
  updatedAt: z.string().datetime('Date de mise à jour invalide'),
  
  /**
   * Date de complétion (optionnel)
   */
  completedAt: z.string().datetime().optional()
})

export type Transaction = z.infer<typeof TransactionSchema>

/**
 * Schema pour une transaction avec expéditeur et destinataire
 * (Plus détaillé, pour contextes spécifiques)
 */
export const DetailedTransactionSchema = TransactionSchema.extend({
  /**
   * ID de l'expéditeur
   */
  senderId: z.string().uuid('ID expéditeur invalide'),
  
  /**
   * Nom de l'expéditeur (optionnel)
   */
  senderName: z.string().optional(),
  
  /**
   * ID du destinataire
   */
  receiverId: z.string().uuid('ID destinataire invalide'),
  
  /**
   * Nom du destinataire (optionnel)
   */
  receiverName: z.string().optional(),
  
  /**
   * Frais de transaction (optionnel)
   */
  fee: AmountSchema.optional()
})

export type DetailedTransaction = z.infer<typeof DetailedTransactionSchema>

/**
 * Schema pour une liste de transactions avec pagination
 */
export const TransactionListSchema = z.object({
  /**
   * Liste des transactions
   */
  transactions: z.array(TransactionSchema),
  
  /**
   * Pagination
   */
  pagination: z.object({
    page: z.number().int().positive(),
    perPage: z.number().int().positive(),
    total: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative()
  })
})

export type TransactionList = z.infer<typeof TransactionListSchema>

/**
 * Schema pour filtres de transactions
 */
export const TransactionFiltersSchema = z.object({
  /**
   * Filtrer par statut
   */
  status: TransactionStatusEnum.array().optional(),
  
  /**
   * Filtrer par type
   */
  type: TransactionTypeEnum.array().optional(),
  
  /**
   * Montant minimum
   */
  minAmount: z.number().nonnegative().optional(),
  
  /**
   * Montant maximum
   */
  maxAmount: z.number().positive().optional(),
  
  /**
   * Date de début
   */
  startDate: z.string().datetime().optional(),
  
  /**
   * Date de fin
   */
  endDate: z.string().datetime().optional(),
  
  /**
   * Recherche texte
   */
  search: z.string().optional()
})

export type TransactionFilters = z.infer<typeof TransactionFiltersSchema>

/**
 * Helper pour valider une transaction
 */
export const validateTransaction = (data: unknown) => {
  return TransactionSchema.safeParse(data)
}

/**
 * Helper pour parser une transaction (throw si erreur)
 */
export const parseTransaction = (data: unknown): Transaction => {
  return TransactionSchema.parse(data)
}

/**
 * Schema pour statistiques de transactions
 */
export const TransactionStatsSchema = z.object({
  /**
   * Nombre total de transactions
   */
  total: z.number().int().nonnegative(),
  
  /**
   * Montant total
   */
  totalAmount: AmountSchema,
  
  /**
   * Répartition par statut
   */
  byStatus: z.record(TransactionStatusEnum, z.number().int().nonnegative()),
  
  /**
   * Répartition par type
   */
  byType: z.record(TransactionTypeEnum, z.number().int().nonnegative()),
  
  /**
   * Période
   */
  period: z.object({
    start: z.string().datetime(),
    end: z.string().datetime()
  })
})

export type TransactionStats = z.infer<typeof TransactionStatsSchema>

