<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'solid' | 'subtle' | 'outline' | 'soft'
type Color = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'gray'
type Size = 'xs' | 'sm' | 'md' | 'lg'

interface Props {
  /** Variante du badge */
  variant?: Variant
  /** Couleur du badge */
  color?: Color
  /** Taille du badge */
  size?: Size
  /** Afficher un point */
  dot?: boolean
  /** Badge arrondi */
  rounded?: boolean
  /** Icône à gauche */
  icon?: string
  /** Icône à droite */
  iconRight?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'solid',
  color: 'primary',
  size: 'md',
  dot: false,
  rounded: false,
})

const colorClasses = computed(() => {
  const colors = {
    solid: {
      primary: 'bg-nxGreen-500 text-white',
      secondary: 'bg-nxTeal-500 text-white',
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-yellow-500 text-white',
      info: 'bg-blue-500 text-white',
      gray: 'bg-gray-500 text-white',
    },
    subtle: {
      primary: 'bg-nxGreen-50 text-nxGreen-700 border border-nxGreen-200',
      secondary: 'bg-nxTeal-50 text-nxTeal-700 border border-nxTeal-200',
      success: 'bg-green-50 text-green-700 border border-green-200',
      error: 'bg-red-50 text-red-700 border border-red-200',
      warning: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
      info: 'bg-blue-50 text-blue-700 border border-blue-200',
      gray: 'bg-gray-50 text-gray-700 border border-gray-200',
    },
    outline: {
      primary: 'bg-transparent text-nxGreen-600 border-2 border-nxGreen-500',
      secondary: 'bg-transparent text-nxTeal-600 border-2 border-nxTeal-500',
      success: 'bg-transparent text-green-600 border-2 border-green-500',
      error: 'bg-transparent text-red-600 border-2 border-red-500',
      warning: 'bg-transparent text-yellow-600 border-2 border-yellow-500',
      info: 'bg-transparent text-blue-600 border-2 border-blue-500',
      gray: 'bg-transparent text-gray-600 border-2 border-gray-500',
    },
    soft: {
      primary: 'bg-nxGreen-100 text-nxGreen-800',
      secondary: 'bg-nxTeal-100 text-nxTeal-800',
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800',
      gray: 'bg-gray-100 text-gray-800',
    },
  }
  
  return colors[props.variant][props.color]
})

const sizeClasses = computed(() => {
  const sizes = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  }
  return sizes[props.size]
})

const dotColorClasses = computed(() => {
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

const badgeClasses = computed(() => [
  'inline-flex items-center gap-1.5 font-medium transition-all',
  colorClasses.value,
  sizeClasses.value,
  props.rounded ? 'rounded-full' : 'rounded-md',
])
</script>

<template>
  <span :class="badgeClasses">
    <span
      v-if="dot"
      :class="[
        'w-1.5 h-1.5 rounded-full',
        dotColorClasses
      ]"
    />
    
    <UIcon
      v-if="icon"
      :name="icon"
      :class="[
        size === 'xs' ? 'w-3 h-3' :
        size === 'sm' ? 'w-3.5 h-3.5' :
        size === 'md' ? 'w-4 h-4' :
        'w-5 h-5'
      ]"
    />
    
    <slot />
    
    <UIcon
      v-if="iconRight"
      :name="iconRight"
      :class="[
        size === 'xs' ? 'w-3 h-3' :
        size === 'sm' ? 'w-3.5 h-3.5' :
        size === 'md' ? 'w-4 h-4' :
        'w-5 h-5'
      ]"
    />
  </span>
</template>

