<script setup>
import { computed } from 'vue'
import { useCurrencyFormat } from '../../composables/useCurrencyFormat'

const props = defineProps({
  title: { type: String, required: true },
  number: { type: Number, required: true },
  icon: { type: String, required: true },
  currency: { type: String, required: false, default: 'FCFA' },
  showCompact: { type: Boolean, required: false, default: true },
  compactThreshold: { type: Number, required: false, default: 12345678 },
  accentColor: { type: String, required: false, default: 'primary' },
  // Nouvelles props depuis Admin
  difference: { type: Number, required: false, default: undefined },
  isLoading: { type: Boolean, required: false, default: false },
  color: { type: String, required: false, default: 'gray-900' },
  showIcon: { type: Boolean, required: false, default: true },
})

const { formatNumber } = useCurrencyFormat()

const shouldShowCompact = computed(() => {
  return props.showCompact && props.number >= props.compactThreshold
})

const formattedNumber = computed(() => {
  // Loading state
  if (props.isLoading) return '...'

  const suffix = props.currency === 'FCFA' ? ' FCFA' : ` ${props.currency}`
  if (shouldShowCompact.value) {
    return formatNumber(props.number, { compact: true }) + suffix
  }
  return formatNumber(props.number) + suffix
})

const exactAmount = computed(() => {
  if (props.isLoading) return ''
  const suffix = props.currency === 'FCFA' ? ' XAF' : ` ${props.currency}`
  return formatNumber(props.number) + suffix
})

const accentColorClass = computed(() => {
  const colors = {
    primary: 'bg-primary/5',
    success: 'bg-green-500/5',
    warning: 'bg-yellow-500/5',
    danger: 'bg-red-500/5',
  }
  return colors[props.accentColor] || 'bg-primary/5'
})

const borderColorClass = computed(() => {
  // Support pour couleurs Tailwind complètes ou palette prédéfinie
  if (props.color.startsWith('bg-')) {
    return props.color
  }
  return `bg-${props.color}`
})

const differenceColorClass = computed(() => {
  if (props.difference === undefined) return ''
  return props.difference >= 0 ? 'text-green-600' : 'text-red-600'
})

const differenceIcon = computed(() => {
  if (props.difference === undefined) return ''
  return props.difference >= 0 ? 'heroicons:arrow-trending-up' : 'heroicons:arrow-trending-down'
})
</script>

<template>
  <div>
    <div
      class="flex flex-col h-full rounded-xl bg-white hover:translate-y-[-5px] transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden"
    >
      <!-- Border top avec couleur configurable -->
      <div class="h-2" :class="borderColorClass"></div>

      <div class="flex grow items-center justify-between p-6 relative">
        <!-- Coin décoratif -->
        <div
          class="absolute top-0 right-0 w-24 h-24 rounded-bl-full"
          :class="accentColorClass"
        ></div>

        <!-- Contenu principal -->
        <div class="flex-1">
          <h3 class="text-sm font-medium text-gray-500 mb-1">
            {{ title }}
          </h3>
          <p class="text-2xl font-bold text-gray-800">
            <span v-if="shouldShowCompact && !isLoading" :title="exactAmount" class="cursor-help">
              {{ formattedNumber }}
            </span>
            <span v-else>
              {{ formattedNumber }}
            </span>
          </p>

          <!-- Pourcentage de différence -->
          <div v-if="difference !== undefined && !isLoading" class="mt-2 flex items-center gap-1">
            <UIcon :name="differenceIcon" :class="differenceColorClass" class="w-4 h-4" />
            <span :class="differenceColorClass" class="text-sm font-medium">
              {{ difference >= 0 ? '+' : '' }}{{ difference.toFixed(1) }}%
            </span>
            <span class="text-xs text-gray-500 ml-1">vs période précédente</span>
          </div>
        </div>

        <!-- Icon circulaire -->
        <div
          v-if="showIcon"
          class="w-14 h-14 rounded-full flex items-center justify-center"
          :class="borderColorClass"
        >
          <UIcon :name="icon" class="w-7 h-7 text-primary" />
        </div>
      </div>
    </div>
  </div>
</template>
