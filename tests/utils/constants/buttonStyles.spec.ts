import { describe, it, expect } from 'vitest'
import {
  BUTTON_BASE_CLASSES,
  BUTTON_COLOR_STYLES,
  BUTTON_SHADOW_STYLES,
} from '../../../src/runtime/utils/constants/buttonStyles'

describe('buttonStyles', () => {
  describe('BUTTON_BASE_CLASSES', () => {
    it('contient les classes de base', () => {
      expect(BUTTON_BASE_CLASSES).toContain('rounded-full')
      expect(BUTTON_BASE_CLASSES).toContain('transition-all')
      expect(BUTTON_BASE_CLASSES).toContain('duration-300')
      expect(BUTTON_BASE_CLASSES).toContain('hover:scale-105')
    })
  })

  describe('BUTTON_COLOR_STYLES', () => {
    it('contient les styles pour toutes les couleurs', () => {
      expect(BUTTON_COLOR_STYLES.primary).toBeDefined()
      expect(BUTTON_COLOR_STYLES.secondary).toBeDefined()
      expect(BUTTON_COLOR_STYLES.green).toBeDefined()
      expect(BUTTON_COLOR_STYLES.white).toBeDefined()
      expect(BUTTON_COLOR_STYLES.black).toBeDefined()
      expect(BUTTON_COLOR_STYLES.yellow).toBeDefined()
    })

    it('chaque couleur a un état normal et loading', () => {
      expect(BUTTON_COLOR_STYLES.primary.normal).toBeDefined()
      expect(BUTTON_COLOR_STYLES.primary.loading).toBeDefined()
    })

    it('utilise les couleurs NxPay', () => {
      expect(BUTTON_COLOR_STYLES.primary.normal).toContain('nxGreen')
      expect(BUTTON_COLOR_STYLES.secondary.normal).toContain('nxTeal')
    })
  })

  describe('BUTTON_SHADOW_STYLES', () => {
    it('contient les styles dark et soft', () => {
      expect(BUTTON_SHADOW_STYLES.dark).toBeDefined()
      expect(BUTTON_SHADOW_STYLES.soft).toBeDefined()
    })

    it('dark shadows utilisent box-shadow ou rgba', () => {
      expect(BUTTON_SHADOW_STYLES.dark.primary).toContain('rgba(119,240,127')
      expect(BUTTON_SHADOW_STYLES.dark.secondary).toContain('rgba(63,201,149')
    })

    it('soft shadows utilisent shadow-md', () => {
      expect(BUTTON_SHADOW_STYLES.soft.primary).toBe('shadow-md')
      expect(BUTTON_SHADOW_STYLES.soft.secondary).toBe('shadow-md')
    })
  })
})

