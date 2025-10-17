<script setup lang="ts">
interface Props {
  /** Type d'alerte */
  type?: 'info' | 'success' | 'warning' | 'error'
  /** Titre */
  title?: string
  /** Description */
  description?: string
  /** Afficher l'icône */
  showIcon?: boolean
  /** Closable */
  closable?: boolean
  /** Variante */
  variant?: 'solid' | 'subtle' | 'outline'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  showIcon: true,
  closable: false,
  variant: 'subtle'
})

const emit = defineEmits<{
  'close': []
}>()

const isVisible = ref(true)

const handleClose = () => {
  isVisible.value = false
  emit('close')
}

const typeConfig = computed(() => {
  const configs = {
    info: {
      icon: 'i-heroicons-information-circle',
      solidBg: 'bg-blue-500',
      subtleBg: 'bg-blue-50',
      outlineBorder: 'border-blue-500',
      iconColor: 'text-blue-500',
      textColor: 'text-blue-900',
      descColor: 'text-blue-700'
    },
    success: {
      icon: 'i-heroicons-check-circle',
      solidBg: 'bg-green-500',
      subtleBg: 'bg-green-50',
      outlineBorder: 'border-green-500',
      iconColor: 'text-green-500',
      textColor: 'text-green-900',
      descColor: 'text-green-700'
    },
    warning: {
      icon: 'i-heroicons-exclamation-triangle',
      solidBg: 'bg-yellow-500',
      subtleBg: 'bg-yellow-50',
      outlineBorder: 'border-yellow-500',
      iconColor: 'text-yellow-500',
      textColor: 'text-yellow-900',
      descColor: 'text-yellow-700'
    },
    error: {
      icon: 'i-heroicons-x-circle',
      solidBg: 'bg-red-500',
      subtleBg: 'bg-red-50',
      outlineBorder: 'border-red-500',
      iconColor: 'text-red-500',
      textColor: 'text-red-900',
      descColor: 'text-red-700'
    }
  }
  return configs[props.type]
})

const alertClasses = computed(() => {
  const base = ['alert', `alert-${props.variant}`]
  
  if (props.variant === 'solid') {
    base.push(typeConfig.value.solidBg, 'text-white')
  } else if (props.variant === 'subtle') {
    base.push(typeConfig.value.subtleBg)
  } else if (props.variant === 'outline') {
    base.push('border-2', typeConfig.value.outlineBorder)
  }
  
  return base
})
</script>

<template>
  <Transition name="alert-fade">
    <div 
      v-if="isVisible"
      :class="alertClasses"
      role="alert"
    >
      <div class="alert-content">
        <UIcon 
          v-if="showIcon"
          :name="typeConfig.icon"
          class="alert-icon"
          :class="variant === 'solid' ? 'text-white' : typeConfig.iconColor"
        />
        
        <div class="alert-text">
          <p 
            v-if="title"
            class="alert-title"
            :class="variant === 'solid' ? 'text-white' : typeConfig.textColor"
          >
            <slot name="title">{{ title }}</slot>
          </p>
          
          <p 
            v-if="description || $slots.default"
            class="alert-description"
            :class="variant === 'solid' ? 'text-white/90' : typeConfig.descColor"
          >
            <slot>{{ description }}</slot>
          </p>
        </div>
        
        <button
          v-if="closable"
          class="alert-close"
          :class="variant === 'solid' ? 'text-white/80 hover:text-white' : 'text-gray-400 hover:text-gray-600'"
          @click="handleClose"
          aria-label="Fermer"
        >
          <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.alert {
  border-radius: 0.5rem;
  padding: 1rem;
}

.alert-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.alert-icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.125rem;
}

.alert-text {
  flex: 1;
  min-width: 0;
}

.alert-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.alert-description {
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

.alert-close {
  flex-shrink: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}

/* Animations */
.alert-fade-enter-active,
.alert-fade-leave-active {
  transition: all 0.3s ease;
}

.alert-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.alert-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

