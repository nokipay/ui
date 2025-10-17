<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Taille du spinner */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Couleur du spinner */
  color?: 'primary' | 'secondary' | 'white' | 'gray' | 'current'
  /** Texte de chargement */
  label?: string
  /** Position du label */
  labelPosition?: 'bottom' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  labelPosition: 'bottom'
})

const sizeClasses = computed(() => {
  const sizes = {
    xs: 'w-4 h-4 border-2',
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
    '2xl': 'w-24 h-24 border-4'
  }
  return sizes[props.size]
})

const colorClasses = computed(() => {
  const colors = {
    primary: 'border-nxGreen-200 border-t-nxGreen-500',
    secondary: 'border-nxTeal-200 border-t-nxTeal-500',
    white: 'border-gray-200 border-t-white',
    gray: 'border-gray-300 border-t-gray-600',
    current: 'border-current/20 border-t-current'
  }
  return colors[props.color]
})

const containerClasses = computed(() => [
  'noki-spinner',
  props.label ? `spinner-with-label label-${props.labelPosition}` : ''
])
</script>

<template>
  <div :class="containerClasses">
    <div 
      :class="['spinner', sizeClasses, colorClasses]"
      role="status"
      aria-label="Loading"
    >
      <span class="sr-only">Chargement...</span>
    </div>
    
    <p v-if="label" class="spinner-label">
      {{ label }}
    </p>
  </div>
</template>

<style scoped>
.noki-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.spinner-with-label {
  gap: 0.75rem;
}

.label-bottom {
  flex-direction: column;
}

.label-right {
  flex-direction: row;
}

.spinner {
  border-radius: 50%;
  border-style: solid;
  animation: spin 0.8s linear infinite;
}

.spinner-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>

