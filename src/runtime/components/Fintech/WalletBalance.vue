<script setup lang="ts">
import { computed } from 'vue'
import AmountDisplay from './AmountDisplay.vue'

interface Props {
  /** Balance totale du wallet */
  balance: number
  /** Balance disponible (après blocages) */
  availableBalance?: number
  /** Code devise */
  currency?: string
  /** Locale pour formatage */
  locale?: string
  /** Afficher la balance disponible */
  showAvailable?: boolean
  /** Afficher la balance bloquée */
  showBlocked?: boolean
  /** Variante de layout */
  variant?: 'default' | 'compact' | 'detailed'
  /** Taille */
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'EUR',
  locale: 'fr-FR',
  showAvailable: true,
  showBlocked: false,
  variant: 'default',
  size: 'lg'
})

// Calculs
const blockedBalance = computed(() => {
  if (props.availableBalance === undefined) return 0
  return props.balance - props.availableBalance
})

const hasBlockedFunds = computed(() => {
  return blockedBalance.value > 0
})

// Tailles pour les montants
const mainAmountSize = computed(() => {
  const sizeMap: Record<string, any> = {
    sm: 'lg',
    md: 'xl',
    lg: '2xl',
    xl: '2xl'
  }
  return sizeMap[props.size] || '2xl'
})

const secondaryAmountSize = computed(() => {
  const sizeMap: Record<string, any> = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl'
  }
  return sizeMap[props.size] || 'lg'
})

const containerClasses = computed(() => [
  'wallet-balance-container',
  `variant-${props.variant}`,
  `size-${props.size}`
])
</script>

<template>
  <div :class="containerClasses">
    <!-- Balance principale -->
    <div class="balance-main">
      <p class="balance-label">
        {{ variant === 'compact' ? 'Solde' : 'Solde total' }}
      </p>
      <AmountDisplay 
        :amount="balance" 
        :currency="currency"
        :locale="locale"
        :size="mainAmountSize"
        weight="bold"
        color="default"
      />
    </div>
    
    <!-- Balance disponible -->
    <div 
      v-if="showAvailable && availableBalance !== undefined" 
      class="balance-available"
      :class="{ 'has-blocked': hasBlockedFunds }"
    >
      <p class="balance-label">
        Disponible
      </p>
      <AmountDisplay 
        :amount="availableBalance" 
        :currency="currency"
        :locale="locale"
        :size="secondaryAmountSize"
        weight="semibold"
        :color="hasBlockedFunds ? 'muted' : 'positive'"
      />
    </div>
    
    <!-- Balance bloquée -->
    <div 
      v-if="showBlocked && hasBlockedFunds" 
      class="balance-blocked"
    >
      <p class="balance-label">
        Bloqué
      </p>
      <AmountDisplay 
        :amount="blockedBalance" 
        :currency="currency"
        :locale="locale"
        :size="secondaryAmountSize"
        weight="medium"
        color="muted"
      />
    </div>
  </div>
</template>

<style scoped>
.wallet-balance-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 0.75rem;
}

/* Variants */
.variant-default {
  gap: 1rem;
}

.variant-compact {
  gap: 0.5rem;
  padding: 1rem;
}

.variant-detailed {
  gap: 1.5rem;
  padding: 2rem;
}

/* Balance sections */
.balance-main,
.balance-available,
.balance-blocked {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.balance-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.balance-available {
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
}

.balance-available.has-blocked {
  border-top-color: #fbbf24;
}

.balance-blocked {
  padding: 0.75rem;
  background: #fef3c7;
  border-radius: 0.5rem;
  border: 1px dashed #fbbf24;
}

/* Sizes */
.size-sm {
  padding: 0.75rem;
  gap: 0.5rem;
}

.size-md {
  padding: 1rem;
  gap: 0.75rem;
}

.size-lg {
  padding: 1.5rem;
  gap: 1rem;
}

.size-xl {
  padding: 2rem;
  gap: 1.5rem;
}

/* Responsive */
@media (max-width: 640px) {
  .wallet-balance-container {
    padding: 1rem;
  }
  
  .variant-detailed {
    padding: 1.25rem;
  }
}
</style>

