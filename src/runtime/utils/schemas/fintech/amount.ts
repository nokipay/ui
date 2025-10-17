import { z } from 'zod'

/**
 * Schema de validation pour un montant monétaire
 * Garantit la précision et la validité des montants
 */
export const AmountSchema = z.object({
  /**
   * Valeur du montant (en unités de devise)
   * - Doit être positif
   * - Maximum 2 décimales
   * - Maximum 1 million par défaut
   */
  value: z.number()
    .positive('Le montant doit être positif')
    .finite('Le montant doit être un nombre fini')
    .refine(
      (val) => Number.isFinite(val) && !Number.isNaN(val),
      'Montant invalide'
    )
    .refine(
      (val) => {
        // Vérifier max 2 décimales
        const cents = Math.round(val * 100)
        return (val * 100) === cents
      },
      'Maximum 2 décimales autorisées'
    )
    .refine(
      (val) => val <= 1000000,
      'Montant maximum (1 000 000) dépassé'
    ),
  
  /**
   * Code devise ISO 4217
   * Devises supportées : EUR, USD, GBP, XOF, XAF
   */
  currency: z.enum(['EUR', 'USD', 'GBP', 'XOF', 'XAF'], {
    errorMap: () => ({ 
      message: 'Devise non supportée. Devises acceptées : EUR, USD, GBP, XOF, XAF' 
    })
  }),
  
  /**
   * Montant formaté (optionnel)
   * Exemple : "1 234,56 €"
   */
  formatted: z.string().optional()
})

/**
 * Type TypeScript inféré du schema
 */
export type Amount = z.infer<typeof AmountSchema>

/**
 * Schema pour validation avec limites personnalisées
 */
export const createAmountSchema = (options?: {
  min?: number
  max?: number
  currencies?: string[]
}) => {
  let schema = z.object({
    value: z.number()
      .positive('Le montant doit être positif')
      .finite('Le montant doit être un nombre fini')
      .refine(
        (val) => (val * 100) % 1 === 0,
        'Maximum 2 décimales autorisées'
      ),
    currency: z.string(),
    formatted: z.string().optional()
  })
  
  // Ajouter validation min si fournie
  if (options?.min !== undefined) {
    schema = schema.refine(
      (data) => data.value >= options.min!,
      { 
        message: `Montant minimum : ${options.min}`,
        path: ['value']
      }
    )
  }
  
  // Ajouter validation max si fournie
  if (options?.max !== undefined) {
    schema = schema.refine(
      (data) => data.value <= options.max!,
      { 
        message: `Montant maximum : ${options.max}`,
        path: ['value']
      }
    )
  }
  
  return schema
}

/**
 * Helper pour valider un montant
 * @param data - Données à valider
 * @returns Résultat de la validation
 */
export const validateAmount = (data: unknown) => {
  return AmountSchema.safeParse(data)
}

/**
 * Helper pour valider un montant et throw si erreur
 * @param data - Données à valider
 * @returns Montant validé
 * @throws ZodError si validation échoue
 */
export const parseAmount = (data: unknown): Amount => {
  return AmountSchema.parse(data)
}

/**
 * Schema pour un montant négatif (ex: remboursement, annulation)
 */
export const NegativeAmountSchema = AmountSchema.extend({
  value: z.number()
    .negative('Le montant doit être négatif')
    .finite('Le montant doit être un nombre fini')
    .refine(
      (val) => (val * 100) % 1 === 0,
      'Maximum 2 décimales autorisées'
    )
    .refine(
      (val) => val >= -1000000,
      'Montant minimum (-1 000 000) dépassé'
    )
})

export type NegativeAmount = z.infer<typeof NegativeAmountSchema>

/**
 * Schema pour un montant qui peut être zéro ou positif
 */
export const NonNegativeAmountSchema = AmountSchema.extend({
  value: z.number()
    .nonnegative('Le montant ne peut pas être négatif')
    .finite('Le montant doit être un nombre fini')
    .refine(
      (val) => (val * 100) % 1 === 0,
      'Maximum 2 décimales autorisées'
    )
})

export type NonNegativeAmount = z.infer<typeof NonNegativeAmountSchema>

