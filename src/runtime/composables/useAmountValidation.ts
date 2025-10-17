import { ref, computed } from 'vue'
import { AmountSchema, createAmountSchema } from '../utils/schemas/fintech/amount'
import type { ZodError } from 'zod'

export interface ValidationOptions {
  /** Code devise ISO */
  currency?: string
  /** Montant minimum */
  min?: number
  /** Montant maximum */
  max?: number
  /** Champ requis */
  required?: boolean
}

export interface ValidationResult {
  /** Validation réussie */
  valid: boolean
  /** Messages d'erreur */
  errors: string[]
}

/**
 * Composable pour valider les montants monétaires
 * 
 * @param options - Options de validation
 * @returns Méthodes et état de validation
 * 
 * @example
 * ```typescript
 * const { validate, errors, isValid } = useAmountValidation({
 *   min: 10,
 *   max: 1000,
 *   required: true
 * })
 * 
 * const result = validate(100)
 * if (!result.valid) {
 *   console.log(errors.value) // ['Erreur 1', 'Erreur 2']
 * }
 * ```
 */
export const useAmountValidation = (options: ValidationOptions = {}) => {
  const errors = ref<string[]>([])
  const lastValidatedAmount = ref<number | null>(null)
  
  const isValid = computed(() => errors.value.length === 0)
  
  /**
   * Valider un montant
   * @param amount - Montant à valider
   * @returns Résultat de la validation
   */
  const validate = (amount: number | null): ValidationResult => {
    errors.value = []
    lastValidatedAmount.value = amount
    
    // Check required
    if (options.required && (amount === null || amount === undefined)) {
      errors.value.push('Montant requis')
      return { valid: false, errors: errors.value }
    }
    
    // Si null et pas required, c'est valide
    if (amount === null || amount === undefined) {
      return { valid: true, errors: [] }
    }
    
    // Validation de base avec Zod
    const result = AmountSchema.safeParse({
      value: amount,
      currency: options.currency || 'EUR'
    })
    
    if (!result.success) {
      errors.value = result.error.errors.map(e => e.message)
      return { valid: false, errors: errors.value }
    }
    
    // Validation min
    if (options.min !== undefined && amount < options.min) {
      errors.value.push(`Montant minimum : ${options.min}`)
      return { valid: false, errors: errors.value }
    }
    
    // Validation max
    if (options.max !== undefined && amount > options.max) {
      errors.value.push(`Montant maximum : ${options.max}`)
      return { valid: false, errors: errors.value }
    }
    
    return { valid: true, errors: [] }
  }
  
  /**
   * Valider de manière asynchrone (pour vérifications côté serveur)
   * @param amount - Montant à valider
   * @param asyncValidator - Fonction de validation async
   * @returns Résultat de la validation
   */
  const validateAsync = async (
    amount: number | null,
    asyncValidator?: (amount: number) => Promise<boolean>
  ): Promise<ValidationResult> => {
    // D'abord validation synchrone
    const syncResult = validate(amount)
    
    if (!syncResult.valid || amount === null) {
      return syncResult
    }
    
    // Puis validation asynchrone si fournie
    if (asyncValidator) {
      try {
        const isValid = await asyncValidator(amount)
        if (!isValid) {
          errors.value.push('Validation côté serveur échouée')
          return { valid: false, errors: errors.value }
        }
      } catch (error) {
        errors.value.push('Erreur lors de la validation')
        return { valid: false, errors: errors.value }
      }
    }
    
    return { valid: true, errors: [] }
  }
  
  /**
   * Réinitialiser les erreurs
   */
  const reset = () => {
    errors.value = []
    lastValidatedAmount.value = null
  }
  
  /**
   * Vérifier si un montant est dans les limites
   * @param amount - Montant à vérifier
   * @returns true si dans les limites
   */
  const isWithinLimits = (amount: number): boolean => {
    if (options.min !== undefined && amount < options.min) {
      return false
    }
    if (options.max !== undefined && amount > options.max) {
      return false
    }
    return true
  }
  
  /**
   * Obtenir le message d'erreur formaté
   */
  const errorMessage = computed(() => {
    return errors.value.join(', ')
  })
  
  return {
    // State
    errors,
    isValid,
    errorMessage,
    lastValidatedAmount,
    
    // Methods
    validate,
    validateAsync,
    reset,
    isWithinLimits
  }
}

/**
 * Composable simplifié pour validation rapide
 * @param amount - Montant à valider
 * @param options - Options de validation
 * @returns true si valide
 */
export const validateAmountQuick = (
  amount: number | null,
  options: ValidationOptions = {}
): boolean => {
  const { validate } = useAmountValidation(options)
  return validate(amount).valid
}

