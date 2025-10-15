import { describe, it, expect } from 'vitest'
import {
  colors,
  gradients,
  spacing,
  borderRadius,
  shadows,
  typography,
  breakpoints,
  transitions,
  designTokens,
} from '../../src/runtime/utils/designTokens'

describe('designTokens', () => {
  describe('colors', () => {
    it('contient les 5 couleurs principales NxPay', () => {
      expect(colors.nxGreen).toBe('#77F07F')
      expect(colors.nxTeal).toBe('#3FC995')
      expect(colors.nxBlueTurquoise).toBe('#40A0AE')
      expect(colors.nxBlue).toBe('#37669C')
      expect(colors.nxPurple).toBe('#3A2F6B')
    })

    it('contient les alias primary, secondary, tertiary', () => {
      expect(colors.primary).toBe('#77F07F')
      expect(colors.secondary).toBe('#3FC995')
      expect(colors.tertiary).toBe('#40A0AE')
    })

    it('contient les couleurs sémantiques', () => {
      expect(colors.success).toBe('#77F07F')
      expect(colors.warning).toBe('#f59e0b')
      expect(colors.error).toBe('#ef4444')
      expect(colors.info).toBe('#40A0AE')
    })

    it('contient les couleurs neutres', () => {
      expect(colors.white).toBe('#ffffff')
      expect(colors.black).toBe('#000000')
      expect(colors.gray).toBeDefined()
      expect(colors.gray[50]).toBe('#f9fafb')
      expect(colors.gray[900]).toBe('#111827')
    })
  })

  describe('gradients', () => {
    it('contient le gradient signature NxPay', () => {
      expect(gradients.primary).toContain('#77F07F')
      expect(gradients.primary).toContain('#3FC995')
      expect(gradients.primary).toContain('#40A0AE')
      expect(gradients.primary).toContain('135deg')
    })

    it('contient les gradients alternatifs', () => {
      expect(gradients.vertical).toBeDefined()
      expect(gradients.horizontal).toBeDefined()
      expect(gradients.button).toBeDefined()
      expect(gradients.card).toBeDefined()
    })
  })

  describe('spacing', () => {
    it("contient toutes les tailles d'espacement", () => {
      expect(spacing.xs).toBe('4px')
      expect(spacing.sm).toBe('8px')
      expect(spacing.md).toBe('16px')
      expect(spacing.lg).toBe('24px')
      expect(spacing.xl).toBe('32px')
      expect(spacing['2xl']).toBe('48px')
      expect(spacing['3xl']).toBe('64px')
      expect(spacing['4xl']).toBe('96px')
    })
  })

  describe('borderRadius', () => {
    it('contient toutes les tailles de border radius', () => {
      expect(borderRadius.none).toBe('0')
      expect(borderRadius.sm).toBe('8px')
      expect(borderRadius.md).toBe('12px')
      expect(borderRadius.lg).toBe('16px')
      expect(borderRadius.xl).toBe('20px')
      expect(borderRadius['2xl']).toBe('24px')
      expect(borderRadius.full).toBe('9999px')
    })
  })

  describe('shadows', () => {
    it('contient les shadows standards', () => {
      expect(shadows.sm).toBeDefined()
      expect(shadows.md).toBeDefined()
      expect(shadows.lg).toBeDefined()
      expect(shadows.xl).toBeDefined()
      expect(shadows['2xl']).toBeDefined()
    })

    it('contient les shadows NxPay avec couleurs', () => {
      expect(shadows.nxGreen).toContain('rgba(119, 240, 127')
      expect(shadows.nxTeal).toContain('rgba(63, 201, 149')
      expect(shadows.nxBlue).toContain('rgba(64, 160, 174')
    })

    it('contient shadow glass pour glassmorphism', () => {
      expect(shadows.glass).toBeDefined()
      expect(shadows.glass).toContain('rgba')
    })
  })

  describe('typography', () => {
    it('contient les font families', () => {
      expect(typography.fontFamily.primary).toContain('Poppins')
      expect(typography.fontFamily.secondary).toContain('Roboto')
      expect(typography.fontFamily.mono).toBe('monospace')
    })

    it('contient les font sizes', () => {
      expect(typography.fontSize.xs).toBe('12px')
      expect(typography.fontSize.base).toBe('16px')
      expect(typography.fontSize['6xl']).toBe('60px')
    })

    it('contient les font weights', () => {
      expect(typography.fontWeight.light).toBe('300')
      expect(typography.fontWeight.regular).toBe('400')
      expect(typography.fontWeight.bold).toBe('700')
    })
  })

  describe('breakpoints', () => {
    it('contient tous les breakpoints responsive', () => {
      expect(breakpoints.sm).toBe('640px')
      expect(breakpoints.md).toBe('768px')
      expect(breakpoints.lg).toBe('1024px')
      expect(breakpoints.xl).toBe('1280px')
      expect(breakpoints['2xl']).toBe('1536px')
    })
  })

  describe('transitions', () => {
    it('contient les durées de transition', () => {
      expect(transitions.duration.fast).toBe('150ms')
      expect(transitions.duration.normal).toBe('300ms')
      expect(transitions.duration.slow).toBe('500ms')
    })

    it('contient les timing functions', () => {
      expect(transitions.timing.linear).toBe('linear')
      expect(transitions.timing.easeIn).toBeDefined()
      expect(transitions.timing.easeOut).toBeDefined()
      expect(transitions.timing.easeInOut).toBeDefined()
    })
  })

  describe('designTokens export', () => {
    it('exporte toutes les catégories', () => {
      expect(designTokens.colors).toBeDefined()
      expect(designTokens.gradients).toBeDefined()
      expect(designTokens.spacing).toBeDefined()
      expect(designTokens.borderRadius).toBeDefined()
      expect(designTokens.shadows).toBeDefined()
      expect(designTokens.typography).toBeDefined()
      expect(designTokens.breakpoints).toBeDefined()
      expect(designTokens.transitions).toBeDefined()
      expect(designTokens.glassmorphism).toBeDefined()
      expect(designTokens.animations).toBeDefined()
    })
  })
})

