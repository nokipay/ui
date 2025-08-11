export interface CurrencyFormatOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  showSymbol?: boolean;
  showCode?: boolean;
  compact?: boolean; // formatage compact
}

export function useCurrencyFormat() {
  // Options par défaut pour le formatage FCFA
  const defaultOptions = computed((): CurrencyFormatOptions => ({
    currency: 'XAF',
    locale: 'fr-FR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    showSymbol: true,
    showCode: false,
    compact: false
  }));

  /**
   * Formate un montant en FCFA avec formatage compact si nécessaire
   */
  const formatFCFA = (amount: number | string | null | undefined, options: CurrencyFormatOptions = {}): string => {
    if (amount === null || amount === undefined || amount === '') {
      return '-';
    }

    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    if (isNaN(numAmount)) {
      return '-';
    }

    const mergedOptions = { ...defaultOptions.value, ...options };

    // Formatage compact pour les montants >= 12 345 678
    if (mergedOptions.compact && Math.abs(numAmount) >= 12345678) {
      return formatCompactAmount(numAmount, mergedOptions);
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

      // Personnalisation pour FCFA
      if (mergedOptions.currency === 'XAF') {
        formatted = formatted.replace('XAF', 'FCFA');

        // Si on ne veut pas afficher le symbole
        if (!mergedOptions.showSymbol) {
          formatted = formatted.replace('FCFA', '').trim();
        }
      }

      return formatted;
    } catch (error) {
      // Fallback simple si l'Intl n'est pas supporté
      return `${numAmount.toLocaleString('fr-FR')} FCFA`;
    }
  };

  /**
   * Formate un montant compact avec K, M, B, T, Qa, Qi, etc. selon les conventions internationales
   */
  const formatCompactAmount = (amount: number, options: CurrencyFormatOptions): string => {
    const absAmount = Math.abs(amount);
    const sign = amount < 0 ? '-' : '';

    let formatted: string;
    let suffix: string;

    if (absAmount >= 1e+75) { // >= 1 quattuorvigintillion
      formatted = (absAmount / 1e+75).toFixed(1).replace('.', ',');
      suffix = 'Qv';
    } else if (absAmount >= 1e+72) { // >= 1 tresvigintillion
      formatted = (absAmount / 1e+72).toFixed(1).replace('.', ',');
      suffix = 'Tv';
    } else if (absAmount >= 1e+69) { // >= 1 duovigintillion
      formatted = (absAmount / 1e+69).toFixed(1).replace('.', ',');
      suffix = 'Dv';
    } else if (absAmount >= 1e+66) { // >= 1 unvigintillion
      formatted = (absAmount / 1e+66).toFixed(1).replace('.', ',');
      suffix = 'Uv';
    } else if (absAmount >= 1e+63) { // >= 1 vigintillion
      formatted = (absAmount / 1e+63).toFixed(1).replace('.', ',');
      suffix = 'Vg';
    } else if (absAmount >= 1e+60) { // >= 1 novemdecillion
      formatted = (absAmount / 1e+60).toFixed(1).replace('.', ',');
      suffix = 'Nd';
    } else if (absAmount >= 1e+57) { // >= 1 octodecillion
      formatted = (absAmount / 1e+57).toFixed(1).replace('.', ',');
      suffix = 'Od';
    } else if (absAmount >= 1e+54) { // >= 1 septendecillion
      formatted = (absAmount / 1e+54).toFixed(1).replace('.', ',');
      suffix = 'Sd';
    } else if (absAmount >= 1e+51) { // >= 1 sexdecillion
      formatted = (absAmount / 1e+51).toFixed(1).replace('.', ',');
      suffix = 'Sx';
    } else if (absAmount >= 1e+48) { // >= 1 quindecillion
      formatted = (absAmount / 1e+48).toFixed(1).replace('.', ',');
      suffix = 'Qd';
    } else if (absAmount >= 1e+45) { // >= 1 quattuordecillion
      formatted = (absAmount / 1e+45).toFixed(1).replace('.', ',');
      suffix = 'Qo';
    } else if (absAmount >= 1e+42) { // >= 1 tredecillion
      formatted = (absAmount / 1e+42).toFixed(1).replace('.', ',');
      suffix = 'Td';
    } else if (absAmount >= 1e+39) { // >= 1 duodecillion
      formatted = (absAmount / 1e+39).toFixed(1).replace('.', ',');
      suffix = 'Dd';
    } else if (absAmount >= 1e+36) { // >= 1 undecillion
      formatted = (absAmount / 1e+36).toFixed(1).replace('.', ',');
      suffix = 'Ud';
    } else if (absAmount >= 1e+33) { // >= 1 decillion
      formatted = (absAmount / 1e+33).toFixed(1).replace('.', ',');
      suffix = 'Dc';
    } else if (absAmount >= 1e+30) { // >= 1 nonillion
      formatted = (absAmount / 1e+30).toFixed(1).replace('.', ',');
      suffix = 'No';
    } else if (absAmount >= 1e+27) { // >= 1 octillion
      formatted = (absAmount / 1e+27).toFixed(1).replace('.', ',');
      suffix = 'Oc';
    } else if (absAmount >= 1e+24) { // >= 1 septillion
      formatted = (absAmount / 1e+24).toFixed(1).replace('.', ',');
      suffix = 'Sp';
    } else if (absAmount >= 1e+21) { // >= 1 sextillion
      formatted = (absAmount / 1e+21).toFixed(1).replace('.', ',');
      suffix = 'Sx';
    } else if (absAmount >= 1e+18) { // >= 1 quintillion
      formatted = (absAmount / 1e+18).toFixed(1).replace('.', ',');
      suffix = 'Qi';
    } else if (absAmount >= 1e+15) { // >= 1 quadrillion
      formatted = (absAmount / 1e+15).toFixed(1).replace('.', ',');
      suffix = 'Qa';
    } else if (absAmount >= 1e+12) { // >= 1 trillion
      formatted = (absAmount / 1e+12).toFixed(1).replace('.', ',');
      suffix = 'T';
    } else if (absAmount >= 1e+9) { // >= 1 milliard
      formatted = (absAmount / 1e+9).toFixed(1).replace('.', ',');
      suffix = 'B';
    } else if (absAmount >= 1e+6) { // >= 1 million
      formatted = (absAmount / 1e+6).toFixed(1).replace('.', ',');
      suffix = 'M';
    } else if (absAmount >= 1e+3) { // >= 1 millier
      formatted = (absAmount / 1e+3).toFixed(1).replace('.', ',');
      suffix = 'K';
    } else {
      formatted = absAmount.toString();
      suffix = '';
    }

    const symbol = options.showSymbol ? ' FCFA' : '';
    return `${sign}${formatted}${suffix}${symbol}`;
  };

  /**
   * Formate un montant sans symbole monétaire
   */
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

    // Formatage compact pour les nombres >= 12 345 678
    if (compact && Math.abs(numAmount) >= 12345678) {
      return formatCompactNumber(numAmount);
    }

    try {
      return numAmount.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    } catch (error) {
      // Fallback simple
      return numAmount.toFixed(decimals).replace('.', ',');
    }
  };

  /**
   * Formate un nombre compact avec K, M, B, T, Qa, Qi, etc. selon les conventions internationales
   */
  const formatCompactNumber = (amount: number): string => {
    const absAmount = Math.abs(amount);
    const sign = amount < 0 ? '-' : '';

    let formatted: string;
    let suffix: string;

    if (absAmount >= 1e+75) { // >= 1 quattuorvigintillion
      formatted = (absAmount / 1e+75).toFixed(1).replace('.', ',');
      suffix = 'Qv';
    } else if (absAmount >= 1e+72) { // >= 1 tresvigintillion
      formatted = (absAmount / 1e+72).toFixed(1).replace('.', ',');
      suffix = 'Tv';
    } else if (absAmount >= 1e+69) { // >= 1 duovigintillion
      formatted = (absAmount / 1e+69).toFixed(1).replace('.', ',');
      suffix = 'Dv';
    } else if (absAmount >= 1e+66) { // >= 1 unvigintillion
      formatted = (absAmount / 1e+66).toFixed(1).replace('.', ',');
      suffix = 'Uv';
    } else if (absAmount >= 1e+63) { // >= 1 vigintillion
      formatted = (absAmount / 1e+63).toFixed(1).replace('.', ',');
      suffix = 'Vg';
    } else if (absAmount >= 1e+60) { // >= 1 novemdecillion
      formatted = (absAmount / 1e+60).toFixed(1).replace('.', ',');
      suffix = 'Nd';
    } else if (absAmount >= 1e+57) { // >= 1 octodecillion
      formatted = (absAmount / 1e+57).toFixed(1).replace('.', ',');
      suffix = 'Od';
    } else if (absAmount >= 1e+54) { // >= 1 septendecillion
      formatted = (absAmount / 1e+54).toFixed(1).replace('.', ',');
      suffix = 'Sd';
    } else if (absAmount >= 1e+51) { // >= 1 sexdecillion
      formatted = (absAmount / 1e+51).toFixed(1).replace('.', ',');
      suffix = 'Sx';
    } else if (absAmount >= 1e+48) { // >= 1 quindecillion
      formatted = (absAmount / 1e+48).toFixed(1).replace('.', ',');
      suffix = 'Qd';
    } else if (absAmount >= 1e+45) { // >= 1 quattuordecillion
      formatted = (absAmount / 1e+45).toFixed(1).replace('.', ',');
      suffix = 'Qo';
    } else if (absAmount >= 1e+42) { // >= 1 tredecillion
      formatted = (absAmount / 1e+42).toFixed(1).replace('.', ',');
      suffix = 'Td';
    } else if (absAmount >= 1e+39) { // >= 1 duodecillion
      formatted = (absAmount / 1e+39).toFixed(1).replace('.', ',');
      suffix = 'Dd';
    } else if (absAmount >= 1e+36) { // >= 1 undecillion
      formatted = (absAmount / 1e+36).toFixed(1).replace('.', ',');
      suffix = 'Ud';
    } else if (absAmount >= 1e+33) { // >= 1 decillion
      formatted = (absAmount / 1e+33).toFixed(1).replace('.', ',');
      suffix = 'Dc';
    } else if (absAmount >= 1e+30) { // >= 1 nonillion
      formatted = (absAmount / 1e+30).toFixed(1).replace('.', ',');
      suffix = 'No';
    } else if (absAmount >= 1e+27) { // >= 1 octillion
      formatted = (absAmount / 1e+27).toFixed(1).replace('.', ',');
      suffix = 'Oc';
    } else if (absAmount >= 1e+24) { // >= 1 septillion
      formatted = (absAmount / 1e+24).toFixed(1).replace('.', ',');
      suffix = 'Sp';
    } else if (absAmount >= 1e+21) { // >= 1 sextillion
      formatted = (absAmount / 1e+21).toFixed(1).replace('.', ',');
      suffix = 'Sx';
    } else if (absAmount >= 1e+18) { // >= 1 quintillion
      formatted = (absAmount / 1e+18).toFixed(1).replace('.', ',');
      suffix = 'Qi';
    } else if (absAmount >= 1e+15) { // >= 1 quadrillion
      formatted = (absAmount / 1e+15).toFixed(1).replace('.', ',');
      suffix = 'Qa';
    } else if (absAmount >= 1e+12) { // >= 1 trillion
      formatted = (absAmount / 1e+12).toFixed(1).replace('.', ',');
      suffix = 'T';
    } else if (absAmount >= 1e+9) { // >= 1 milliard
      formatted = (absAmount / 1e+9).toFixed(1).replace('.', ',');
      suffix = 'B';
    } else if (absAmount >= 1e+6) { // >= 1 million
      formatted = (absAmount / 1e+6).toFixed(1).replace('.', ',');
      suffix = 'M';
    } else if (absAmount >= 1e+3) { // >= 1 millier
      formatted = (absAmount / 1e+3).toFixed(1).replace('.', ',');
      suffix = 'K';
    } else {
      formatted = absAmount.toString();
      suffix = '';
    }

    return `${sign}${formatted}${suffix}`;
  };

  /**
   * Formate un pourcentage
   */
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

  /**
   * Formate un montant avec suffixe (K, M, B, T, Qa, Qi, etc.) - version originale avec conventions internationales
   */
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

      // Personnalisation pour FCFA
      if (mergedOptions.currency === 'XAF') {
        formatted = formatted.replace('XAF', 'FCFA');

        if (!mergedOptions.showSymbol) {
          formatted = formatted.replace('FCFA', '').trim();
        }
      }

      return formatted;
    } catch (error) {
      // Fallback manuel avec conventions internationales
      const absAmount = Math.abs(numAmount);
      const sign = numAmount < 0 ? '-' : '';

      let scaled: number;
      let suffix: string;

      if (absAmount >= 1e+75) { // >= 1 quattuorvigintillion
        scaled = absAmount / 1e+75;
        suffix = 'Qv';
      } else if (absAmount >= 1e+72) { // >= 1 tresvigintillion
        scaled = absAmount / 1e+72;
        suffix = 'Tv';
      } else if (absAmount >= 1e+69) { // >= 1 duovigintillion
        scaled = absAmount / 1e+69;
        suffix = 'Dv';
      } else if (absAmount >= 1e+66) { // >= 1 unvigintillion
        scaled = absAmount / 1e+66;
        suffix = 'Uv';
      } else if (absAmount >= 1e+63) { // >= 1 vigintillion
        scaled = absAmount / 1e+63;
        suffix = 'Vg';
      } else if (absAmount >= 1e+60) { // >= 1 novemdecillion
        scaled = absAmount / 1e+60;
        suffix = 'Nd';
      } else if (absAmount >= 1e+57) { // >= 1 octodecillion
        scaled = absAmount / 1e+57;
        suffix = 'Od';
      } else if (absAmount >= 1e+54) { // >= 1 septendecillion
        scaled = absAmount / 1e+54;
        suffix = 'Sd';
      } else if (absAmount >= 1e+51) { // >= 1 sexdecillion
        scaled = absAmount / 1e+51;
        suffix = 'Sx';
      } else if (absAmount >= 1e+48) { // >= 1 quindecillion
        scaled = absAmount / 1e+48;
        suffix = 'Qd';
      } else if (absAmount >= 1e+45) { // >= 1 quattuordecillion
        scaled = absAmount / 1e+45;
        suffix = 'Qo';
      } else if (absAmount >= 1e+42) { // >= 1 tredecillion
        scaled = absAmount / 1e+42;
        suffix = 'Td';
      } else if (absAmount >= 1e+39) { // >= 1 duodecillion
        scaled = absAmount / 1e+39;
        suffix = 'Dd';
      } else if (absAmount >= 1e+36) { // >= 1 undecillion
        scaled = absAmount / 1e+36;
        suffix = 'Ud';
      } else if (absAmount >= 1e+33) { // >= 1 decillion
        scaled = absAmount / 1e+33;
        suffix = 'Dc';
      } else if (absAmount >= 1e+30) { // >= 1 nonillion
        scaled = absAmount / 1e+30;
        suffix = 'No';
      } else if (absAmount >= 1e+27) { // >= 1 octillion
        scaled = absAmount / 1e+27;
        suffix = 'Oc';
      } else if (absAmount >= 1e+24) { // >= 1 septillion
        scaled = absAmount / 1e+24;
        suffix = 'Sp';
      } else if (absAmount >= 1e+21) { // >= 1 sextillion
        scaled = absAmount / 1e+21;
        suffix = 'Sx';
      } else if (absAmount >= 1e+18) { // >= 1 quintillion
        scaled = absAmount / 1e+18;
        suffix = 'Qi';
      } else if (absAmount >= 1e+15) { // >= 1 quadrillion
        scaled = absAmount / 1e+15;
        suffix = 'Qa';
      } else if (absAmount >= 1e+12) { // >= 1 trillion
        scaled = absAmount / 1e+12;
        suffix = 'T';
      } else if (absAmount >= 1e+9) { // >= 1 milliard
        scaled = absAmount / 1e+9;
        suffix = 'B';
      } else if (absAmount >= 1e+6) { // >= 1 million
        scaled = absAmount / 1e+6;
        suffix = 'M';
      } else if (absAmount >= 1e+3) { // >= 1 millier
        scaled = absAmount / 1e+3;
        suffix = 'K';
      } else {
        scaled = absAmount;
        suffix = '';
      }

      return `${sign}${scaled.toFixed(1).replace('.', ',')}${suffix} FCFA`;
    }
  };

  /**
   * Parse un montant formaté en nombre
   */
  const parseAmount = (formattedAmount: string): number => {
    if (!formattedAmount || formattedAmount === '-') {
      return 0;
    }

    // Supprimer les espaces, symboles monétaires et caractères non numériques sauf virgule et point
    const cleaned = formattedAmount
      .replace(/[^\d,.-]/g, '')
      .replace(',', '.');

    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  /**
   * Obtient le montant exact pour le tooltip
   */
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