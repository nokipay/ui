<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Valeur actuelle (0-100) */
  value: number
  /** Valeur maximum */
  max?: number
  /** Afficher le pourcentage */
  showPercentage?: boolean
  /** Taille */
  size?: 'sm' | 'md' | 'lg'
  /** Couleur */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  /** Indeterminate (animation infinie) */
  indeterminate?: boolean
  /** Label */
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  showPercentage: false,
  size: 'md',
  color: 'primary',
  indeterminate: false
})

const percentage = computed(() => {
  if (props.indeterminate) return 100
  return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }
  return sizes[props.size]
})

const colorClasses = computed(() => {
  const colors = {
    primary: 'bg-nxGreen-500',
    secondary: 'bg-nxTeal-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  }
  return colors[props.color]
})
</script>

<template>
  <div class="progress-bar-container">
    <div v-if="label" class="progress-bar-header">
      <span class="progress-label">{{ label }}</span>
      <span v-if="showPercentage && !indeterminate" class="progress-percentage">
        {{ Math.round(percentage) }}%
      </span>
    </div>
    
    <div 
      :class="['progress-bar-track', sizeClasses]"
      role="progressbar"
      :aria-valuenow="indeterminate ? undefined : value"
      :aria-valuemin="0"
      :aria-valuemax="max"
      :aria-label="label || 'Progression'"
    >
      <div 
        :class="[
          'progress-bar-fill',
          colorClasses,
          indeterminate ? 'progress-indeterminate' : ''
        ]"
        :style="{ 
          width: indeterminate ? '30%' : `${percentage}%`,
          transition: indeterminate ? 'none' : 'width 0.3s ease'
        }"
      />
    </div>
    
    <div 
      v-if="showPercentage && !label && !indeterminate" 
      class="progress-percentage-center"
    >
      {{ Math.round(percentage) }}%
    </div>
  </div>
</template>

<style scoped>
.progress-bar-container {
  width: 100%;
}

.progress-bar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.progress-percentage {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
}

.progress-percentage-center {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  margin-top: 0.25rem;
}

.progress-bar-track {
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 9999px;
  transition: width 0.3s ease;
}

/* Indeterminate animation */
.progress-indeterminate {
  animation: progress-indeterminate 1.5s ease-in-out infinite;
}

@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(300%);
  }
}
</style>

