<script setup lang="ts">
interface Props {
  /** Icône à afficher */
  icon?: string
  /** Titre */
  title?: string
  /** Description */
  description?: string
  /** Taille */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'i-heroicons-inbox',
  title: 'Aucune donnée',
  description: 'Il n\'y a aucune donnée à afficher pour le moment.',
  size: 'md'
})

const iconSizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-24 h-24'
}

const titleSizeClasses = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl'
}

const descSizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base'
}
</script>

<template>
  <div :class="['empty-state', `size-${size}`]">
    <div class="empty-icon-wrapper">
      <UIcon 
        v-if="icon"
        :name="icon" 
        :class="iconSizeClasses[size]"
        class="text-gray-400"
      />
      <slot name="icon" />
    </div>
    
    <div class="empty-content">
      <h3 :class="['empty-title', titleSizeClasses[size]]">
        <slot name="title">{{ title }}</slot>
      </h3>
      
      <p :class="['empty-description', descSizeClasses[size]]">
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
    
    <div v-if="$slots.action" class="empty-action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1.5rem;
}

.size-sm {
  padding: 2rem 1rem;
}

.size-lg {
  padding: 4rem 2rem;
}

.empty-icon-wrapper {
  margin-bottom: 1rem;
}

.empty-content {
  max-width: 28rem;
  margin-bottom: 1.5rem;
}

.empty-title {
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.empty-description {
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.empty-action {
  margin-top: 0.5rem;
}
</style>

