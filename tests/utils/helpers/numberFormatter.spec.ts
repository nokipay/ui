import { describe, it, expect } from 'vitest'
import { formatCompactNumber } from '../../../src/runtime/utils/helpers/numberFormatter'
import { COMPACT_THRESHOLD } from '../../../src/runtime/utils/constants/numberFormat'

describe('numberFormatter', () => {
  describe('formatCompactNumber', () => {
    it('retourne le nombre tel quel si < seuil (12345678)', () => {
      expect(formatCompactNumber(1500)).toBe('1500')
      expect(formatCompactNumber(999000)).toBe('999000')
      expect(formatCompactNumber(1000000)).toBe('1000000')
    })

    it('formate les millions avec M si >= seuil', () => {
      expect(formatCompactNumber(15000000)).toBe('15,0M')
      expect(formatCompactNumber(123456789)).toBe('123,5M')
    })

    it('formate les milliards avec B', () => {
      expect(formatCompactNumber(1500000000)).toBe('1,5B')
      expect(formatCompactNumber(12345678900)).toBe('12,3B')
    })

    it('formate les trillions avec T', () => {
      expect(formatCompactNumber(1500000000000)).toBe('1,5T')
    })

    it('gère les nombres négatifs', () => {
      const result = formatCompactNumber(-150000000)
      expect(result).toContain('-')
      expect(result).toContain('M')
    })

    it('retourne le nombre si < COMPACT_THRESHOLD', () => {
      expect(formatCompactNumber(999)).toBe('999')
      expect(formatCompactNumber(0)).toBe('0')
      expect(formatCompactNumber(COMPACT_THRESHOLD - 1)).toBe((COMPACT_THRESHOLD - 1).toString())
    })

    it('arrondit à 1 décimale avec virgule', () => {
      expect(formatCompactNumber(156789000)).toBe('156,8M')
    })

    it('utilise la virgule française pour les décimales', () => {
      const result = formatCompactNumber(15500000)
      expect(result).toContain(',')
      expect(result).not.toContain('.')
    })
  })
})
