<script setup lang="ts">
interface Props {
  /** Terme de recherche */
  searchTerm?: string
  /** Message personnalisé */
  message?: string
}

const props = defineProps<Props>()

const defaultMessage = computed(() => {
  if (props.searchTerm) {
    return `Aucun résultat pour "${props.searchTerm}"`
  }
  return 'Aucun résultat trouvé'
})
</script>

<template>
  <div class="no-results">
    <div class="no-results-icon">
      <UIcon name="i-heroicons-magnifying-glass" class="w-16 h-16 text-gray-400" />
    </div>
    
    <h3 class="no-results-title">
      {{ message || defaultMessage }}
    </h3>
    
    <p class="no-results-hint">
      <slot name="hint">
        Essayez de modifier vos critères de recherche
      </slot>
    </p>
    
    <div v-if="$slots.action" class="no-results-action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
}

.no-results-icon {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-results-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.no-results-hint {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  max-width: 24rem;
}

.no-results-action {
  margin-top: 0.5rem;
}
</style>

