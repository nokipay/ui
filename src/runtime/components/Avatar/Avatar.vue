<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** URL de l'image */
  src?: string
  /** Texte alternatif */
  alt?: string
  /** Taille */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Initiales (si pas d'image) */
  initials?: string
  /** Couleur de fond (pour initiales) */
  color?: 'primary' | 'secondary' | 'gray' | 'random'
  /** Forme */
  shape?: 'circle' | 'square'
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Avatar',
  size: 'md',
  shape: 'circle',
  color: 'primary'
})

const sizeClasses = computed(() => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-24 h-24 text-2xl'
  }
  return sizes[props.size]
})

const shapeClass = computed(() => {
  return props.shape === 'circle' ? 'rounded-full' : 'rounded-lg'
})

const bgColorClass = computed(() => {
  if (props.src) return ''
  
  const colors = {
    primary: 'bg-nxGreen-500 text-white',
    secondary: 'bg-nxTeal-500 text-white',
    gray: 'bg-gray-500 text-white',
    random: generateRandomColor()
  }
  return colors[props.color]
})

const generateRandomColor = () => {
  const colors = [
    'bg-blue-500 text-white',
    'bg-purple-500 text-white',
    'bg-pink-500 text-white',
    'bg-orange-500 text-white',
    'bg-teal-500 text-white'
  ]
  const hash = (props.initials || props.alt).split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  return colors[Math.abs(hash) % colors.length]
}

const displayInitials = computed(() => {
  if (props.initials) return props.initials
  if (props.alt) {
    return props.alt
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }
  return '?'
})
</script>

<template>
  <div 
    :class="['avatar', sizeClasses, shapeClass, bgColorClass]"
    :title="alt"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="avatar-image"
    />
    
    <span v-else class="avatar-initials">
      {{ displayInitials }}
    </span>
  </div>
</template>

<style scoped>
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: 600;
  overflow: hidden;
  position: relative;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-initials {
  user-select: none;
}
</style>

