/**
 * Schemas de validation Zod pour NxPay UI
 * 
 * Tous les schemas sont exportés ici pour faciliter l'import
 * et garantir la cohérence des validations
 */

// Amount schemas
export {
  AmountSchema,
  NegativeAmountSchema,
  NonNegativeAmountSchema,
  createAmountSchema,
  validateAmount,
  parseAmount,
  type Amount,
  type NegativeAmount,
  type NonNegativeAmount
} from './fintech/amount'

// Transaction schemas
export {
  TransactionSchema,
  DetailedTransactionSchema,
  TransactionListSchema,
  TransactionFiltersSchema,
  TransactionStatsSchema,
  TransactionStatusEnum,
  TransactionTypeEnum,
  validateTransaction,
  parseTransaction,
  type Transaction,
  type DetailedTransaction,
  type TransactionList,
  type TransactionFilters,
  type TransactionStats,
  type TransactionStatus,
  type TransactionType
} from './fintech/transaction'

// Fee schemas
export {
  FeeTierSchema,
  FeeStructureSchema,
  FeeCalculationSchema,
  SimpleFeeSchema,
  validateFeeStructure,
  parseFeeStructure,
  createFeeStructure,
  EXAMPLE_FEE_STRUCTURES,
  type FeeTier,
  type FeeStructure,
  type FeeCalculation,
  type SimpleFee
} from './fintech/fee'

// Wallet schemas
export {
  WalletSchema,
  WalletLimitsSchema,
  WalletHistorySchema,
  WalletOperationSchema,
  WalletStatsSchema,
  WalletStatusEnum,
  WalletTypeEnum,
  validateWallet,
  parseWallet,
  createEmptyWallet,
  type Wallet,
  type WalletLimits,
  type WalletHistory,
  type WalletOperation,
  type WalletStats,
  type WalletStatus,
  type WalletType
} from './fintech/wallet'

