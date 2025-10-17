import { z } from 'zod'
import { AmountSchema } from './amount'

/**
 * Schema pour un palier de frais (tiered fee)
 * Utilisé pour calculer les frais selon le montant
 */
export const FeeTierSchema = z.object({
  /**
   * Montant minimum du palier (inclus)
   */
  min: z.number().nonnegative('Le minimum doit être >= 0'),
  
  /**
   * Montant maximum du palier (exclu)
   * Infinity pour le dernier palier
   */
  max: z.number().positive('Le maximum doit être > 0'),
  
  /**
   * Taux de frais (pourcentage)
   * Ex: 0.02 = 2%
   */
  rate: z.number()
    .nonnegative('Le taux doit être >= 0')
    .max(1, 'Le taux ne peut pas dépasser 100%'),
  
  /**
   * Frais fixes pour ce palier
   */
  fixed: z.number().nonnegative('Les frais fixes doivent être >= 0')
}).refine(
  (data) => data.min < data.max,
  'Le minimum doit être inférieur au maximum'
)

export type FeeTier = z.infer<typeof FeeTierSchema>

/**
 * Schema pour une structure de frais complète
 */
export const FeeStructureSchema = z.object({
  /**
   * ID de la structure de frais
   */
  id: z.string().optional(),
  
  /**
   * Nom de la structure
   */
  name: z.string(),
  
  /**
   * Description
   */
  description: z.string().optional(),
  
  /**
   * Paliers de frais (triés par ordre croissant de min)
   */
  tiers: z.array(FeeTierSchema)
    .min(1, 'Au moins un palier de frais requis')
    .refine(
      (tiers) => {
        // Vérifier que les paliers sont consécutifs et sans overlap
        for (let i = 0; i < tiers.length - 1; i++) {
          if (tiers[i].max !== tiers[i + 1].min) {
            return false
          }
        }
        return true
      },
      'Les paliers doivent être consécutifs sans overlap'
    ),
  
  /**
   * Devise de la structure de frais
   */
  currency: z.enum(['EUR', 'USD', 'GBP', 'XOF', 'XAF']),
  
  /**
   * Frais minimum (optionnel)
   */
  minFee: AmountSchema.optional(),
  
  /**
   * Frais maximum (optionnel)
   */
  maxFee: AmountSchema.optional(),
  
  /**
   * Active ou non
   */
  active: z.boolean().default(true),
  
  /**
   * Date de début de validité
   */
  validFrom: z.string().datetime().optional(),
  
  /**
   * Date de fin de validité
   */
  validUntil: z.string().datetime().optional()
})

export type FeeStructure = z.infer<typeof FeeStructureSchema>

/**
 * Schema pour un calcul de frais
 */
export const FeeCalculationSchema = z.object({
  /**
   * Montant de base sur lequel les frais sont calculés
   */
  baseAmount: AmountSchema,
  
  /**
   * Structure de frais utilisée
   */
  feeStructure: FeeStructureSchema,
  
  /**
   * Montant des frais calculés
   */
  feeAmount: AmountSchema,
  
  /**
   * Détail du calcul par palier
   */
  breakdown: z.array(z.object({
    tier: FeeTierSchema,
    applicableAmount: z.number().nonnegative(),
    calculatedFee: z.number().nonnegative()
  })).optional(),
  
  /**
   * Date du calcul
   */
  calculatedAt: z.string().datetime()
})

export type FeeCalculation = z.infer<typeof FeeCalculationSchema>

/**
 * Schema pour frais simple (montant fixe ou pourcentage)
 */
export const SimpleFeeSchema = z.object({
  /**
   * Type de frais
   */
  type: z.enum(['FIXED', 'PERCENTAGE']),
  
  /**
   * Valeur
   * - Pour FIXED: montant en devise
   * - Pour PERCENTAGE: valeur entre 0 et 1 (ex: 0.02 = 2%)
   */
  value: z.number().nonnegative(),
  
  /**
   * Devise (pour FIXED)
   */
  currency: z.enum(['EUR', 'USD', 'GBP', 'XOF', 'XAF']).optional(),
  
  /**
   * Description
   */
  description: z.string().optional()
})

export type SimpleFee = z.infer<typeof SimpleFeeSchema>

/**
 * Helper pour valider une structure de frais
 */
export const validateFeeStructure = (data: unknown) => {
  return FeeStructureSchema.safeParse(data)
}

/**
 * Helper pour parser une structure de frais (throw si erreur)
 */
export const parseFeeStructure = (data: unknown): FeeStructure => {
  return FeeStructureSchema.parse(data)
}

/**
 * Helper pour créer une structure de frais simple
 * @param name - Nom de la structure
 * @param tiers - Paliers de frais
 * @param currency - Devise
 */
export const createFeeStructure = (
  name: string,
  tiers: FeeTier[],
  currency: 'EUR' | 'USD' | 'GBP' | 'XOF' | 'XAF' = 'EUR'
): FeeStructure => {
  return {
    name,
    tiers,
    currency,
    active: true
  }
}

/**
 * Exemples de structures de frais prédéfinies
 */
export const EXAMPLE_FEE_STRUCTURES = {
  /**
   * Structure simple : 2% + 0.50€
   */
  SIMPLE: createFeeStructure(
    'Simple',
    [
      { min: 0, max: Infinity, rate: 0.02, fixed: 0.50 }
    ],
    'EUR'
  ),
  
  /**
   * Structure progressive
   */
  PROGRESSIVE: createFeeStructure(
    'Progressive',
    [
      { min: 0, max: 100, rate: 0.02, fixed: 0.50 },
      { min: 100, max: 1000, rate: 0.015, fixed: 0.30 },
      { min: 1000, max: Infinity, rate: 0.01, fixed: 0.20 }
    ],
    'EUR'
  )
} as const

