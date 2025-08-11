export interface CurrencyFormatOptions {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSymbol?: boolean;
    showCode?: boolean;
    compact?: boolean;
}
export declare function useCurrencyFormat(): {
    formatFCFA: (amount: number | string | null | undefined, options?: CurrencyFormatOptions) => string;
    formatNumber: (amount: number | string | null | undefined, options?: {
        locale?: string;
        decimals?: number;
        compact?: boolean;
    }) => string;
    formatPercentage: (value: number | string | null | undefined, decimals?: number) => string;
    formatCompact: (amount: number | string | null | undefined, options?: CurrencyFormatOptions) => string;
    parseAmount: (formattedAmount: string) => number;
    getExactAmount: (amount: number | string | null | undefined) => string;
};
