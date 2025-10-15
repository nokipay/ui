import { describe, it, expect } from 'vitest'
import { COLORS, getColor } from '../../src/runtime/assets/styles/colors'

describe('colors', () => {
  describe('COLORS constant', () => {
    it('contient les couleurs principales NxPay', () => {
      expect(COLORS.primary.DEFAULT).toBe('#77F07F')
      expect(COLORS.secondary.DEFAULT).toBe('#3FC995')
      expect(COLORS.tertiary.DEFAULT).toBe('#40A0AE')
      expect(COLORS.quaternary.DEFAULT).toBe('#37669C')
      expect(COLORS.accent.DEFAULT).toBe('#3A2F6B')
    })

    it('contient les échelles de teintes complètes', () => {
      expect(COLORS.primary[50]).toBeDefined()
      expect(COLORS.primary[100]).toBeDefined()
      expect(COLORS.primary[500]).toBe('#77F07F')
      expect(COLORS.primary[900]).toBeDefined()
    })

    it('contient les couleurs sémantiques alignées', () => {
      expect(COLORS.success.DEFAULT).toBe('#77F07F')
      expect(COLORS.info.DEFAULT).toBe('#40A0AE')
      expect(COLORS.warning.DEFAULT).toBe('#f59e0b')
      expect(COLORS.error.DEFAULT).toBe('#ef4444')
    })

    it('contient les couleurs neutres', () => {
      expect(COLORS.gray.DEFAULT).toBe('#6b7280')
      expect(COLORS.white).toBe('#ffffff')
      expect(COLORS.black).toBe('#000000')
      expect(COLORS.transparent).toBe('transparent')
    })
  })

  describe('getColor helper', () => {
    it('retourne la couleur DEFAULT sans shade', () => {
      expect(getColor('primary')).toBe('#77F07F')
      expect(getColor('secondary')).toBe('#3FC995')
    })

    it('retourne une shade spécifique', () => {
      expect(getColor('primary', '500')).toBe('#77F07F')
      expect(getColor('primary', '50')).toBeDefined()
    })

    it('retourne les couleurs simples', () => {
      expect(getColor('white')).toBe('#ffffff')
      expect(getColor('black')).toBe('#000000')
    })
  })
})

