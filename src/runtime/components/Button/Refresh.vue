<script setup lang="ts">
interface Props {
  loading?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  variant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'link'
  tooltip?: string
  label?: string
  showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  size: 'sm',
  color: 'white',
  variant: 'ghost',
  tooltip: 'Actualiser',
  label: 'Actualiser',
  showLabel: false,
})

const emit = defineEmits<{
  click: []
  refresh: []
}>()

const handleClick = () => {
  emit('click')
  emit('refresh')
}
</script>

<template>
  <UButton
    :icon="loading ? 'i-heroicons-arrow-path' : 'i-heroicons-arrow-path'"
    :class="loading ? 'animate-spin' : 'hover:rotate-180 transition-transform duration-300'"
    :size="size"
    :color="color"
    :variant="variant"
    :title="tooltip"
    :loading="loading"
    :label="showLabel ? label : undefined"
    @click="handleClick"
  />
</template>
