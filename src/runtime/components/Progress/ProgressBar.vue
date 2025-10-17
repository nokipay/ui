<script setup lang="ts">
import { computed } from 'vue'

type Color = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'gray'
type Size = 'xs' | 'sm' | 'md' | 'lg'

interface Props {
  /** Valeur actuelle (0-100) */
  value: number
  /** Valeur maximale */
  max?: number
  /** Couleur de la barre */
  color?: Color
  /** Taille de la barre */
  size?: Size
  /** Afficher le label */
  showLabel?: boolean
  /** Label personnalisé */
  label?: string
  /** Afficher le pourcentage */
  showPercentage?: boolean
  /** Animation */
  animated?: boolean
  /** Striped */
  striped?: boolean
  /** Indeterminate (chargement) */
  indeterminate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  color: 'primary',
  size: 'md',
  showLabel: false,
  showPercentage: false,
  animated: false,
  striped: false,
  indeterminate: false,
})

const percentage = computed(() => {
  if (props.indeterminate) return 100
  return Math.min(Math.max((props.value / props.max) * 100, 0), 100)
})

const colorClasses = computed(() => {
  const colors = {
    primary: 'bg-nxGreen-500',
    secondary: 'bg-nxTeal-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
    gray: 'bg-gray-500',
  }
  return colors[props.color]
})

const sizeClasses = computed(() => {
  const sizes = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }
  return sizes[props.size]
})

const barClasses = computed(() => [
  'transition-all duration-300 ease-in-out rounded-full',
  colorClasses.value,
  props.striped && 'progress-striped',
  props.animated && 'progress-animated',
  props.indeterminate && 'progress-indeterminate',
])
</script>

<template>
  <div class="progress-container">
    <div
      v-if="showLabel || $slots.label"
      class="flex items-center justify-between mb-2"
    >
      <span class="text-sm font-medium text-gray-700">
        <slot name="label">{{ label }}</slot>
      </span>
      
      <span
        v-if="showPercentage"
        class="text-sm font-medium text-gray-500"
      >
        {{ Math.round(percentage) }}%
      </span>
    </div>
    
    <div
      :class="[
        'w-full bg-gray-200 rounded-full overflow-hidden',
        sizeClasses
      ]"
    >
      <div
        :class="barClasses"
        :style="{ width: indeterminate ? '100%' : `${percentage}%` }"
        role="progressbar"
        :aria-valuenow="value"
        :aria-valuemin="0"
        :aria-valuemax="max"
      />
    </div>
  </div>
</template>

<style scoped>
.progress-container {
  width: 100%;
}

.progress-striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.progress-animated {
  animation: progress-stripes 1s linear infinite;
}

.progress-indeterminate {
  animation: progress-indeterminate 1.5s ease-in-out infinite;
}

@keyframes progress-stripes {
  0% {
    background-position: 1rem 0;
  }
  100% {
    background-position: 0 0;
  }
}

@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>

