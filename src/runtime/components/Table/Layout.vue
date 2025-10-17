<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  icon?: string
  searchPlaceholder?: string
  totalCount?: number
  totalLabel?: string
  showCreateButton?: boolean
  createButtonLabel?: string
  createButtonIcon?: string
  createButtonColor?: string
  showSearch?: boolean
  showElementByPage?: boolean
  showPagination?: boolean
  showPaginationInfo?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: '',
  icon: 'i-heroicons-table-cells',
  searchPlaceholder: 'Rechercher...',
  totalCount: 0,
  totalLabel: '',
  showCreateButton: false,
  createButtonLabel: 'Créer',
  createButtonIcon: 'i-heroicons-plus',
  createButtonColor: 'primary',
  showSearch: true,
  showElementByPage: true,
  showPagination: true,
  showPaginationInfo: true,
})

const emit = defineEmits<{
  create: []
}>()

// Models réactifs
const searchQuery = defineModel<string>('searchQuery', { default: '' })
const page = defineModel<number>('page', { default: 1 })
const pageCount = defineModel<number>('pageCount', { default: 10 })
</script>

<template>
  <div class="min-h-screen">
    <!-- Header avec titre, sous-titre, actions -->
    <div class="mb-6">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <UIcon v-if="icon" :name="icon" class="w-8 h-8 text-gray-700" />
          <div>
            <h1 class="text-3xl font-bold text-gray-800">{{ title }}</h1>
            <p v-if="subtitle" class="text-sm text-gray-600 mt-1">{{ subtitle }}</p>
          </div>
        </div>

        <!-- Actions header (create button + custom actions) -->
        <div class="flex items-center gap-3">
          <slot name="header-actions">
            <UButton
              v-if="showCreateButton"
              :icon="createButtonIcon"
              :label="createButtonLabel"
              :color="createButtonColor"
              size="lg"
              @click="emit('create')"
            />
          </slot>
        </div>
      </div>
    </div>

    <!-- Carte principale du tableau -->
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <!-- Barre de contrôles (search + elements per page) -->
      <div class="bg-white border-b border-gray-200 py-4 px-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <!-- Elements per page -->
          <div v-if="showElementByPage" class="flex items-center space-x-2">
            <TableElementByPage v-model="pageCount" class="bg-white rounded-lg" />
          </div>

          <!-- Slot pour filtres custom dans header-actions -->

          <!-- Search -->
          <div v-if="showSearch" class="relative w-full sm:w-96">
            <UInput
              v-model="searchQuery"
              :placeholder="searchPlaceholder"
              icon="i-heroicons-magnifying-glass"
              size="md"
              class="rounded-full shadow-sm"
            />
          </div>
        </div>
      </div>

      <!-- Zone tableau (slot) -->
      <div class="overflow-x-auto">
        <slot name="table" :search-query="searchQuery" :page="page" :page-count="pageCount" />
      </div>

      <!-- Footer avec pagination -->
      <div
        class="bg-white border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <!-- Pagination info -->
        <div v-if="showPaginationInfo">
          <slot name="pagination-info">
            <TablePaginationInfo
              :page="page"
              :page-count="pageCount"
              :length="totalCount"
              :title="totalLabel"
              class="text-sm text-gray-600 font-medium"
            />
          </slot>
        </div>

        <!-- Pagination -->
        <div v-if="showPagination && totalCount > 0">
          <slot name="pagination">
            <UPagination v-model="page" :page-count="pageCount" :total="totalCount" size="sm" />
          </slot>
        </div>
      </div>
    </div>

    <!-- Slot pour modals -->
    <slot name="modals" />
  </div>
</template>
