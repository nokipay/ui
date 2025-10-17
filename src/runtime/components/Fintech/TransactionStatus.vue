<script setup lang="ts">
import { computed } from 'vue'

type TransactionStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED'

interface Props {
  /** Statut de la transaction */
  status: TransactionStatus
  /** Afficher l'icône */
  showIcon?: boolean
  /** Taille du badge */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  showIcon: true,
  size: 'md'
})

// Configuration par statut
const statusConfig = computed(() => {
  const configs: Record<TransactionStatus, { 
    color: string
    bgColor: string
    icon: string
    label: string
  }> = {
    PENDING: {
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100',
      icon: '⏳',
      label: 'En attente'
    },
    PROCESSING: {
      color: 'text-blue-700',
      bgColor: 'bg-blue-100',
      icon: '🔄',
      label: 'En cours'
    },
    COMPLETED: {
      color: 'text-green-700',
      bgColor: 'bg-green-100',
      icon: '✓',
      label: 'Complété'
    },
    FAILED: {
      color: 'text-red-700',
      bgColor: 'bg-red-100',
      icon: '✗',
      label: 'Échoué'
    },
    CANCELLED: {
      color: 'text-gray-700',
      bgColor: 'bg-gray-100',
      icon: '⊘',
      label: 'Annulé'
    },
    REFUNDED: {
      color: 'text-purple-700',
      bgColor: 'bg-purple-100',
      icon: '↩',
      label: 'Remboursé'
    }
  }
  
  return configs[props.status]
})

const badgeClasses = computed(() => [
  'transaction-status-badge',
  `badge-${props.size}`,
  statusConfig.value.color,
  statusConfig.value.bgColor
])
</script>

<template>
  <span :class="badgeClasses" :title="statusConfig.label">
    <span v-if="showIcon" class="badge-icon">
      {{ statusConfig.icon }}
    </span>
    <span class="badge-label">
      {{ statusConfig.label }}
    </span>
  </span>
</template>

<style scoped>
.transaction-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;
}

/* Sizes */
.badge-sm {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
}

.badge-md {
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
}

.badge-lg {
  font-size: 1rem;
  padding: 0.375rem 1rem;
}

.badge-icon {
  font-size: 1em;
  line-height: 1;
}

.badge-label {
  font-weight: 500;
}

/* Hover effect */
.transaction-status-badge:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>

