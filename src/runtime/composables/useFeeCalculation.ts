import { computed } from 'vue'
import { Money } from '../utils/helpers/fintech/precisionMath'
import type { FeeTier, FeeStructure } from '../utils/schemas/fintech/fee'

export interface FeeBreakdown {
  /** Palier de frais utilisé */
  tier: FeeTier
  /** Montant applicable à ce palier */
  applicableAmount: number
  /** Frais variable calculé */
  variableFee: number
  /** Frais fixe */
  fixedFee: number
  /** Total frais pour ce palier */
  totalFee: number
}

export interface FeeCalculationResult {
  /** Montant de base */
  baseAmount: number
  /** Montant total des frais */
  totalFee: number
  /** Montant final (base + frais) */
  finalAmount: number
  /** Détail du calcul par palier */
  breakdown: FeeBreakdown[]
  /** Devise */
  currency: string
}

/**
 * Composable pour calculer les frais de transaction
 * 
 * Supporte les structures de frais à paliers (tiered fees)
 * 
 * @example
 * ```typescript
 * const { calculateFee, formatBreakdown } = useFeeCalculation()
 * 
 * const feeStructure = {
 *   tiers: [
 *     { min: 0, max: 100, rate: 0.02, fixed: 0.50 },
 *     { min: 100, max: Infinity, rate: 0.01, fixed: 0.30 }
 *   ],
 *   currency: 'EUR'
 * }
 * 
 * const result = calculateFee(250, feeStructure)
 * console.log(result.totalFee) // Frais calculés
 * console.log(result.breakdown) // Détail par palier
 * ```
 */
export const useFeeCalculation = () => {
  /**
   * Calculer les frais selon une structure à paliers
   * 
   * @param amount - Montant de base
   * @param structure - Structure de frais (avec paliers)
   * @returns Résultat détaillé du calcul
   */
  const calculateFee = (
    amount: number,
    structure: FeeStructure | FeeTier[]
  ): FeeCalculationResult => {
    // Normaliser structure (accepte FeeStructure ou juste les tiers)
    const tiers = Array.isArray(structure) ? structure : structure.tiers
    const currency = Array.isArray(structure) ? 'EUR' : structure.currency
    
    const breakdown: FeeBreakdown[] = []
    let totalFeeAmount = 0
    let remaining = amount
    
    // Calculer pour chaque palier
    for (const tier of tiers) {
      if (remaining <= 0) break
      
      // Montant applicable à ce palier
      const tierRange = tier.max === Infinity 
        ? remaining 
        : Math.min(remaining, tier.max - tier.min)
      
      const applicableAmount = Math.min(remaining, tierRange)
      
      // Frais variable (pourcentage)
      const variableFee = applicableAmount * tier.rate
      
      // Frais fixe
      const fixedFee = tier.fixed
      
      // Total pour ce palier
      const tierTotalFee = variableFee + fixedFee
      
      // Ajouter au breakdown
      breakdown.push({
        tier,
        applicableAmount,
        variableFee,
        fixedFee,
        totalFee: tierTotalFee
      })
      
      totalFeeAmount += tierTotalFee
      remaining -= applicableAmount
    }
    
    // Arrondir à 2 décimales (éviter erreurs float)
    const totalFee = Math.round(totalFeeAmount * 100) / 100
    const finalAmount = Math.round((amount + totalFee) * 100) / 100
    
    return {
      baseAmount: amount,
      totalFee,
      finalAmount,
      breakdown,
      currency
    }
  }
  
  /**
   * Calculer les frais avec Money class (précision garantie)
   * 
   * @param amount - Montant de base
   * @param structure - Structure de frais
   * @returns Objet Money avec les frais
   */
  const calculateFeePrecise = (
    amount: number,
    structure: FeeStructure | FeeTier[]
  ): Money => {
    const result = calculateFee(amount, structure)
    const currency = Array.isArray(structure) ? 'EUR' : structure.currency
    return new Money(result.totalFee, currency)
  }
  
  /**
   * Calculer le montant final (base + frais) avec précision
   * 
   * @param amount - Montant de base
   * @param structure - Structure de frais
   * @returns Objet Money avec le total
   */
  const calculateTotal = (
    amount: number,
    structure: FeeStructure | FeeTier[]
  ): Money => {
    const currency = Array.isArray(structure) ? 'EUR' : structure.currency
    const baseAmount = new Money(amount, currency)
    const feeAmount = calculateFeePrecise(amount, structure)
    return baseAmount.add(feeAmount)
  }
  
  /**
   * Formater le breakdown pour affichage
   * 
   * @param breakdown - Détail du calcul
   * @param locale - Locale pour formatage
   * @returns Array de strings formatés
   */
  const formatBreakdown = (
    breakdown: FeeBreakdown[],
    locale: string = 'fr-FR'
  ): string[] => {
    return breakdown.map((item, index) => {
      const tier = item.tier
      const rangeText = tier.max === Infinity
        ? `> ${tier.min}`
        : `${tier.min} - ${tier.max}`
      
      return `Palier ${index + 1} (${rangeText}): ${item.totalFee.toFixed(2)}`
    })
  }
  
  /**
   * Calculer le pourcentage effectif de frais
   * 
   * @param amount - Montant de base
   * @param totalFee - Frais total
   * @returns Pourcentage (ex: 0.025 = 2.5%)
   */
  const calculateEffectiveRate = (amount: number, totalFee: number): number => {
    if (amount === 0) return 0
    return totalFee / amount
  }
  
  /**
   * Vérifier si frais min/max sont dépassés
   * 
   * @param fee - Frais calculés
   * @param structure - Structure de frais
   * @returns Frais ajustés
   */
  const applyMinMaxFee = (fee: number, structure: FeeStructure): number => {
    let adjustedFee = fee
    
    // Appliquer frais minimum
    if (structure.minFee && fee < structure.minFee.value) {
      adjustedFee = structure.minFee.value
    }
    
    // Appliquer frais maximum
    if (structure.maxFee && fee > structure.maxFee.value) {
      adjustedFee = structure.maxFee.value
    }
    
    return adjustedFee
  }
  
  return {
    // Main methods
    calculateFee,
    calculateFeePrecise,
    calculateTotal,
    
    // Utility methods
    formatBreakdown,
    calculateEffectiveRate,
    applyMinMaxFee
  }
}

/**
 * Helper pour calculer rapidement les frais
 * 
 * @param amount - Montant de base
 * @param tiers - Paliers de frais
 * @returns Montant des frais
 */
export const calculateQuickFee = (
  amount: number,
  tiers: FeeTier[]
): number => {
  const { calculateFee } = useFeeCalculation()
  return calculateFee(amount, tiers).totalFee
}

