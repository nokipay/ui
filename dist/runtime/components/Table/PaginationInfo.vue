<script setup lang="ts">
interface PaginationInfoAttributes {
    page: number;
    pageCount: number;
    length?: number;
    title: string
}

defineProps<PaginationInfoAttributes>();
</script>

<template>
    <div>
        <span class="text-xs text-gray-600 font-medium">
            Affiche
            <span class="font-bold text-gray-800">{{ length === 0
                ? "0"
                : (page - 1) * pageCount + 1 }}</span>
            à
            <span class="font-bold text-gray-800">{{ Math.min(page * pageCount, Number(length)) }}</span>
            sur
            <span class="font-bold text-gray-800">{{ length }}</span>
            {{ title }}
        </span>
    </div>
</template>