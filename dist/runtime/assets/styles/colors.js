export const COLORS = {
  // Couleurs principales
  primary: {
    DEFAULT: "#ffdd0f",
    50: "#fefdf0",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#ffdd0f",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12"
  },
  // Couleurs de statut
  success: {
    DEFAULT: "#10b981",
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b"
  },
  warning: {
    DEFAULT: "#f59e0b",
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f"
  },
  error: {
    DEFAULT: "#ef4444",
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d"
  },
  info: {
    DEFAULT: "#3b82f6",
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a"
  },
  // Couleurs neutres
  gray: {
    DEFAULT: "#6b7280",
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827"
  },
  // Couleurs spéciales
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent"
};
export function getColor(name, shade) {
  const color = COLORS[name];
  if (typeof color === "string") {
    return color;
  }
  return shade ? color[shade] : color.DEFAULT;
}
export const CSS_VARIABLES = {
  "--color-primary": COLORS.primary.DEFAULT,
  "--color-primary-50": COLORS.primary[50],
  "--color-primary-100": COLORS.primary[100],
  "--color-primary-200": COLORS.primary[200],
  "--color-primary-300": COLORS.primary[300],
  "--color-primary-400": COLORS.primary[400],
  "--color-primary-500": COLORS.primary[500],
  "--color-primary-600": COLORS.primary[600],
  "--color-primary-700": COLORS.primary[700],
  "--color-primary-800": COLORS.primary[800],
  "--color-primary-900": COLORS.primary[900],
  "--color-success": COLORS.success.DEFAULT,
  "--color-warning": COLORS.warning.DEFAULT,
  "--color-error": COLORS.error.DEFAULT,
  "--color-info": COLORS.info.DEFAULT,
  "--color-gray-50": COLORS.gray[50],
  "--color-gray-100": COLORS.gray[100],
  "--color-gray-200": COLORS.gray[200],
  "--color-gray-300": COLORS.gray[300],
  "--color-gray-400": COLORS.gray[400],
  "--color-gray-500": COLORS.gray[500],
  "--color-gray-600": COLORS.gray[600],
  "--color-gray-700": COLORS.gray[700],
  "--color-gray-800": COLORS.gray[800],
  "--color-gray-900": COLORS.gray[900]
};
