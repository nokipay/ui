<script setup lang="ts">
import { computed } from 'vue'

type Currency = 'EUR' | 'USD' | 'GBP' | 'XOF' | 'XAF'

interface Props {
  /** Code devise ISO */
  currency: Currency
  /** Afficher le symbole */
  showSymbol?: boolean
  /** Afficher le code */
  showCode?: boolean
  /** Taille du badge */
  size?: 'sm' | 'md' | 'lg'
  /** Variante de style */
  variant?: 'default' | 'outline' | 'subtle'
}

const props = withDefaults(defineProps<Props>(), {
  showSymbol: true,
  showCode: true,
  size: 'md',
  variant: 'default'
})

// Configuration par devise
const currencyConfig = computed(() => {
  const configs: Record<Currency, {
    symbol: string
    name: string
    color: string
    bgColor: string
    borderColor: string
  }> = {
    EUR: {
      symbol: '€',
      name: 'Euro',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-300'
    },
    USD: {
      symbol: '$',
      name: 'US Dollar',
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-300'
    },
    GBP: {
      symbol: '£',
      name: 'British Pound',
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-300'
    },
    XOF: {
      symbol: 'CFA',
      name: 'Franc CFA (XOF)',
      color: 'text-orange-700',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-300'
    },
    XAF: {
      symbol: 'CFA',
      name: 'Franc CFA (XAF)',
      color: 'text-amber-700',
      bgColor: 'bg-amber-100',
      borderColor: 'border-amber-300'
    }
  }
  
  return configs[props.currency]
})

const badgeClasses = computed(() => {
  const base = [
    'currency-badge',
    `badge-${props.size}`,
    `badge-${props.variant}`,
    currencyConfig.value.color
  ]
  
  if (props.variant === 'default') {
    base.push(currencyConfig.value.bgColor)
  } else if (props.variant === 'outline') {
    base.push('border', currencyConfig.value.borderColor)
  } else if (props.variant === 'subtle') {
    base.push(currencyConfig.value.bgColor, 'bg-opacity-30')
  }
  
  return base
})
</script>

<template>
  <span 
    :class="badgeClasses" 
    :title="currencyConfig.name"
    :aria-label="`Currency: ${currencyConfig.name}`"
  >
    <span v-if="showSymbol" class="currency-symbol">
      {{ currencyConfig.symbol }}
    </span>
    <span v-if="showCode" class="currency-code">
      {{ currency }}
    </span>
  </span>
</template>

<style scoped>
.currency-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.375rem;
  font-weight: 600;
  font-family: monospace;
  white-space: nowrap;
  transition: all 0.2s ease;
}

/* Sizes */
.badge-sm {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  gap: 0.125rem;
}

.badge-md {
  font-size: 0.875rem;
  padding: 0.25rem 0.625rem;
  gap: 0.25rem;
}

.badge-lg {
  font-size: 1rem;
  padding: 0.375rem 0.75rem;
  gap: 0.375rem;
}

/* Variants */
.badge-default {
  /* Background colors set via classes */
}

.badge-outline {
  background: white;
  border-width: 1.5px;
}

.badge-subtle {
  backdrop-filter: blur(4px);
}

.currency-symbol {
  font-weight: 700;
  font-size: 1.1em;
}

.currency-code {
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* Hover effect */
.currency-badge:hover {
  transform: scale(1.05);
}
</style>

