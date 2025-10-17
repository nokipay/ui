<script setup lang="ts">
import { inject, computed, type Ref } from 'vue'

interface Props {
  /** Valeur du panel (doit correspondre à un tab) */
  value: string | number
  /** Lazy loading (ne render que si actif) */
  lazy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  lazy: false
})

const activeTab = inject<Ref<string | number>>('activeTab')

const isActive = computed(() => {
  return activeTab?.value === props.value
})

const shouldRender = computed(() => {
  if (!props.lazy) return true
  return isActive.value
})
</script>

<template>
  <div 
    v-if="shouldRender"
    v-show="isActive"
    class="tab-panel"
    role="tabpanel"
    :aria-hidden="!isActive"
  >
    <slot />
  </div>
</template>

<style scoped>
.tab-panel {
  width: 100%;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

