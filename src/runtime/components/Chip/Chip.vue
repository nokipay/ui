<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'filled' | 'outlined' | 'light'
type Color = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'gray'
type Size = 'sm' | 'md' | 'lg'

interface Props {
  /** Variante du chip */
  variant?: Variant
  /** Couleur du chip */
  color?: Color
  /** Taille du chip */
  size?: Size
  /** Icône à gauche */
  icon?: string
  /** Avatar (URL) */
  avatar?: string
  /** Closable */
  closable?: boolean
  /** Disabled */
  disabled?: boolean
  /** Clickable */
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  color: 'primary',
  size: 'md',
  closable: false,
  disabled: false,
  clickable: false,
})

const emit = defineEmits<{
  'click': []
  'close': []
}>()

const colorClasses = computed(() => {
  const colors = {
    filled: {
      primary: 'bg-nxGreen-500 text-white',
      secondary: 'bg-nxTeal-500 text-white',
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-yellow-500 text-white',
      info: 'bg-blue-500 text-white',
      gray: 'bg-gray-500 text-white',
    },
    outlined: {
      primary: 'bg-transparent text-nxGreen-600 border-2 border-nxGreen-500',
      secondary: 'bg-transparent text-nxTeal-600 border-2 border-nxTeal-500',
      success: 'bg-transparent text-green-600 border-2 border-green-500',
      error: 'bg-transparent text-red-600 border-2 border-red-500',
      warning: 'bg-transparent text-yellow-600 border-2 border-yellow-500',
      info: 'bg-transparent text-blue-600 border-2 border-blue-500',
      gray: 'bg-transparent text-gray-600 border-2 border-gray-500',
    },
    light: {
      primary: 'bg-nxGreen-50 text-nxGreen-700',
      secondary: 'bg-nxTeal-50 text-nxTeal-700',
      success: 'bg-green-50 text-green-700',
      error: 'bg-red-50 text-red-700',
      warning: 'bg-yellow-50 text-yellow-700',
      info: 'bg-blue-50 text-blue-700',
      gray: 'bg-gray-50 text-gray-700',
    },
  }
  
  return colors[props.variant][props.color]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  }
  return sizes[props.size]
})

const chipClasses = computed(() => [
  'inline-flex items-center font-medium rounded-full transition-all',
  colorClasses.value,
  sizeClasses.value,
  {
    'opacity-50 cursor-not-allowed': props.disabled,
    'cursor-pointer hover:opacity-80': props.clickable && !props.disabled,
  },
])

const handleClick = () => {
  if (!props.disabled && props.clickable) {
    emit('click')
  }
}

const handleClose = (e: Event) => {
  e.stopPropagation()
  if (!props.disabled) {
    emit('close')
  }
}
</script>

<template>
  <span
    :class="chipClasses"
    @click="handleClick"
  >
    <img
      v-if="avatar"
      :src="avatar"
      :alt="'Avatar'"
      :class="[
        'rounded-full',
        size === 'sm' ? 'w-4 h-4' :
        size === 'md' ? 'w-5 h-5' :
        'w-6 h-6'
      ]"
    />
    
    <UIcon
      v-else-if="icon"
      :name="icon"
      :class="[
        size === 'sm' ? 'w-3.5 h-3.5' :
        size === 'md' ? 'w-4 h-4' :
        'w-5 h-5'
      ]"
    />
    
    <slot />
    
    <button
      v-if="closable"
      type="button"
      :class="[
        'ml-0.5 rounded-full hover:bg-black/10 transition-colors',
        size === 'sm' ? 'w-4 h-4' :
        size === 'md' ? 'w-5 h-5' :
        'w-6 h-6'
      ]"
      :disabled="disabled"
      @click="handleClose"
      aria-label="Fermer"
    >
      <UIcon
        name="i-heroicons-x-mark"
        :class="[
          size === 'sm' ? 'w-3 h-3' :
          size === 'md' ? 'w-3.5 h-3.5' :
          'w-4 h-4'
        ]"
      />
    </button>
  </span>
</template>

