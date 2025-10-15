/**
 * Design Tokens NxPay
 * Système de design complet pour les applications NxPay
 */
export declare const colors: {
  readonly nxGreen: '#77F07F'
  readonly nxTeal: '#3FC995'
  readonly nxBlueTurquoise: '#40A0AE'
  readonly nxBlue: '#37669C'
  readonly nxPurple: '#3A2F6B'
  readonly primary: '#77F07F'
  readonly secondary: '#3FC995'
  readonly tertiary: '#40A0AE'
  readonly quaternary: '#37669C'
  readonly accent: '#3A2F6B'
  readonly success: '#77F07F'
  readonly warning: '#f59e0b'
  readonly error: '#ef4444'
  readonly info: '#40A0AE'
  readonly white: '#ffffff'
  readonly black: '#000000'
  readonly gray: {
    readonly 50: '#f9fafb'
    readonly 100: '#f3f4f6'
    readonly 200: '#e5e7eb'
    readonly 300: '#d1d5db'
    readonly 400: '#9ca3af'
    readonly 500: '#6b7280'
    readonly 600: '#4b5563'
    readonly 700: '#374151'
    readonly 800: '#1f2937'
    readonly 900: '#111827'
  }
}
export declare const gradients: {
  readonly primary: 'linear-gradient(135deg, #77F07F 0%, #3FC995 50%, #40A0AE 100%)'
  readonly vertical: 'linear-gradient(180deg, #77F07F 0%, #3FC995 100%)'
  readonly horizontal: 'linear-gradient(90deg, #77F07F 0%, #3FC995 50%, #40A0AE 100%)'
  readonly primaryFade: 'linear-gradient(135deg, rgba(119, 240, 127, 0.8) 0%, rgba(63, 201, 149, 0.8) 100%)'
  readonly overlay: 'linear-gradient(180deg, rgba(119, 240, 127, 0.1) 0%, rgba(64, 160, 174, 0.1) 100%)'
  readonly button: 'linear-gradient(135deg, #77F07F 0%, #3FC995 100%)'
  readonly buttonHover: 'linear-gradient(135deg, #3FC995 0%, #77F07F 100%)'
  readonly card: 'linear-gradient(135deg, rgba(119, 240, 127, 0.05) 0%, rgba(63, 201, 149, 0.05) 100%)'
  readonly cardHover: 'linear-gradient(135deg, rgba(119, 240, 127, 0.1) 0%, rgba(63, 201, 149, 0.1) 100%)'
}
export declare const spacing: {
  readonly xs: '4px'
  readonly sm: '8px'
  readonly md: '16px'
  readonly lg: '24px'
  readonly xl: '32px'
  readonly '2xl': '48px'
  readonly '3xl': '64px'
  readonly '4xl': '96px'
}
export declare const borderRadius: {
  readonly none: '0'
  readonly sm: '8px'
  readonly md: '12px'
  readonly lg: '16px'
  readonly xl: '20px'
  readonly '2xl': '24px'
  readonly '3xl': '32px'
  readonly full: '9999px'
}
export declare const shadows: {
  readonly sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
  readonly md: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
  readonly lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  readonly xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  readonly '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
  readonly nxGreen: '0 4px 14px 0 rgba(119, 240, 127, 0.39)'
  readonly nxTeal: '0 4px 14px 0 rgba(63, 201, 149, 0.39)'
  readonly nxBlue: '0 4px 14px 0 rgba(64, 160, 174, 0.39)'
  readonly glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  readonly none: 'none'
}
export declare const typography: {
  readonly fontFamily: {
    readonly primary: 'Poppins, sans-serif'
    readonly secondary: 'Roboto, sans-serif'
    readonly mono: 'monospace'
  }
  readonly fontSize: {
    readonly xs: '12px'
    readonly sm: '14px'
    readonly base: '16px'
    readonly lg: '18px'
    readonly xl: '20px'
    readonly '2xl': '24px'
    readonly '3xl': '30px'
    readonly '4xl': '36px'
    readonly '5xl': '48px'
    readonly '6xl': '60px'
  }
  readonly fontWeight: {
    readonly light: '300'
    readonly regular: '400'
    readonly medium: '500'
    readonly semibold: '600'
    readonly bold: '700'
  }
  readonly lineHeight: {
    readonly tight: '1.25'
    readonly normal: '1.5'
    readonly relaxed: '1.75'
    readonly loose: '2'
  }
  readonly letterSpacing: {
    readonly tight: '-0.02em'
    readonly normal: '0'
    readonly wide: '0.02em'
  }
}
export declare const breakpoints: {
  readonly sm: '640px'
  readonly md: '768px'
  readonly lg: '1024px'
  readonly xl: '1280px'
  readonly '2xl': '1536px'
}
export declare const transitions: {
  readonly duration: {
    readonly fast: '150ms'
    readonly normal: '300ms'
    readonly slow: '500ms'
  }
  readonly timing: {
    readonly linear: 'linear'
    readonly easeIn: 'cubic-bezier(0.4, 0, 1, 1)'
    readonly easeOut: 'cubic-bezier(0, 0, 0.2, 1)'
    readonly easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
  readonly all: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
  readonly colors: 'background-color 300ms, border-color 300ms, color 300ms'
  readonly transform: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
  readonly opacity: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)'
}
export declare const zIndex: {
  readonly hide: '-1'
  readonly base: '0'
  readonly dropdown: '1000'
  readonly sticky: '1100'
  readonly fixed: '1200'
  readonly modal: '1300'
  readonly popover: '1400'
  readonly tooltip: '1500'
  readonly notification: '1600'
}
export declare const componentSizes: {
  readonly button: {
    readonly sm: {
      readonly height: '32px'
      readonly padding: '8px 16px'
      readonly fontSize: '14px'
    }
    readonly md: {
      readonly height: '40px'
      readonly padding: '10px 20px'
      readonly fontSize: '16px'
    }
    readonly lg: {
      readonly height: '48px'
      readonly padding: '12px 24px'
      readonly fontSize: '18px'
    }
    readonly xl: {
      readonly height: '56px'
      readonly padding: '14px 28px'
      readonly fontSize: '20px'
    }
  }
  readonly input: {
    readonly sm: {
      readonly height: '32px'
      readonly padding: '8px 12px'
      readonly fontSize: '14px'
    }
    readonly md: {
      readonly height: '40px'
      readonly padding: '10px 16px'
      readonly fontSize: '16px'
    }
    readonly lg: {
      readonly height: '48px'
      readonly padding: '12px 20px'
      readonly fontSize: '18px'
    }
  }
  readonly badge: {
    readonly sm: {
      readonly height: '20px'
      readonly padding: '2px 8px'
      readonly fontSize: '12px'
    }
    readonly md: {
      readonly height: '24px'
      readonly padding: '4px 10px'
      readonly fontSize: '14px'
    }
    readonly lg: {
      readonly height: '28px'
      readonly padding: '6px 12px'
      readonly fontSize: '16px'
    }
  }
}
export declare const iconSizes: {
  readonly xs: '12px'
  readonly sm: '16px'
  readonly md: '20px'
  readonly lg: '24px'
  readonly xl: '32px'
  readonly '2xl': '48px'
}
export declare const glassmorphism: {
  readonly light: {
    readonly background: 'rgba(255, 255, 255, 0.1)'
    readonly backdropFilter: 'blur(10px)'
    readonly border: '1px solid rgba(255, 255, 255, 0.2)'
  }
  readonly medium: {
    readonly background: 'rgba(255, 255, 255, 0.2)'
    readonly backdropFilter: 'blur(20px)'
    readonly border: '1px solid rgba(255, 255, 255, 0.3)'
  }
  readonly dark: {
    readonly background: 'rgba(0, 0, 0, 0.2)'
    readonly backdropFilter: 'blur(10px)'
    readonly border: '1px solid rgba(255, 255, 255, 0.1)'
  }
  readonly nxGreen: {
    readonly background: 'rgba(119, 240, 127, 0.1)'
    readonly backdropFilter: 'blur(10px)'
    readonly border: '1px solid rgba(119, 240, 127, 0.2)'
  }
}
export declare const animations: {
  readonly hover: {
    readonly translateY: '-2px'
    readonly scale: '1.05'
    readonly shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
  }
  readonly spin: 'spin 1s linear infinite'
  readonly pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  readonly bounce: 'bounce 1s infinite'
  readonly fadeIn: 'fadeIn 0.3s ease-in'
  readonly fadeOut: 'fadeOut 0.3s ease-out'
  readonly slideInLeft: 'slideInLeft 0.3s ease-out'
  readonly slideInRight: 'slideInRight 0.3s ease-out'
  readonly slideInUp: 'slideInUp 0.3s ease-out'
  readonly slideInDown: 'slideInDown 0.3s ease-out'
}
export declare const designTokens: {
  readonly colors: {
    readonly nxGreen: '#77F07F'
    readonly nxTeal: '#3FC995'
    readonly nxBlueTurquoise: '#40A0AE'
    readonly nxBlue: '#37669C'
    readonly nxPurple: '#3A2F6B'
    readonly primary: '#77F07F'
    readonly secondary: '#3FC995'
    readonly tertiary: '#40A0AE'
    readonly quaternary: '#37669C'
    readonly accent: '#3A2F6B'
    readonly success: '#77F07F'
    readonly warning: '#f59e0b'
    readonly error: '#ef4444'
    readonly info: '#40A0AE'
    readonly white: '#ffffff'
    readonly black: '#000000'
    readonly gray: {
      readonly 50: '#f9fafb'
      readonly 100: '#f3f4f6'
      readonly 200: '#e5e7eb'
      readonly 300: '#d1d5db'
      readonly 400: '#9ca3af'
      readonly 500: '#6b7280'
      readonly 600: '#4b5563'
      readonly 700: '#374151'
      readonly 800: '#1f2937'
      readonly 900: '#111827'
    }
  }
  readonly gradients: {
    readonly primary: 'linear-gradient(135deg, #77F07F 0%, #3FC995 50%, #40A0AE 100%)'
    readonly vertical: 'linear-gradient(180deg, #77F07F 0%, #3FC995 100%)'
    readonly horizontal: 'linear-gradient(90deg, #77F07F 0%, #3FC995 50%, #40A0AE 100%)'
    readonly primaryFade: 'linear-gradient(135deg, rgba(119, 240, 127, 0.8) 0%, rgba(63, 201, 149, 0.8) 100%)'
    readonly overlay: 'linear-gradient(180deg, rgba(119, 240, 127, 0.1) 0%, rgba(64, 160, 174, 0.1) 100%)'
    readonly button: 'linear-gradient(135deg, #77F07F 0%, #3FC995 100%)'
    readonly buttonHover: 'linear-gradient(135deg, #3FC995 0%, #77F07F 100%)'
    readonly card: 'linear-gradient(135deg, rgba(119, 240, 127, 0.05) 0%, rgba(63, 201, 149, 0.05) 100%)'
    readonly cardHover: 'linear-gradient(135deg, rgba(119, 240, 127, 0.1) 0%, rgba(63, 201, 149, 0.1) 100%)'
  }
  readonly spacing: {
    readonly xs: '4px'
    readonly sm: '8px'
    readonly md: '16px'
    readonly lg: '24px'
    readonly xl: '32px'
    readonly '2xl': '48px'
    readonly '3xl': '64px'
    readonly '4xl': '96px'
  }
  readonly borderRadius: {
    readonly none: '0'
    readonly sm: '8px'
    readonly md: '12px'
    readonly lg: '16px'
    readonly xl: '20px'
    readonly '2xl': '24px'
    readonly '3xl': '32px'
    readonly full: '9999px'
  }
  readonly shadows: {
    readonly sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
    readonly md: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
    readonly lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    readonly xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
    readonly '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
    readonly nxGreen: '0 4px 14px 0 rgba(119, 240, 127, 0.39)'
    readonly nxTeal: '0 4px 14px 0 rgba(63, 201, 149, 0.39)'
    readonly nxBlue: '0 4px 14px 0 rgba(64, 160, 174, 0.39)'
    readonly glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    readonly none: 'none'
  }
  readonly typography: {
    readonly fontFamily: {
      readonly primary: 'Poppins, sans-serif'
      readonly secondary: 'Roboto, sans-serif'
      readonly mono: 'monospace'
    }
    readonly fontSize: {
      readonly xs: '12px'
      readonly sm: '14px'
      readonly base: '16px'
      readonly lg: '18px'
      readonly xl: '20px'
      readonly '2xl': '24px'
      readonly '3xl': '30px'
      readonly '4xl': '36px'
      readonly '5xl': '48px'
      readonly '6xl': '60px'
    }
    readonly fontWeight: {
      readonly light: '300'
      readonly regular: '400'
      readonly medium: '500'
      readonly semibold: '600'
      readonly bold: '700'
    }
    readonly lineHeight: {
      readonly tight: '1.25'
      readonly normal: '1.5'
      readonly relaxed: '1.75'
      readonly loose: '2'
    }
    readonly letterSpacing: {
      readonly tight: '-0.02em'
      readonly normal: '0'
      readonly wide: '0.02em'
    }
  }
  readonly breakpoints: {
    readonly sm: '640px'
    readonly md: '768px'
    readonly lg: '1024px'
    readonly xl: '1280px'
    readonly '2xl': '1536px'
  }
  readonly transitions: {
    readonly duration: {
      readonly fast: '150ms'
      readonly normal: '300ms'
      readonly slow: '500ms'
    }
    readonly timing: {
      readonly linear: 'linear'
      readonly easeIn: 'cubic-bezier(0.4, 0, 1, 1)'
      readonly easeOut: 'cubic-bezier(0, 0, 0.2, 1)'
      readonly easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
    readonly all: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
    readonly colors: 'background-color 300ms, border-color 300ms, color 300ms'
    readonly transform: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
    readonly opacity: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)'
  }
  readonly zIndex: {
    readonly hide: '-1'
    readonly base: '0'
    readonly dropdown: '1000'
    readonly sticky: '1100'
    readonly fixed: '1200'
    readonly modal: '1300'
    readonly popover: '1400'
    readonly tooltip: '1500'
    readonly notification: '1600'
  }
  readonly componentSizes: {
    readonly button: {
      readonly sm: {
        readonly height: '32px'
        readonly padding: '8px 16px'
        readonly fontSize: '14px'
      }
      readonly md: {
        readonly height: '40px'
        readonly padding: '10px 20px'
        readonly fontSize: '16px'
      }
      readonly lg: {
        readonly height: '48px'
        readonly padding: '12px 24px'
        readonly fontSize: '18px'
      }
      readonly xl: {
        readonly height: '56px'
        readonly padding: '14px 28px'
        readonly fontSize: '20px'
      }
    }
    readonly input: {
      readonly sm: {
        readonly height: '32px'
        readonly padding: '8px 12px'
        readonly fontSize: '14px'
      }
      readonly md: {
        readonly height: '40px'
        readonly padding: '10px 16px'
        readonly fontSize: '16px'
      }
      readonly lg: {
        readonly height: '48px'
        readonly padding: '12px 20px'
        readonly fontSize: '18px'
      }
    }
    readonly badge: {
      readonly sm: {
        readonly height: '20px'
        readonly padding: '2px 8px'
        readonly fontSize: '12px'
      }
      readonly md: {
        readonly height: '24px'
        readonly padding: '4px 10px'
        readonly fontSize: '14px'
      }
      readonly lg: {
        readonly height: '28px'
        readonly padding: '6px 12px'
        readonly fontSize: '16px'
      }
    }
  }
  readonly iconSizes: {
    readonly xs: '12px'
    readonly sm: '16px'
    readonly md: '20px'
    readonly lg: '24px'
    readonly xl: '32px'
    readonly '2xl': '48px'
  }
  readonly glassmorphism: {
    readonly light: {
      readonly background: 'rgba(255, 255, 255, 0.1)'
      readonly backdropFilter: 'blur(10px)'
      readonly border: '1px solid rgba(255, 255, 255, 0.2)'
    }
    readonly medium: {
      readonly background: 'rgba(255, 255, 255, 0.2)'
      readonly backdropFilter: 'blur(20px)'
      readonly border: '1px solid rgba(255, 255, 255, 0.3)'
    }
    readonly dark: {
      readonly background: 'rgba(0, 0, 0, 0.2)'
      readonly backdropFilter: 'blur(10px)'
      readonly border: '1px solid rgba(255, 255, 255, 0.1)'
    }
    readonly nxGreen: {
      readonly background: 'rgba(119, 240, 127, 0.1)'
      readonly backdropFilter: 'blur(10px)'
      readonly border: '1px solid rgba(119, 240, 127, 0.2)'
    }
  }
  readonly animations: {
    readonly hover: {
      readonly translateY: '-2px'
      readonly scale: '1.05'
      readonly shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    }
    readonly spin: 'spin 1s linear infinite'
    readonly pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    readonly bounce: 'bounce 1s infinite'
    readonly fadeIn: 'fadeIn 0.3s ease-in'
    readonly fadeOut: 'fadeOut 0.3s ease-out'
    readonly slideInLeft: 'slideInLeft 0.3s ease-out'
    readonly slideInRight: 'slideInRight 0.3s ease-out'
    readonly slideInUp: 'slideInUp 0.3s ease-out'
    readonly slideInDown: 'slideInDown 0.3s ease-out'
  }
}
export default designTokens
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
