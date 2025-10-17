<script setup lang="ts">
interface Props {
  /** Page actuelle */
  currentPage: number
  /** Total de pages */
  totalPages: number
  /** Afficher les boutons first/last */
  showFirstLast?: boolean
  /** Nombre de pages à afficher */
  maxPages?: number
}

const props = withDefaults(defineProps<Props>(), {
  showFirstLast: true,
  maxPages: 7
})

const emit = defineEmits<{
  'update:currentPage': [page: number]
  'change': [page: number]
}>()

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
    emit('change', page)
  }
}

const visiblePages = computed(() => {
  const pages: number[] = []
  const half = Math.floor(props.maxPages / 2)
  
  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(props.totalPages, start + props.maxPages - 1)
  
  if (end - start < props.maxPages - 1) {
    start = Math.max(1, end - props.maxPages + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})
</script>

<template>
  <div class="table-pagination">
    <button
      v-if="showFirstLast"
      class="pagination-button"
      :disabled="currentPage === 1"
      @click="goToPage(1)"
      aria-label="Première page"
    >
      <UIcon name="i-heroicons-chevron-double-left" class="w-4 h-4" />
    </button>
    
    <button
      class="pagination-button"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
      aria-label="Page précédente"
    >
      <UIcon name="i-heroicons-chevron-left" class="w-4 h-4" />
    </button>
    
    <button
      v-for="page in visiblePages"
      :key="page"
      :class="[
        'pagination-page',
        { 'page-active': page === currentPage }
      ]"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>
    
    <button
      class="pagination-button"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
      aria-label="Page suivante"
    >
      <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
    </button>
    
    <button
      v-if="showFirstLast"
      class="pagination-button"
      :disabled="currentPage === totalPages"
      @click="goToPage(totalPages)"
      aria-label="Dernière page"
    >
      <UIcon name="i-heroicons-chevron-double-right" class="w-4 h-4" />
    </button>
  </div>
</template>

<style scoped>
.table-pagination {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-button,
.pagination-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-button:hover:not(:disabled),
.pagination-page:hover:not(.page-active) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-active {
  background: #77F07F;
  border-color: #77F07F;
  color: white;
  cursor: default;
}
</style>

