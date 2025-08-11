<script setup lang='ts'>
import { useCurrencyFormat } from '../../composables/useCurrencyFormat';

interface CardProps {
    title: string;
    number: number;
    icon: string;
    currency?: 'FCFA' | 'USD' | 'EUR';
    showCompact?: boolean;
    compactThreshold?: number;
    accentColor?: 'primary' | 'success' | 'warning' | 'danger';
}

const props = withDefaults(defineProps<CardProps>(), {
    currency: 'FCFA',
    showCompact: true,
    compactThreshold: 12345678,
    accentColor: 'primary'
});

const { formatNumber } = useCurrencyFormat();

const shouldShowCompact = computed(() => {
    return props.showCompact && props.number >= props.compactThreshold;
});

const formattedNumber = computed(() => {
    const suffix = props.currency === 'FCFA' ? ' FCFA' : ` ${props.currency}`;
    
    if (shouldShowCompact.value) {
        return formatNumber(props.number, { compact: true }) + suffix;
    }
    
    return formatNumber(props.number) + suffix;
});

const exactAmount = computed(() => {
    const suffix = props.currency === 'FCFA' ? ' XAF' : ` ${props.currency}`;
    return formatNumber(props.number) + suffix;
});

const accentColorClass = computed(() => {
    const colors = {
        primary: 'bg-primary/5',
        success: 'bg-green-500/5',
        warning: 'bg-yellow-500/5',
        danger: 'bg-red-500/5'
    };
    return colors[props.accentColor];
});
</script>

<template>
    <div>
        <div
            class="flex flex-col h-full rounded-xl bg-white hover:translate-y-[-5px] transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden">
            <div class="bg-gray-900 h-2"></div>
            <div class="flex grow items-center justify-between p-6 relative">
                <div class="absolute top-0 right-0 w-24 h-24 rounded-bl-full" :class="accentColorClass"></div>
                <div>
                    <h3 class="text-sm font-medium text-gray-500 mb-1">
                        {{ title }}
                    </h3>
                    <p class="text-2xl font-bold text-gray-800">
                        <span 
                            v-if="shouldShowCompact" 
                            :title="exactAmount" 
                            class="cursor-help"
                        >
                            {{ formattedNumber }}
                        </span>
                        <span v-else>
                            {{ formattedNumber }}
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