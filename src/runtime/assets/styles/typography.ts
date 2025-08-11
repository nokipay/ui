// Système de typographie pour la librairie NokiPay UI
export const TYPOGRAPHY = {
  // Familles de polices
  fonts: {
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'Noto Sans',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
    ],
    mono: [
      'ui-monospace',
      'SFMono-Regular',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ],
  },

  // Tailles de police
  sizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
    '9xl': '8rem',     // 128px
  },

  // Hauteurs de ligne
  lineHeights: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Poids des polices
  weights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Espacements entre les lettres
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// Styles prédéfinis pour les composants
export const TEXT_STYLES = {
  // Titres
  heading: {
    h1: `font-bold text-4xl md:text-5xl lg:text-6xl line-height-tight`,
    h2: `font-bold text-3xl md:text-4xl lg:text-5xl line-height-tight`,
    h3: `font-bold text-2xl md:text-3xl lg:text-4xl line-height-snug`,
    h4: `font-semibold text-xl md:text-2xl lg:text-3xl line-height-snug`,
    h5: `font-semibold text-lg md:text-xl lg:text-2xl line-height-normal`,
    h6: `font-semibold text-base md:text-lg lg:text-xl line-height-normal`,
  },

  // Corps de texte
  body: {
    large: `font-normal text-lg line-height-relaxed`,
    base: `font-normal text-base line-height-normal`,
    small: `font-normal text-sm line-height-normal`,
    xs: `font-normal text-xs line-height-tight`,
  },

  // Textes d'interface
  ui: {
    label: `font-medium text-sm text-gray-700`,
    caption: `font-normal text-xs text-gray-500`,
    helper: `font-normal text-sm text-gray-600`,
    error: `font-medium text-sm text-red-600`,
    success: `font-medium text-sm text-green-600`,
    warning: `font-medium text-sm text-yellow-600`,
  },

  // Boutons
  button: {
    large: `font-semibold text-lg`,
    medium: `font-medium text-base`,
    small: `font-medium text-sm`,
    xs: `font-medium text-xs`,
  },
} as const;

// Types pour une meilleure autocomplétion
export type FontFamily = keyof typeof TYPOGRAPHY.fonts;
export type FontSize = keyof typeof TYPOGRAPHY.sizes;
export type FontWeight = keyof typeof TYPOGRAPHY.weights;
export type LineHeight = keyof typeof TYPOGRAPHY.lineHeights;
export type LetterSpacing = keyof typeof TYPOGRAPHY.letterSpacing;

// Fonction helper pour obtenir une police
export function getFontFamily(family: FontFamily): string[] {
  return TYPOGRAPHY.fonts[family];
}

// CSS variables pour les polices
export const FONT_CSS_VARIABLES = {
  '--font-sans': TYPOGRAPHY.fonts.sans.join(', '),
  '--font-mono': TYPOGRAPHY.fonts.mono.join(', '),
  
  '--text-xs': TYPOGRAPHY.sizes.xs,
  '--text-sm': TYPOGRAPHY.sizes.sm,
  '--text-base': TYPOGRAPHY.sizes.base,
  '--text-lg': TYPOGRAPHY.sizes.lg,
  '--text-xl': TYPOGRAPHY.sizes.xl,
  '--text-2xl': TYPOGRAPHY.sizes['2xl'],
  '--text-3xl': TYPOGRAPHY.sizes['3xl'],
  '--text-4xl': TYPOGRAPHY.sizes['4xl'],
  '--text-5xl': TYPOGRAPHY.sizes['5xl'],
  '--text-6xl': TYPOGRAPHY.sizes['6xl'],
} as const;