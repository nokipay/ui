<script setup lang="ts">
interface Props {
  /** Type d'alerte */
  type?: 'info' | 'success' | 'warning' | 'error'
  /** Message */
  message?: string
  /** Afficher l'icône */
  showIcon?: boolean
  /** Closable */
  closable?: boolean
  /** Position fixe en haut */
  fixed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  showIcon: true,
  closable: true,
  fixed: false
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
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      iconColor: 'text-blue-500',
      textColor: 'text-blue-900'
    },
    success: {
      icon: 'i-heroicons-check-circle',
      bg: 'bg-green-50',
      border: 'border-green-200',
      iconColor: 'text-green-500',
      textColor: 'text-green-900'
    },
    warning: {
      icon: 'i-heroicons-exclamation-triangle',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      iconColor: 'text-yellow-500',
      textColor: 'text-yellow-900'
    },
    error: {
      icon: 'i-heroicons-x-circle',
      bg: 'bg-red-50',
      border: 'border-red-200',
      iconColor: 'text-red-500',
      textColor: 'text-red-900'
    }
  }
  return configs[props.type]
})
</script>

<template>
  <Transition name="banner">
    <div 
      v-if="isVisible"
      :class="[
        'alert-banner',
        typeConfig.bg,
        'border-b',
        typeConfig.border,
        { 'banner-fixed': fixed }
      ]"
      role="alert"
    >
      <div class="banner-content">
        <div class="banner-message">
          <UIcon 
            v-if="showIcon"
            :name="typeConfig.icon"
            :class="['banner-icon', typeConfig.iconColor]"
          />
          
          <p :class="['banner-text', typeConfig.textColor]">
            <slot>{{ message }}</slot>
          </p>
        </div>
        
        <button
          v-if="closable"
          class="banner-close"
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
.alert-banner {
  width: 100%;
}

.banner-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;
}

.banner-content {
  max-width: 80rem;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.banner-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.banner-icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
}

.banner-text {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
}

.banner-close {
  flex-shrink: 0;
  border: none;
  background: transparent;
  color: currentColor;
  opacity: 0.6;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.banner-close:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.05);
}

/* Animations */
.banner-enter-active,
.banner-leave-active {
  transition: all 0.3s ease;
}

.banner-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.banner-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>

