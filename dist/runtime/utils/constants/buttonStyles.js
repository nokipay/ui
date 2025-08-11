export const BUTTON_BASE_CLASSES = "px-4 py-2 rounded-full transition-all duration-300 justify-center font-medium hover:scale-105 hover:translate-y-[-2px]";
export const BUTTON_COLOR_STYLES = {
  white: {
    normal: "bg-white hover:bg-gray-100 text-gray-600 border",
    loading: "bg-white hover:bg-white text-gray-600 border border-black-200"
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
    normal: "bg-primary hover:bg-primary-600 text-gray-900",
    loading: "bg-primary hover:bg-primary text-gray-900"
  }
};
export const BUTTON_SHADOW_STYLES = {
  dark: {
    white: "[box-shadow:0_2px_0_0_#4b5563]",
    yellow: "[box-shadow:0_2px_0_0_#4b5563]",
    black: "[box-shadow:0_2px_0_0_#4b5563]",
    primary: "[box-shadow:0_2px_0_0_#4b5563]"
  },
  soft: {
    white: "shadow-md",
    yellow: "shadow-md",
    black: "shadow-md",
    primary: "shadow-md"
  }
};
