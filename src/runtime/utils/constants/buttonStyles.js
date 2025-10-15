export const BUTTON_BASE_CLASSES = "px-4 py-2 rounded-full transition-all duration-300 justify-center font-medium hover:scale-105 hover:translate-y-[-2px]";
export const BUTTON_COLOR_STYLES = {
  white: {
    normal: "bg-white hover:bg-gray-100 text-gray-600 border",
    loading: "bg-white hover:bg-white text-gray-600 border border-black-200"
  },
  green: {
    normal: "bg-nxGreen-500 hover:bg-nxGreen-600 text-white",
    loading: "bg-nxGreen-500 hover:bg-nxGreen-500 text-white"
  },
  yellow: {
    normal: "bg-yellow-400 hover:bg-yellow-500 text-gray-900",
    loading: "bg-yellow-400 hover:bg-yellow-400 text-gray-600"
  },
  black: {
    normal: "bg-gray-900 hover:bg-gray-800 text-white",
    loading: "bg-gray-900 hover:bg-gray-900 text-white border border-gray-700"
  },
  primary: {
    normal: "bg-nxGreen-500 hover:bg-nxGreen-600 text-white",
    loading: "bg-nxGreen-500 hover:bg-nxGreen-500 text-white"
  },
  secondary: {
    normal: "bg-nxTeal-500 hover:bg-nxTeal-600 text-white",
    loading: "bg-nxTeal-500 hover:bg-nxTeal-500 text-white"
  }
};
export const BUTTON_SHADOW_STYLES = {
  dark: {
    white: "[box-shadow:0_2px_0_0_#4b5563]",
    green: "[box-shadow:0_4px_14px_0_rgba(119,240,127,0.39)]",
    yellow: "[box-shadow:0_2px_0_0_#4b5563]",
    black: "[box-shadow:0_2px_0_0_#4b5563]",
    primary: "[box-shadow:0_4px_14px_0_rgba(119,240,127,0.39)]",
    secondary: "[box-shadow:0_4px_14px_0_rgba(63,201,149,0.39)]"
  },
  soft: {
    white: "shadow-md",
    green: "shadow-md",
    yellow: "shadow-md",
    black: "shadow-md",
    primary: "shadow-md",
    secondary: "shadow-md"
  }
};
