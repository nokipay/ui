<script setup lang="ts">
const { t } = useTranslations();
const pageCount = defineModel<string | number>()

const options = ["5", "10", "15", "20", "25", "50", "100"]
</script>

<template>
    <div class="flex items-center space-x-3">
        <USelectMenu v-model="pageCount" :options="options"
            class="rounded-full border-gray-200 bg-white shadow-sm" />

        <p class="text-xs text-gray-600 font-medium">{{ t('table.elementsPerPage') }}</p>
    </div>
</template>