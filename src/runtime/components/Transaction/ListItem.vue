<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  type: string
  amount: number
  status: 'pending' | 'approved' | 'failed'
  date: string | Date
  icon: string
  transactionType: 'credit' | 'debit'
  currency?: string
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'FCFA',
})

const amountClass = computed(() => ({
  'text-green-600 dark:text-green-400': props.transactionType === 'credit',
  'text-red-600 dark:text-red-400': props.transactionType === 'debit',
}))

const statusConfig = computed(() => {
  const configs = {
    pending: {
      color: 'warning' as const,
      icon: 'i-heroicons-clock',
      label: 'En attente',
    },
    approved: {
      color: 'success' as const,
      icon: 'i-heroicons-check-circle',
      label: 'Réussi',
    },
    failed: {
      color: 'error' as const,
      icon: 'i-heroicons-x-circle',
      label: 'Échoué',
    },
  }
  return configs[props.status]
})

const formattedAmount = computed(() => {
  const sign = props.transactionType === 'credit' ? '+' : '-'
  const absAmount = Math.abs(props.amount)

  // Format pour les gros nombres (mobile style)
  if (absAmount >= 1000000000) {
    const billions = absAmount / 1000000000
    return `${sign}${billions.toFixed(1)}G ${props.currency}`
  } else if (absAmount >= 1000000) {
    const millions = absAmount / 1000000
    return `${sign}${millions.toFixed(1)}M ${props.currency}`
  } else if (absAmount >= 1000) {
    return `${sign}${absAmount.toLocaleString('fr-FR')} ${props.currency}`
  }

  return `${sign}${absAmount} ${props.currency}`
})

const formattedDate = computed(() => {
  const date = new Date(props.date)
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<template>
  <div
    class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer"
  >
    <!-- Left: Icon + Info -->
    <div class="flex items-center gap-4 flex-1 min-w-0">
      <div
        class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0"
      >
        <UIcon :name="icon" class="text-gray-800 dark:text-gray-200" size="24" />
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold text-gray-900 dark:text-gray-100 truncate">
          {{ title }}
        </h4>
        <p class="text-sm text-gray-600 dark:text-gray-400 truncate">{{ type }}</p>
      </div>
    </div>

    <!-- Right: Amount + Status + Date -->
    <div class="text-right flex-shrink-0 ml-4">
      <p :class="amountClass" class="font-bold text-lg whitespace-nowrap">
        {{ formattedAmount }}
      </p>
      <UBadge :color="statusConfig.color" size="xs" class="mt-1" variant="soft">
        <UIcon :name="statusConfig.icon" size="10" class="mr-1" />
        {{ statusConfig.label }}
      </UBadge>
      <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {{ formattedDate }}
      </p>
    </div>
  </div>
</template>
