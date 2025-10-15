export declare const TYPOGRAPHY: {
    readonly fonts: {
        readonly sans: readonly ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"];
        readonly mono: readonly ["ui-monospace", "SFMono-Regular", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"];
    };
    readonly sizes: {
        readonly xs: "0.75rem";
        readonly sm: "0.875rem";
        readonly base: "1rem";
        readonly lg: "1.125rem";
        readonly xl: "1.25rem";
        readonly '2xl': "1.5rem";
        readonly '3xl': "1.875rem";
        readonly '4xl': "2.25rem";
        readonly '5xl': "3rem";
        readonly '6xl': "3.75rem";
        readonly '7xl': "4.5rem";
        readonly '8xl': "6rem";
        readonly '9xl': "8rem";
    };
    readonly lineHeights: {
        readonly tight: "1.25";
        readonly snug: "1.375";
        readonly normal: "1.5";
        readonly relaxed: "1.625";
        readonly loose: "2";
    };
    readonly weights: {
        readonly thin: "100";
        readonly extralight: "200";
        readonly light: "300";
        readonly normal: "400";
        readonly medium: "500";
        readonly semibold: "600";
        readonly bold: "700";
        readonly extrabold: "800";
        readonly black: "900";
    };
    readonly letterSpacing: {
        readonly tighter: "-0.05em";
        readonly tight: "-0.025em";
        readonly normal: "0em";
        readonly wide: "0.025em";
        readonly wider: "0.05em";
        readonly widest: "0.1em";
    };
};
export declare const TEXT_STYLES: {
    readonly heading: {
        readonly h1: "font-bold text-4xl md:text-5xl lg:text-6xl line-height-tight";
        readonly h2: "font-bold text-3xl md:text-4xl lg:text-5xl line-height-tight";
        readonly h3: "font-bold text-2xl md:text-3xl lg:text-4xl line-height-snug";
        readonly h4: "font-semibold text-xl md:text-2xl lg:text-3xl line-height-snug";
        readonly h5: "font-semibold text-lg md:text-xl lg:text-2xl line-height-normal";
        readonly h6: "font-semibold text-base md:text-lg lg:text-xl line-height-normal";
    };
    readonly body: {
        readonly large: "font-normal text-lg line-height-relaxed";
        readonly base: "font-normal text-base line-height-normal";
        readonly small: "font-normal text-sm line-height-normal";
        readonly xs: "font-normal text-xs line-height-tight";
    };
    readonly ui: {
        readonly label: "font-medium text-sm text-gray-700";
        readonly caption: "font-normal text-xs text-gray-500";
        readonly helper: "font-normal text-sm text-gray-600";
        readonly error: "font-medium text-sm text-red-600";
        readonly success: "font-medium text-sm text-green-600";
        readonly warning: "font-medium text-sm text-yellow-600";
    };
    readonly button: {
        readonly large: "font-semibold text-lg";
        readonly medium: "font-medium text-base";
        readonly small: "font-medium text-sm";
        readonly xs: "font-medium text-xs";
    };
};
export type FontFamily = keyof typeof TYPOGRAPHY.fonts;
export type FontSize = keyof typeof TYPOGRAPHY.sizes;
export type FontWeight = keyof typeof TYPOGRAPHY.weights;
export type LineHeight = keyof typeof TYPOGRAPHY.lineHeights;
export type LetterSpacing = keyof typeof TYPOGRAPHY.letterSpacing;
export declare function getFontFamily(family: FontFamily): string[];
export declare const FONT_CSS_VARIABLES: {
    readonly '--font-sans': string;
    readonly '--font-mono': string;
    readonly '--text-xs': "0.75rem";
    readonly '--text-sm': "0.875rem";
    readonly '--text-base': "1rem";
    readonly '--text-lg': "1.125rem";
    readonly '--text-xl': "1.25rem";
    readonly '--text-2xl': "1.5rem";
    readonly '--text-3xl': "1.875rem";
    readonly '--text-4xl': "2.25rem";
    readonly '--text-5xl': "3rem";
    readonly '--text-6xl': "3.75rem";
};
