import { formatCompactNumber, shouldUseCompactFormat } from '../utils/helpers/numberFormatter';

export interface CurrencyFormatOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  showSymbol?: boolean;
  showCode?: boolean;
  compact?: boolean;
}

export function useCurrencyFormat() {
  const defaultOptions = computed((): CurrencyFormatOptions => ({
    currency: 'XAF',
    locale: 'fr-FR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    showSymbol: true,
    showCode: false,
    compact: false
  }));

  const formatFCFA = (amount: number | string | null | undefined, options: CurrencyFormatOptions = {}): string => {
    if (amount === null || amount === undefined || amount === '') {
      return '-';
    }

    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numAmount)) {
      return '-';
    }

    const mergedOptions = { ...defaultOptions.value, ...options };

    if (mergedOptions.compact && shouldUseCompactFormat(numAmount)) {
      return formatCompactNumber(numAmount, mergedOptions.showSymbol);
    }

    try {
      const formatter = new Intl.NumberFormat(mergedOptions.locale, {
        style: 'currency',
        currency: mergedOptions.currency,
        minimumFractionDigits: mergedOptions.minimumFractionDigits,
        maximumFractionDigits: mergedOptions.maximumFractionDigits,
        currencyDisplay: mergedOptions.showCode ? 'code' : 'symbol'
      });

      let formatted = formatter.format(numAmount);

      if (mergedOptions.currency === 'XAF') {
        formatted = formatted.replace('XAF', 'FCFA');

        if (!mergedOptions.showSymbol) {
          formatted = formatted.replace('FCFA', '').trim();
        }
      }

      return formatted;
    } catch (error) {
      return `${numAmount.toLocaleString('fr-FR')} FCFA`;
    }
  };

  const formatNumber = (amount: number | string | null | undefined, options: { locale?: string; decimals?: number; compact?: boolean } = {}): string => {
    if (amount === null || amount === undefined || amount === '') {
      return '-';
    }

    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numAmount)) {
      return '-';
    }

    const locale = options.locale || 'fr-FR';
    const decimals = options.decimals !== undefined ? options.decimals : 0;
    const compact = options.compact || false;

    if (compact && shouldUseCompactFormat(numAmount)) {
      return formatCompactNumber(numAmount, false);
    }

    try {
      return numAmount.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    } catch (error) {
      return numAmount.toFixed(decimals).replace('.', ',');
    }
  };

  const formatPercentage = (value: number | string | null | undefined, decimals: number = 1): string => {
    if (value === null || value === undefined || value === '') {
      return '-';
    }

    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numValue)) {
      return '-';
    }

    try {
      return `${numValue.toFixed(decimals).replace('.', ',')}%`;
    } catch (error) {
      return `${numValue}%`;
    }
  };

  const formatCompact = (amount: number | string | null | undefined, options: CurrencyFormatOptions = {}): string => {
    if (amount === null || amount === undefined || amount === '') {
      return '-';
    }

    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numAmount)) {
      return '-';
    }

    const mergedOptions = { ...defaultOptions.value, ...options };

    try {
      const formatter = new Intl.NumberFormat(mergedOptions.locale, {
        notation: 'compact',
        maximumFractionDigits: 1,
        style: 'currency',
        currency: mergedOptions.currency,
        currencyDisplay: mergedOptions.showCode ? 'code' : 'symbol'
      });

      let formatted = formatter.format(numAmount);

      if (mergedOptions.currency === 'XAF') {
        formatted = formatted.replace('XAF', 'FCFA');

        if (!mergedOptions.showSymbol) {
          formatted = formatted.replace('FCFA', '').trim();
        }
      }

      return formatted;
    } catch (error) {
      return formatCompactNumber(numAmount, true);
    }
  };

  const parseAmount = (formattedAmount: string): number => {
    if (!formattedAmount || formattedAmount === '-') {
      return 0;
    }

    const cleaned = formattedAmount
      .replace(/[^\d,.-]/g, '')
      .replace(',', '.');

    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const getExactAmount = (amount: number | string | null | undefined): string => {
    if (amount === null || amount === undefined || amount === '') {
      return '-';
    }

    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numAmount)) {
      return '-';
    }

    try {
      const formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XAF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });

      let formatted = formatter.format(numAmount);
      formatted = formatted.replace('XAF', 'FCFA');

      return formatted;
    } catch (error) {
      return `${numAmount.toLocaleString('fr-FR')} FCFA`;
    }
  };

  return {
    formatFCFA,
    formatNumber,
    formatPercentage,
    formatCompact,
    parseAmount,
    getExactAmount
  };
}