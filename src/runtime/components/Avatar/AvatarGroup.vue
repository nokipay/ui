<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** Nombre maximum d'avatars à afficher */
  max?: number
  /** Taille des avatars */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Espacement (overlap) */
  spacing?: 'tight' | 'normal' | 'loose'
}

const props = withDefaults(defineProps<Props>(), {
  max: 5,
  size: 'md',
  spacing: 'normal'
})

const spacingClasses = computed(() => {
  const spacings = {
    tight: '-space-x-2',
    normal: '-space-x-3',
    loose: '-space-x-1'
  }
  return spacings[props.spacing]
})
</script>

<template>
  <div :class="['avatar-group', spacingClasses]">
    <slot :max="max" :size="size" />
    
    <!-- More indicator si slots dépasse max -->
    <div v-if="$slots.more" class="avatar-more">
      <slot name="more" />
    </div>
  </div>
</template>

<style scoped>
.avatar-group {
  display: flex;
  align-items: center;
}

.avatar-group > :deep(*) {
  border: 2px solid white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.avatar-more {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
}
</style>

