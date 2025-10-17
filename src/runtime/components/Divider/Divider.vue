<script setup lang="ts">
import { computed } from 'vue'

type Orientation = 'horizontal' | 'vertical'
type LabelPosition = 'left' | 'center' | 'right'

interface Props {
  /** Orientation du divider */
  orientation?: Orientation
  /** Texte du label */
  label?: string
  /** Position du label */
  labelPosition?: LabelPosition
  /** Couleur personnalisée */
  color?: string
  /** Épaisseur */
  thickness?: number
  /** Hauteur (pour vertical) */
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  labelPosition: 'center',
  color: '#e5e7eb',
  thickness: 1,
  height: '100%',
})

const dividerStyles = computed(() => {
  if (props.orientation === 'vertical') {
    return {
      width: `${props.thickness}px`,
      height: props.height,
      backgroundColor: props.color,
    }
  }
  
  return {
    height: `${props.thickness}px`,
    backgroundColor: props.color,
  }
})

const containerClasses = computed(() => {
  if (props.orientation === 'vertical') {
    return 'inline-flex items-center'
  }
  
  return 'flex items-center w-full'
})

const labelClasses = computed(() => {
  const base = 'text-sm text-gray-500 font-medium'
  
  if (props.orientation === 'horizontal') {
    return `${base} px-4 whitespace-nowrap`
  }
  
  return `${base} py-4 whitespace-nowrap`
})
</script>

<template>
  <div :class="containerClasses">
    <!-- Horizontal avec label -->
    <template v-if="orientation === 'horizontal' && (label || $slots.default)">
      <div
        v-if="labelPosition !== 'left'"
        class="flex-1"
        :style="dividerStyles"
      />
      
      <div :class="labelClasses">
        <slot>{{ label }}</slot>
      </div>
      
      <div
        v-if="labelPosition !== 'right'"
        class="flex-1"
        :style="dividerStyles"
      />
    </template>
    
    <!-- Horizontal sans label -->
    <div
      v-else-if="orientation === 'horizontal'"
      class="w-full"
      :style="dividerStyles"
    />
    
    <!-- Vertical avec label -->
    <template v-else-if="orientation === 'vertical' && (label || $slots.default)">
      <div
        v-if="labelPosition !== 'left'"
        class="flex-1"
        :style="dividerStyles"
      />
      
      <div :class="labelClasses">
        <slot>{{ label }}</slot>
      </div>
      
      <div
        v-if="labelPosition !== 'right'"
        class="flex-1"
        :style="dividerStyles"
      />
    </template>
    
    <!-- Vertical sans label -->
    <div
      v-else
      :style="dividerStyles"
    />
  </div>
</template>

