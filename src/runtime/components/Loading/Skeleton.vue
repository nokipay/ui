<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Largeur du skeleton */
  width?: string | number
  /** Hauteur du skeleton */
  height?: string | number
  /** Forme du skeleton */
  shape?: 'rect' | 'circle' | 'text'
  /** Nombre de lignes (pour shape text) */
  lines?: number
  /** Animation */
  animated?: boolean
  /** Variante */
  variant?: 'default' | 'wave' | 'pulse'
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '1rem',
  shape: 'rect',
  lines: 1,
  animated: true,
  variant: 'wave'
})

const widthStyle = computed(() => {
  return typeof props.width === 'number' ? `${props.width}px` : props.width
})

const heightStyle = computed(() => {
  return typeof props.height === 'number' ? `${props.height}px` : props.height
})

const shapeClasses = computed(() => {
  const shapes = {
    rect: 'rounded',
    circle: 'rounded-full',
    text: 'rounded'
  }
  return shapes[props.shape]
})

const skeletonClasses = computed(() => [
  'noki-skeleton',
  shapeClasses.value,
  props.animated ? `skeleton-${props.variant}` : '',
  props.shape === 'circle' ? 'aspect-square' : ''
])
</script>

<template>
  <div 
    v-if="shape === 'text' && lines > 1"
    class="skeleton-text-group"
    role="status"
    aria-label="Chargement du contenu"
  >
    <div
      v-for="i in lines"
      :key="i"
      :class="skeletonClasses"
      :style="{
        width: i === lines ? '60%' : widthStyle,
        height: heightStyle
      }"
    />
  </div>
  
  <div
    v-else
    :class="skeletonClasses"
    :style="{
      width: widthStyle,
      height: heightStyle
    }"
    role="status"
    aria-label="Chargement"
  >
    <span class="sr-only">Chargement...</span>
  </div>
</template>

<style scoped>
.noki-skeleton {
  background: linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%);
  background-size: 200% 100%;
  display: block;
}

.skeleton-text-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

/* Animations */
.skeleton-wave {
  animation: skeleton-wave 1.5s ease-in-out infinite;
}

.skeleton-pulse {
  animation: skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes skeleton-wave {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.aspect-square {
  aspect-ratio: 1 / 1;
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

