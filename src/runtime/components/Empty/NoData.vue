<script setup lang="ts">
interface Props {
  /** Message personnalisé */
  message?: string
  /** Afficher l'icône */
  showIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Aucune donnée disponible',
  showIcon: true
})
</script>

<template>
  <div class="no-data">
    <div v-if="showIcon" class="no-data-icon">
      <UIcon name="i-heroicons-document-text" class="w-12 h-12 text-gray-400" />
    </div>
    
    <p class="no-data-message">
      <slot>{{ message }}</slot>
    </p>
  </div>
</template>

<style scoped>
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-align: center;
}

.no-data-icon {
  margin-bottom: 1rem;
  opacity: 0.6;
}

.no-data-message {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}
</style>

