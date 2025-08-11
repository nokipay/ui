export interface CompactScale {
  threshold: number;
  divisor: number;
  suffix: string;
}

export const COMPACT_SCALES: CompactScale[] = [
  { threshold: 1e+75, divisor: 1e+75, suffix: 'Qv' }, // quattuorvigintillion
  { threshold: 1e+72, divisor: 1e+72, suffix: 'Tv' }, // tresvigintillion
  { threshold: 1e+69, divisor: 1e+69, suffix: 'Dv' }, // duovigintillion
  { threshold: 1e+66, divisor: 1e+66, suffix: 'Uv' }, // unvigintillion
  { threshold: 1e+63, divisor: 1e+63, suffix: 'Vg' }, // vigintillion
  { threshold: 1e+60, divisor: 1e+60, suffix: 'Nd' }, // novemdecillion
  { threshold: 1e+57, divisor: 1e+57, suffix: 'Od' }, // octodecillion
  { threshold: 1e+54, divisor: 1e+54, suffix: 'Sd' }, // septendecillion
  { threshold: 1e+51, divisor: 1e+51, suffix: 'Sx' }, // sexdecillion
  { threshold: 1e+48, divisor: 1e+48, suffix: 'Qd' }, // quindecillion
  { threshold: 1e+45, divisor: 1e+45, suffix: 'Qo' }, // quattuordecillion
  { threshold: 1e+42, divisor: 1e+42, suffix: 'Td' }, // tredecillion
  { threshold: 1e+39, divisor: 1e+39, suffix: 'Dd' }, // duodecillion
  { threshold: 1e+36, divisor: 1e+36, suffix: 'Ud' }, // undecillion
  { threshold: 1e+33, divisor: 1e+33, suffix: 'Dc' }, // decillion
  { threshold: 1e+30, divisor: 1e+30, suffix: 'No' }, // nonillion
  { threshold: 1e+27, divisor: 1e+27, suffix: 'Oc' }, // octillion
  { threshold: 1e+24, divisor: 1e+24, suffix: 'Sp' }, // septillion
  { threshold: 1e+21, divisor: 1e+21, suffix: 'Sx' }, // sextillion
  { threshold: 1e+18, divisor: 1e+18, suffix: 'Qi' }, // quintillion
  { threshold: 1e+15, divisor: 1e+15, suffix: 'Qa' }, // quadrillion
  { threshold: 1e+12, divisor: 1e+12, suffix: 'T' },  // trillion
  { threshold: 1e+9, divisor: 1e+9, suffix: 'B' },    // milliard
  { threshold: 1e+6, divisor: 1e+6, suffix: 'M' },    // million
  { threshold: 1e+3, divisor: 1e+3, suffix: 'K' }     // millier
];

export const COMPACT_THRESHOLD = 12345678;