export type ButtonColor = 'white' | 'yellow' | 'black' | 'primary';
export type ButtonShadowType = 'dark' | 'soft';
export declare const BUTTON_BASE_CLASSES = "px-4 py-2 rounded-full transition-all duration-300 justify-center font-medium hover:scale-105 hover:translate-y-[-2px]";
export declare const BUTTON_COLOR_STYLES: Record<ButtonColor, {
    normal: string;
    loading: string;
}>;
export declare const BUTTON_SHADOW_STYLES: Record<ButtonShadowType, Record<ButtonColor, string>>;
