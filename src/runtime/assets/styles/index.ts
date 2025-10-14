// Export centralisé des styles de la librairie
import { CSS_VARIABLES } from './colors'
import { FONT_CSS_VARIABLES } from './typography'

export * from './colors'
export * from './typography'

// Toutes les variables CSS combinées
export const ALL_CSS_VARIABLES = {
  ...CSS_VARIABLES,
  ...FONT_CSS_VARIABLES,
} as const

// Fonction pour injecter les variables CSS dans le DOM
export function injectCSSVariables(): void {
  const root = document.documentElement

  Object.entries(ALL_CSS_VARIABLES).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
}
