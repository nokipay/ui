/**
 * Money class - Évite les erreurs de précision des floats
 * CRITIQUE pour applications financières
 * 
 * Problème : 0.1 + 0.2 = 0.30000000000000004
 * Solution : Utiliser BigInt avec centimes
 * 
 * @example
 * ```typescript
 * const a = new Money(0.1, 'EUR')
 * const b = new Money(0.2, 'EUR')
 * const sum = a.add(b)
 * console.log(sum.toNumber()) // 0.3 ✅ (pas 0.30000000000000004)
 * ```
 */

export class Money {
  private readonly cents: bigint
  public readonly currency: string
  
  /**
   * Créer un montant monétaire précis
   * @param amount - Montant en unité de devise (ex: 19.99)
   * @param currency - Code devise ISO (EUR, USD, etc.)
   */
  constructor(amount: number | string, currency: string = 'EUR') {
    if (typeof amount === 'number') {
      // Convertir en centimes pour éviter erreurs de précision
      this.cents = BigInt(Math.round(amount * 100))
    } else {
      // Parser string "19.99" → 1999n
      const [whole, decimal = '00'] = amount.split('.')
      const paddedDecimal = decimal.padEnd(2, '0').slice(0, 2)
      this.cents = BigInt(whole + paddedDecimal)
    }
    this.currency = currency
  }
  
  /**
   * Additionner deux montants
   * @throws Error si devises différentes
   */
  add(other: Money): Money {
    this.assertSameCurrency(other)
    const result = new Money(0, this.currency)
    // @ts-ignore - On modifie cents directement pour performance
    result.cents = this.cents + other.cents
    return result
  }
  
  /**
   * Soustraire deux montants
   * @throws Error si devises différentes
   */
  subtract(other: Money): Money {
    this.assertSameCurrency(other)
    const result = new Money(0, this.currency)
    // @ts-ignore
    result.cents = this.cents - other.cents
    return result
  }
  
  /**
   * Multiplier par un facteur
   * @param factor - Facteur de multiplication (ex: 1.5)
   */
  multiply(factor: number): Money {
    const result = new Money(0, this.currency)
    const factorCents = BigInt(Math.round(factor * 100))
    // @ts-ignore
    result.cents = (this.cents * factorCents) / 100n
    return result
  }
  
  /**
   * Diviser par un diviseur
   * @param divisor - Diviseur (ex: 2)
   */
  divide(divisor: number): Money {
    const result = new Money(0, this.currency)
    const divisorCents = BigInt(Math.round(divisor * 100))
    // @ts-ignore
    result.cents = (this.cents * 100n) / divisorCents
    return result
  }
  
  /**
   * Convertir en nombre (avec perte de précision potentielle)
   */
  toNumber(): number {
    return Number(this.cents) / 100
  }
  
  /**
   * Convertir en string (ex: "19.99")
   */
  toString(): string {
    const isNegative = this.cents < 0n
    const absoluteCents = isNegative ? -this.cents : this.cents
    const whole = absoluteCents / 100n
    const decimal = (absoluteCents % 100n).toString().padStart(2, '0')
    return `${isNegative ? '-' : ''}${whole}.${decimal}`
  }
  
  /**
   * Formater selon locale
   * @param locale - Locale (ex: 'fr-FR', 'en-US')
   */
  format(locale: string = 'fr-FR'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: this.currency
    }).format(this.toNumber())
  }
  
  /**
   * Vérifier égalité
   */
  equals(other: Money): boolean {
    return this.currency === other.currency && this.cents === other.cents
  }
  
  /**
   * Comparer supérieur
   */
  greaterThan(other: Money): boolean {
    this.assertSameCurrency(other)
    return this.cents > other.cents
  }
  
  /**
   * Comparer inférieur
   */
  lessThan(other: Money): boolean {
    this.assertSameCurrency(other)
    return this.cents < other.cents
  }
  
  /**
   * Comparer supérieur ou égal
   */
  greaterThanOrEqual(other: Money): boolean {
    this.assertSameCurrency(other)
    return this.cents >= other.cents
  }
  
  /**
   * Comparer inférieur ou égal
   */
  lessThanOrEqual(other: Money): boolean {
    this.assertSameCurrency(other)
    return this.cents <= other.cents
  }
  
  /**
   * Vérifier si positif
   */
  isPositive(): boolean {
    return this.cents > 0n
  }
  
  /**
   * Vérifier si négatif
   */
  isNegative(): boolean {
    return this.cents < 0n
  }
  
  /**
   * Vérifier si zéro
   */
  isZero(): boolean {
    return this.cents === 0n
  }
  
  /**
   * Valeur absolue
   */
  abs(): Money {
    if (this.cents < 0n) {
      const result = new Money(0, this.currency)
      // @ts-ignore
      result.cents = -this.cents
      return result
    }
    return this
  }
  
  /**
   * Vérifier que deux Money ont la même devise
   * @private
   */
  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error(
        `Currency mismatch: cannot operate on ${this.currency} and ${other.currency}`
      )
    }
  }
  
  /**
   * Créer un montant zéro
   */
  static zero(currency: string = 'EUR'): Money {
    return new Money(0, currency)
  }
  
  /**
   * Créer depuis centimes
   * @param cents - Montant en centimes
   * @param currency - Code devise
   */
  static fromCents(cents: number | bigint, currency: string = 'EUR'): Money {
    const result = new Money(0, currency)
    // @ts-ignore
    result.cents = typeof cents === 'bigint' ? cents : BigInt(cents)
    return result
  }
}

