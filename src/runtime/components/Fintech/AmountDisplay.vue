<script setup lang="ts">
import { computed } from 'vue'
import { Money } from '../../utils/helpers/fintech/precisionMath'

interface Props {
  /** Montant à afficher */
  amount: number
  /** Code devise ISO (EUR, USD, etc.) */
  currency?: string
  /** Locale pour formatage (fr-FR, en-US, etc.) */
  locale?: string
  /** Afficher le symbole de devise */
  showCurrency?: boolean
  /** Afficher les décimales */
  showDecimals?: boolean
  /** Position du symbole devise */
  currencyPosition?: 'before' | 'after'
  /** Couleur du montant */
  color?: 'default' | 'positive' | 'negative' | 'muted'
  /** Taille du texte */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Poids de la police */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'EUR',
  locale: 'fr-FR',
  showCurrency: true,
  showDecimals: true,
  currencyPosition: 'after',
  color: 'default',
  size: 'md',
  weight: 'normal'
})

// Utiliser Money class pour précision
const money = computed(() => new Money(props.amount, props.currency))

// Format avec Intl
const formatted = computed(() => money.value.format(props.locale))

// Extraire parties du montant formaté
const parts = computed(() => {
  const str = formatted.value
  // Retirer symboles devise pour parsing
  const cleaned = str.replace(/[€$£]/g, '').replace(/CFA/g, '').trim()
  
  // Séparer par virgule ou point selon locale
  const separator = props.locale.startsWith('fr') ? ',' : '.'
  const [whole, decimal] = cleaned.split(separator)
  
  return {
    whole: whole.trim(),
    decimal: decimal || '00'
  }
})

// Symbole devise
const currencySymbol = computed(() => {
  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    XOF: 'CFA',
    XAF: 'CFA'
  }
  return symbols[props.currency] || props.currency
})

// Classes CSS
const amountClasses = computed(() => [
  'noki-amount-display',
  `amount-${props.size}`,
  `amount-${props.color}`,
  `amount-weight-${props.weight}`
])

// Title pour accessibilité
const title = computed(() => money.value.format(props.locale))
</script>

<template>
  <span :class="amountClasses" :title="title">
    <span 
      v-if="showCurrency && currencyPosition === 'before'" 
      class="currency-symbol currency-before"
    >
      {{ currencySymbol }}
    </span>
    
    <span class="amount-value">
      {{ parts.whole }}
      <span v-if="showDecimals" class="amount-decimals">
        {{ props.locale.startsWith('fr') ? ',' : '.' }}{{ parts.decimal }}
      </span>
    </span>
    
    <span 
      v-if="showCurrency && currencyPosition === 'after'" 
      class="currency-symbol currency-after"
    >
      {{ currencySymbol }}
    </span>
  </span>
</template>

<style scoped>
.noki-amount-display {
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

/* Sizes */
.amount-xs { font-size: 0.75rem; line-height: 1rem; }
.amount-sm { font-size: 0.875rem; line-height: 1.25rem; }
.amount-md { font-size: 1rem; line-height: 1.5rem; }
.amount-lg { font-size: 1.125rem; line-height: 1.75rem; }
.amount-xl { font-size: 1.5rem; line-height: 2rem; }
.amount-2xl { font-size: 2rem; line-height: 2.5rem; }

/* Colors */
.amount-default { color: currentColor; }
.amount-positive { color: #77F07F; }
.amount-negative { color: #ef4444; }
.amount-muted { color: #9ca3af; }

/* Weights */
.amount-weight-normal { font-weight: 400; }
.amount-weight-medium { font-weight: 500; }
.amount-weight-semibold { font-weight: 600; }
.amount-weight-bold { font-weight: 700; }

/* Currency symbol */
.currency-symbol {
  opacity: 0.85;
  font-size: 0.9em;
  font-weight: 500;
}

.currency-before {
  margin-right: 0.125rem;
}

.currency-after {
  margin-left: 0.125rem;
}

/* Decimals plus petits et moins visibles */
.amount-decimals {
  font-size: 0.85em;
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 640px) {
  .amount-xl { font-size: 1.25rem; }
  .amount-2xl { font-size: 1.5rem; }
}
</style>

