/**
 * Design Tokens NxPay
 * Système de design complet pour les applications NxPay
 */

import { COLORS } from '../assets/styles/colors'

// ============================================
// COULEURS
// ============================================

export const colors = {
  // Palette principale NxPay (gradient vert → violet)
  nxGreen: '#77F07F', // Priorité 1 - Couleur principale
  nxTeal: '#3FC995', // Priorité 2 - Secondaire
  nxBlueTurquoise: '#40A0AE', // Priorité 3 - Tertiaire
  nxBlue: '#37669C', // Priorité 4 - Quaternaire
  nxPurple: '#3A2F6B', // Priorité 5 - Accent

  // Alias pour faciliter l'utilisation
  primary: '#77F07F',
  secondary: '#3FC995',
  tertiary: '#40A0AE',
  quaternary: '#37669C',
  accent: '#3A2F6B',

  // Couleurs sémantiques
  success: '#77F07F',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#40A0AE',

  // Couleurs neutres
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const

// ============================================
// GRADIENTS
// ============================================

export const gradients = {
  // Gradient signature NxPay
  primary: 'linear-gradient(135deg, #77F07F 0%, #3FC995 50%, #40A0AE 100%)',

  // Gradients alternatifs
  vertical: 'linear-gradient(180deg, #77F07F 0%, #3FC995 100%)',
  horizontal: 'linear-gradient(90deg, #77F07F 0%, #3FC995 50%, #40A0AE 100%)',

  // Gradients avec transparence
  primaryFade: 'linear-gradient(135deg, rgba(119, 240, 127, 0.8) 0%, rgba(63, 201, 149, 0.8) 100%)',
  overlay: 'linear-gradient(180deg, rgba(119, 240, 127, 0.1) 0%, rgba(64, 160, 174, 0.1) 100%)',

  // Gradients pour boutons
  button: 'linear-gradient(135deg, #77F07F 0%, #3FC995 100%)',
  buttonHover: 'linear-gradient(135deg, #3FC995 0%, #77F07F 100%)',

  // Gradients pour cards
  card: 'linear-gradient(135deg, rgba(119, 240, 127, 0.05) 0%, rgba(63, 201, 149, 0.05) 100%)',
  cardHover: 'linear-gradient(135deg, rgba(119, 240, 127, 0.1) 0%, rgba(63, 201, 149, 0.1) 100%)',
} as const

// ============================================
// SPACING
// ============================================

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
} as const

// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
  none: '0',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
} as const

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

  // Shadows avec couleurs NxPay
  nxGreen: '0 4px 14px 0 rgba(119, 240, 127, 0.39)',
  nxTeal: '0 4px 14px 0 rgba(63, 201, 149, 0.39)',
  nxBlue: '0 4px 14px 0 rgba(64, 160, 174, 0.39)',

  // Shadows pour glassmorphism
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',

  none: 'none',
} as const

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  fontFamily: {
    primary: 'Poppins, sans-serif',
    secondary: 'Roboto, sans-serif',
    mono: 'monospace',
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
  },

  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
    loose: '2',
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
  },
} as const

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// ============================================
// TRANSITIONS
// ============================================

export const transitions = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },

  timing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Transitions prédéfinies
  all: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'background-color 300ms, border-color 300ms, color 300ms',
  transform: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const

// ============================================
// Z-INDEX
// ============================================

export const zIndex = {
  hide: '-1',
  base: '0',
  dropdown: '1000',
  sticky: '1100',
  fixed: '1200',
  modal: '1300',
  popover: '1400',
  tooltip: '1500',
  notification: '1600',
} as const

// ============================================
// COMPONENT SIZES
// ============================================

export const componentSizes = {
  button: {
    sm: { height: '32px', padding: '8px 16px', fontSize: '14px' },
    md: { height: '40px', padding: '10px 20px', fontSize: '16px' },
    lg: { height: '48px', padding: '12px 24px', fontSize: '18px' },
    xl: { height: '56px', padding: '14px 28px', fontSize: '20px' },
  },

  input: {
    sm: { height: '32px', padding: '8px 12px', fontSize: '14px' },
    md: { height: '40px', padding: '10px 16px', fontSize: '16px' },
    lg: { height: '48px', padding: '12px 20px', fontSize: '18px' },
  },

  badge: {
    sm: { height: '20px', padding: '2px 8px', fontSize: '12px' },
    md: { height: '24px', padding: '4px 10px', fontSize: '14px' },
    lg: { height: '28px', padding: '6px 12px', fontSize: '16px' },
  },
} as const

// ============================================
// ICON SIZES
// ============================================

export const iconSizes = {
  xs: '12px',
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const

// ============================================
// GLASSMORPHISM
// ============================================

export const glassmorphism = {
  light: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },

  medium: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },

  dark: {
    background: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },

  // Glassmorphism avec couleurs NxPay
  nxGreen: {
    background: 'rgba(119, 240, 127, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(119, 240, 127, 0.2)',
  },
} as const

// ============================================
// ANIMATIONS
// ============================================

export const animations = {
  // Hover effects
  hover: {
    translateY: '-2px',
    scale: '1.05',
    shadow: shadows.lg,
  },

  // Loading animations
  spin: 'spin 1s linear infinite',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  bounce: 'bounce 1s infinite',

  // Fade animations
  fadeIn: 'fadeIn 0.3s ease-in',
  fadeOut: 'fadeOut 0.3s ease-out',

  // Slide animations
  slideInLeft: 'slideInLeft 0.3s ease-out',
  slideInRight: 'slideInRight 0.3s ease-out',
  slideInUp: 'slideInUp 0.3s ease-out',
  slideInDown: 'slideInDown 0.3s ease-out',
} as const

// ============================================
// EXPORT DEFAULT
// ============================================

export const designTokens = {
  colors,
  gradients,
  spacing,
  borderRadius,
  shadows,
  typography,
  breakpoints,
  transitions,
  zIndex,
  componentSizes,
  iconSizes,
  glassmorphism,
  animations,
} as const

export default designTokens

// ============================================
// TYPE EXPORTS
// ============================================

export type DesignTokens = typeof designTokens
export type Colors = typeof colors
export type Gradients = typeof gradients
export type Spacing = typeof spacing
export type BorderRadius = typeof borderRadius
export type Shadows = typeof shadows
export type Typography = typeof typography
export type Breakpoints = typeof breakpoints
export type Transitions = typeof transitions
export type ZIndex = typeof zIndex
export type ComponentSizes = typeof componentSizes
export type IconSizes = typeof iconSizes
export type Glassmorphism = typeof glassmorphism
export type Animations = typeof animations

