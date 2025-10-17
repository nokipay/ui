<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  /** Texte du tooltip */
  text?: string
  /** Placement */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** Délai d'apparition (ms) */
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
  delay: 200
})

const isVisible = ref(false)
let timeout: ReturnType<typeof setTimeout> | null = null

const show = () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    isVisible.value = true
  }, props.delay)
}

const hide = () => {
  if (timeout) clearTimeout(timeout)
  isVisible.value = false
}
</script>

<template>
  <div 
    class="tooltip-container"
    @mouseenter="show"
    @mouseleave="hide"
    @focus="show"
    @blur="hide"
  >
    <slot />
    
    <Transition name="tooltip">
      <div 
        v-if="isVisible"
        :class="['tooltip', `tooltip-${placement}`]"
        role="tooltip"
      >
        <slot name="content">{{ text }}</slot>
        <div :class="['tooltip-arrow', `arrow-${placement}`]" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  z-index: 1500;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: white;
  background: #1f2937;
  border-radius: 0.375rem;
  white-space: nowrap;
  pointer-events: none;
}

/* Placements */
.tooltip-top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.tooltip-bottom {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.tooltip-left {
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

.tooltip-right {
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

/* Arrow */
.tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #1f2937;
  transform: rotate(45deg);
}

.arrow-top {
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.arrow-bottom {
  top: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.arrow-left {
  right: -4px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.arrow-right {
  left: -4px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

/* Animations */
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}
</style>

