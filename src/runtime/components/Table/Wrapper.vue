<script setup lang="ts">
const { t } = useTranslations();

const props = defineProps({
  searchQuery: { type: String, default: '' },
  page: { type: Number, default: 1 },
  pageCount: { type: Number, default: 10 },
  totalCount: { type: Number, default: 0 },
  totalLabel: { type: String, default: '' },
  searchPlaceholder: { type: String, default: 'Rechercher...' },
});

const emit = defineEmits(['update:searchQuery', 'update:page', 'update:pageCount']);

function updateSearchQuery(val: string) {
  emit('update:searchQuery', val);
}
function updatePage(val: number) {
  emit('update:page', val);
}
function updatePageCount(val: number) {
  emit('update:pageCount', val);
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-xl border border-gray-100">
    <slot name="header" />
    <div>
      <!-- Controls (search + pageCount) -->
      <div class="bg-white border-b border-gray-200 py-4 px-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div class="flex items-center space-x-2">
            <TableElementByPage
              v-model="props.pageCount"
              class="bg-white rounded-lg relative"
              @update:modelValue="updatePageCount"
            />
          </div>
          <div class="relative w-full sm:w-96">
            <UInput
              required
              class="rounded-full shadow-sm border-0 bg-white"
              :model-value="props.searchQuery"
              @update:modelValue="updateSearchQuery"
              icon="i-heroicons-magnifying-glass"
              :placeholder="props.searchPlaceholder || t('table.search')"
              size="md"
            />
          </div>
        </div>
      </div>
      <!-- Table -->
      <div class="overflow-x-auto">
        <slot name="table" />
      </div>
      <!-- Footer (pagination info + pagination) -->
      <div class="bg-white border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <TablePaginationInfo
          :page="props.page"
          :page-count="props.pageCount"
          :length="props.totalCount"
          :title="props.totalLabel"
          class="text-sm text-gray-600 font-medium"
        />
        <UPagination
          v-if="props.totalCount > 0"
          v-model="props.page"
          :page-count="props.pageCount"
          :total="props.totalCount"
          size="sm"
          @update:modelValue="updatePage"
        />
      </div>
    </div>
  </div>
</template>