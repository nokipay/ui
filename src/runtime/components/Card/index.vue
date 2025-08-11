<script setup lang='ts'>
interface CardProps {
    title: string
    number: number
    icon: string
}

const props = defineProps<CardProps>()
const { formatNumber } = useCurrencyFormat();
</script>

<template>
    <div>
        <div
            class="flex flex-col h-full rounded-xl bg-white hover:translate-y-[-5px] transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden">
            <div class="bg-gray-900 h-2"></div>
            <div class="flex grow items-center justify-between p-6 relative">
                <div class="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full"></div>
                <div>
                    <h3 class="text-sm font-medium text-gray-500 mb-1">
                        {{ title }}
                    </h3>
                    <p class="text-2xl font-bold text-gray-800">
                        <span v-if="number >= 12345678" :title="formatNumber(number) + ' XAF'" class="cursor-help">
                        {{ formatNumber(number, { compact: true }) }} FCFA
                    </span>
                    <span v-else>
                        {{ formatNumber(number) }} FCFA
                    </span>
                    </p>
                </div>
                <div class="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center">
                    <UIcon :name="icon" class="w-7 h-7 text-primary" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped></style>