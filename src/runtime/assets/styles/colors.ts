// Couleurs de base de la librairie NxPay UI
export const COLORS = {
  // Couleurs principales NxPay (du vert au violet)
  primary: {
    DEFAULT: '#77F07F', // Vert Clair - Priorité 1
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#77F07F',
    500: '#77F07F',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  secondary: {
    DEFAULT: '#3FC995', // Teal - Priorité 2
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#3FC995',
    500: '#3FC995',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },

  tertiary: {
    DEFAULT: '#40A0AE', // Bleu Turquoise - Priorité 3
    50: '#f0fdff',
    100: '#cff6fc',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#40A0AE',
    500: '#40A0AE',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },

  quaternary: {
    DEFAULT: '#37669C', // Bleu Moyen - Priorité 4
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#37669C',
    500: '#37669C',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },

  accent: {
    DEFAULT: '#3A2F6B', // Violet Foncé - Priorité 5
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#a78bfa',
    500: '#3A2F6B',
    600: '#3A2F6B',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },

  // Couleurs de statut (alignées avec la palette NxPay)
  success: {
    DEFAULT: '#77F07F', // Utilise le vert principal
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#77F07F',
    500: '#77F07F',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  warning: {
    DEFAULT: '#f59e0b',
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  error: {
    DEFAULT: '#ef4444',
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  info: {
    DEFAULT: '#40A0AE', // Utilise le bleu turquoise
    50: '#f0fdff',
    100: '#cff6fc',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#40A0AE',
    500: '#40A0AE',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },

  // Couleurs neutres
  gray: {
    DEFAULT: '#6b7280',
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

  // Couleurs spéciales
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const

// Types pour une meilleure autocomplétion
export type ColorName = keyof typeof COLORS
export type ColorShade = keyof typeof COLORS.primary

// Fonction helper pour obtenir une couleur
export function getColor(name: ColorName, shade?: ColorShade): string {
  const color = COLORS[name]

  if (typeof color === 'string') {
    return color
  }

  return shade ? color[shade] : color.DEFAULT
}

// Couleurs CSS custom properties pour Tailwind
export const CSS_VARIABLES = {
  '--color-primary': COLORS.primary.DEFAULT,
  '--color-primary-50': COLORS.primary[50],
  '--color-primary-100': COLORS.primary[100],
  '--color-primary-200': COLORS.primary[200],
  '--color-primary-300': COLORS.primary[300],
  '--color-primary-400': COLORS.primary[400],
  '--color-primary-500': COLORS.primary[500],
  '--color-primary-600': COLORS.primary[600],
  '--color-primary-700': COLORS.primary[700],
  '--color-primary-800': COLORS.primary[800],
  '--color-primary-900': COLORS.primary[900],

  '--color-success': COLORS.success.DEFAULT,
  '--color-warning': COLORS.warning.DEFAULT,
  '--color-error': COLORS.error.DEFAULT,
  '--color-info': COLORS.info.DEFAULT,

  '--color-gray-50': COLORS.gray[50],
  '--color-gray-100': COLORS.gray[100],
  '--color-gray-200': COLORS.gray[200],
  '--color-gray-300': COLORS.gray[300],
  '--color-gray-400': COLORS.gray[400],
  '--color-gray-500': COLORS.gray[500],
  '--color-gray-600': COLORS.gray[600],
  '--color-gray-700': COLORS.gray[700],
  '--color-gray-800': COLORS.gray[800],
  '--color-gray-900': COLORS.gray[900],
} as const
