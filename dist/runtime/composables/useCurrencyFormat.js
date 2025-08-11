import { formatCompactNumber, shouldUseCompactFormat } from "../utils/helpers/numberFormatter.js";
export function useCurrencyFormat() {
  const defaultOptions = computed(() => ({
    currency: "XAF",
    locale: "fr-FR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    showSymbol: true,
    showCode: false,
    compact: false
  }));
  const formatFCFA = (amount, options = {}) => {
    if (amount === null || amount === void 0 || amount === "") {
      return "-";
    }
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) {
      return "-";
    }
    const mergedOptions = { ...defaultOptions.value, ...options };
    if (mergedOptions.compact && shouldUseCompactFormat(numAmount)) {
      return formatCompactNumber(numAmount, mergedOptions.showSymbol);
    }
    try {
      const formatter = new Intl.NumberFormat(mergedOptions.locale, {
        style: "currency",
        currency: mergedOptions.currency,
        minimumFractionDigits: mergedOptions.minimumFractionDigits,
        maximumFractionDigits: mergedOptions.maximumFractionDigits,
        currencyDisplay: mergedOptions.showCode ? "code" : "symbol"
      });
      let formatted = formatter.format(numAmount);
      if (mergedOptions.currency === "XAF") {
        formatted = formatted.replace("XAF", "FCFA");
        if (!mergedOptions.showSymbol) {
          formatted = formatted.replace("FCFA", "").trim();
        }
      }
      return formatted;
    } catch (error) {
      return `${numAmount.toLocaleString("fr-FR")} FCFA`;
    }
  };
  const formatNumber = (amount, options = {}) => {
    if (amount === null || amount === void 0 || amount === "") {
      return "-";
    }
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) {
      return "-";
    }
    const locale = options.locale || "fr-FR";
    const decimals = options.decimals !== void 0 ? options.decimals : 0;
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
      return numAmount.toFixed(decimals).replace(".", ",");
    }
  };
  const formatPercentage = (value, decimals = 1) => {
    if (value === null || value === void 0 || value === "") {
      return "-";
    }
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) {
      return "-";
    }
    try {
      return `${numValue.toFixed(decimals).replace(".", ",")}%`;
    } catch (error) {
      return `${numValue}%`;
    }
  };
  const formatCompact = (amount, options = {}) => {
    if (amount === null || amount === void 0 || amount === "") {
      return "-";
    }
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) {
      return "-";
    }
    const mergedOptions = { ...defaultOptions.value, ...options };
    try {
      const formatter = new Intl.NumberFormat(mergedOptions.locale, {
        notation: "compact",
        maximumFractionDigits: 1,
        style: "currency",
        currency: mergedOptions.currency,
        currencyDisplay: mergedOptions.showCode ? "code" : "symbol"
      });
      let formatted = formatter.format(numAmount);
      if (mergedOptions.currency === "XAF") {
        formatted = formatted.replace("XAF", "FCFA");
        if (!mergedOptions.showSymbol) {
          formatted = formatted.replace("FCFA", "").trim();
        }
      }
      return formatted;
    } catch (error) {
      return formatCompactNumber(numAmount, true);
    }
  };
  const parseAmount = (formattedAmount) => {
    if (!formattedAmount || formattedAmount === "-") {
      return 0;
    }
    const cleaned = formattedAmount.replace(/[^\d,.-]/g, "").replace(",", ".");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };
  const getExactAmount = (amount) => {
    if (amount === null || amount === void 0 || amount === "") {
      return "-";
    }
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(numAmount)) {
      return "-";
    }
    try {
      const formatter = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "XAF",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      let formatted = formatter.format(numAmount);
      formatted = formatted.replace("XAF", "FCFA");
      return formatted;
    } catch (error) {
      return `${numAmount.toLocaleString("fr-FR")} FCFA`;
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
