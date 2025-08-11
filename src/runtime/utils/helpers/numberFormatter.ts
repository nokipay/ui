import { COMPACT_SCALES, COMPACT_THRESHOLD } from '../constants/numberFormat';

export function formatCompactNumber(amount: number, includeCurrency = false): string {
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (absAmount < COMPACT_THRESHOLD) {
    return `${sign}${absAmount}${includeCurrency ? ' FCFA' : ''}`;
  }

  for (const scale of COMPACT_SCALES) {
    if (absAmount >= scale.threshold) {
      const scaled = (absAmount / scale.divisor).toFixed(1).replace('.', ',');
      const suffix = includeCurrency ? ` ${scale.suffix} FCFA` : scale.suffix;
      return `${sign}${scaled}${suffix}`;
    }
  }

  return `${sign}${absAmount}${includeCurrency ? ' FCFA' : ''}`;
}

export function shouldUseCompactFormat(amount: number): boolean {
  return Math.abs(amount) >= COMPACT_THRESHOLD;
}