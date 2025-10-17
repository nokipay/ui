<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Modal ouvert ou fermé */
  open?: boolean
  /** Titre du modal */
  title?: string
  /** Taille du modal */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Empêcher fermeture en cliquant outside */
  preventClose?: boolean
  /** Afficher bouton close */
  showClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  size: 'md',
  preventClose: false,
  showClose: true
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'close': []
}>()

const close = () => {
  if (!props.preventClose) {
    emit('update:open', false)
    emit('close')
  }
}

const handleOverlayClick = () => {
  if (!props.preventClose) {
    close()
  }
}

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full m-4'
  }
  return sizes[props.size]
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div 
        v-if="open"
        class="modal-overlay"
        @click="handleOverlayClick"
      >
        <Transition name="modal-slide">
          <div 
            v-if="open"
            :class="['modal-container', sizeClasses]"
            @click.stop
            role="dialog"
            aria-modal="true"
            :aria-labelledby="title ? 'modal-title' : undefined"
          >
            <!-- Header -->
            <div v-if="title || showClose || $slots.header" class="modal-header">
              <h3 v-if="title" id="modal-title" class="modal-title">
                <slot name="title">{{ title }}</slot>
              </h3>
              <slot name="header" />
              
              <button
                v-if="showClose"
                class="modal-close"
                @click="close"
                aria-label="Fermer"
              >
                <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
              </button>
            </div>
            
            <!-- Body -->
            <div class="modal-body">
              <slot />
            </div>
            
            <!-- Footer -->
            <div v-if="$slots.footer" class="modal-footer">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1300;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  width: 100%;
  max-height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  flex: 1;
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #f3f4f6;
  color: #111827;
}

.modal-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

/* Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 0.3s ease;
}

.modal-slide-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}

.modal-slide-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 640px) {
  .modal-container {
    margin: 0;
    border-radius: 0;
    max-height: 100vh;
  }
  
  .modal-overlay {
    padding: 0;
  }
}
</style>

