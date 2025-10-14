import { describe, it, expect } from 'vitest'
import { useCurrencyFormat } from '../../src/runtime/composables/useCurrencyFormat'

describe('useCurrencyFormat', () => {
  const { formatFCFA, formatNumber, formatPercentage, parseAmount, getExactAmount } =
    useCurrencyFormat()

  describe('formatFCFA', () => {
    it('formate un montant simple en FCFA', () => {
      const result = formatFCFA(1000)
      expect(result).toContain('1')
      expect(result).toContain('000')
      expect(result).toContain('FCFA')
    })

    it('retourne "-" pour null ou undefined', () => {
      expect(formatFCFA(null)).toBe('-')
      expect(formatFCFA(undefined)).toBe('-')
      expect(formatFCFA('')).toBe('-')
    })

    it('formate en mode compact pour les grands nombres', () => {
      const result = formatFCFA(12345678, { compact: true })
      expect(result).toContain('M')
      expect(result).toContain('FCFA')
    })

    it('formate avec suffixes K, M, B, T pour grands nombres', () => {
      expect(formatFCFA(15000000, { compact: true })).toContain('M')
      expect(formatFCFA(1500000000, { compact: true })).toContain('B')
      expect(formatFCFA(1500000000000, { compact: true })).toContain('T')
    })

    it('gère les nombres négatifs', () => {
      const result = formatFCFA(-1000)
      expect(result).toContain('-')
    })

    it('peut masquer le symbole FCFA', () => {
      const result = formatFCFA(1000, { showSymbol: false })
      expect(result).not.toContain('FCFA')
    })
  })

  describe('formatNumber', () => {
    it('formate un nombre simple', () => {
      const result = formatNumber(1234567)
      expect(result).toContain('1')
      expect(result).toContain('234')
      expect(result).toContain('567')
    })

    it('retourne "-" pour null', () => {
      expect(formatNumber(null)).toBe('-')
    })

    it('formate en mode compact', () => {
      const result = formatNumber(12345678, { compact: true })
      expect(result).toContain('M')
    })
  })

  describe('formatPercentage', () => {
    it('formate un pourcentage simple', () => {
      const result = formatPercentage(15.5)
      expect(result).toBe('15,5%')
    })

    it('gère les décimales personnalisées', () => {
      const result = formatPercentage(15.555, 2)
      expect(result).toContain('15,5')
      expect(result).toContain('%')
    })

    it('retourne "-" pour null', () => {
      expect(formatPercentage(null)).toBe('-')
    })
  })

  describe('parseAmount', () => {
    it('parse un montant formaté', () => {
      const result = parseAmount('1 234,56')
      expect(result).toBe(1234.56)
    })

    it('retourne 0 pour une chaîne vide', () => {
      expect(parseAmount('')).toBe(0)
      expect(parseAmount('-')).toBe(0)
    })

    it('supprime les symboles monétaires', () => {
      const result = parseAmount('1 234,56 FCFA')
      expect(result).toBe(1234.56)
    })
  })

  describe('getExactAmount', () => {
    it('retourne le montant exact formaté', () => {
      const result = getExactAmount(12345678)
      expect(result).toContain('12')
      expect(result).toContain('345')
      expect(result).toContain('678')
      expect(result).toContain('FCFA')
    })

    it('retourne "-" pour null', () => {
      expect(getExactAmount(null)).toBe('-')
    })
  })
})
