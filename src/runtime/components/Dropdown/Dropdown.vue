<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  /** Items du dropdown */
  items?: Array<{
    label: string
    value: string | number
    icon?: string
    disabled?: boolean
    divider?: boolean
  }>
  /** Placement du dropdown */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  /** Désactivé */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  placement: 'bottom-start',
  disabled: false
})

const emit = defineEmits<{
  'select': [value: string | number]
}>()

const isOpen = ref(false)

const toggle = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const close = () => {
  isOpen.value = false
}

const selectItem = (item: any) => {
  if (!item.disabled && !item.divider) {
    emit('select', item.value)
    close()
  }
}

// Fermer au clic outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (isOpen.value && !target.closest('.dropdown-container')) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="dropdown-container">
    <div 
      class="dropdown-trigger"
      :class="{ 'disabled': disabled }"
      @click="toggle"
    >
      <slot name="trigger" :is-open="isOpen" :toggle="toggle" />
    </div>
    
    <Transition name="dropdown">
      <div 
        v-if="isOpen"
        :class="['dropdown-menu', `placement-${placement}`]"
      >
        <div 
          v-for="(item, index) in items"
          :key="index"
          :class="[
            'dropdown-item',
            { 
              'dropdown-divider': item.divider,
              'dropdown-item-disabled': item.disabled
            }
          ]"
          @click="selectItem(item)"
        >
          <UIcon v-if="item.icon && !item.divider" :name="item.icon" class="w-4 h-4" />
          <span v-if="!item.divider">{{ item.label }}</span>
        </div>
        
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  cursor: pointer;
}

.dropdown-trigger.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dropdown-menu {
  position: absolute;
  z-index: 1000;
  min-width: 10rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  padding: 0.5rem 0;
  margin-top: 0.5rem;
}

.placement-bottom-start {
  top: 100%;
  left: 0;
}

.placement-bottom-end {
  top: 100%;
  right: 0;
}

.placement-top-start {
  bottom: 100%;
  left: 0;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.placement-top-end {
  bottom: 100%;
  right: 0;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover:not(.dropdown-item-disabled):not(.dropdown-divider) {
  background-color: #f3f4f6;
}

.dropdown-item-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dropdown-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 0.5rem 0;
  padding: 0;
  cursor: default;
}

/* Animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

