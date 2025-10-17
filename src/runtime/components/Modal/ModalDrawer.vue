<script setup lang="ts">
interface Props {
  /** Drawer ouvert */
  open?: boolean
  /** Titre */
  title?: string
  /** Position du drawer */
  side?: 'left' | 'right'
  /** Largeur */
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  side: 'right',
  width: '400px'
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'close': []
}>()

const close = () => {
  emit('update:open', false)
  emit('close')
}

const slideClass = computed(() => {
  return props.side === 'left' ? 'drawer-left' : 'drawer-right'
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div 
        v-if="open"
        class="drawer-overlay"
        @click="close"
      >
        <Transition :name="`drawer-slide-${side}`">
          <div 
            v-if="open"
            :class="['drawer-container', slideClass]"
            :style="{ width }"
            @click.stop
            role="dialog"
            aria-modal="true"
          >
            <!-- Header -->
            <div class="drawer-header">
              <h3 v-if="title" class="drawer-title">
                {{ title }}
              </h3>
              <slot name="header" />
              
              <button
                class="drawer-close"
                @click="close"
                aria-label="Fermer"
              >
                <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
              </button>
            </div>
            
            <!-- Body -->
            <div class="drawer-body">
              <slot />
            </div>
            
            <!-- Footer -->
            <div v-if="$slots.footer" class="drawer-footer">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1300;
}

.drawer-container {
  position: fixed;
  top: 0;
  bottom: 0;
  background: white;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.drawer-left {
  left: 0;
}

.drawer-right {
  right: 0;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.drawer-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  flex: 1;
}

.drawer-close {
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

.drawer-close:hover {
  background: #f3f4f6;
  color: #111827;
}

.drawer-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.drawer-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
}

/* Animations */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-left-enter-active,
.drawer-slide-left-leave-active,
.drawer-slide-right-enter-active,
.drawer-slide-right-leave-active {
  transition: transform 0.3s ease;
}

.drawer-slide-left-enter-from {
  transform: translateX(-100%);
}

.drawer-slide-left-leave-to {
  transform: translateX(-100%);
}

.drawer-slide-right-enter-from {
  transform: translateX(100%);
}

.drawer-slide-right-leave-to {
  transform: translateX(100%);
}
</style>

