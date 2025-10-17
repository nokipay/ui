<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  to?: string
  icon?: string
  disabled?: boolean
}

interface Props {
  /** Items du breadcrumb */
  items: BreadcrumbItem[]
  /** Séparateur personnalisé */
  separator?: string
  /** Icône de séparateur */
  separatorIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  separator: '/',
  separatorIcon: 'i-heroicons-chevron-right',
})

const emit = defineEmits<{
  'click': [item: BreadcrumbItem, index: number]
}>()

const handleClick = (item: BreadcrumbItem, index: number) => {
  if (!item.disabled) {
    emit('click', item, index)
  }
}
</script>

<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb-item"
      >
        <!-- Separator -->
        <span
          v-if="index > 0"
          class="breadcrumb-separator"
          aria-hidden="true"
        >
          <UIcon
            v-if="separatorIcon"
            :name="separatorIcon"
            class="w-4 h-4"
          />
          <span v-else>{{ separator }}</span>
        </span>
        
        <!-- Link or text -->
        <component
          :is="item.to && !item.disabled ? 'a' : 'span'"
          :href="item.to"
          :class="[
            'breadcrumb-link',
            {
              'breadcrumb-link-disabled': item.disabled,
              'breadcrumb-link-active': index === items.length - 1,
              'breadcrumb-link-clickable': item.to && !item.disabled,
            }
          ]"
          :aria-current="index === items.length - 1 ? 'page' : undefined"
          @click="handleClick(item, index)"
        >
          <UIcon
            v-if="item.icon"
            :name="item.icon"
            class="w-4 h-4"
          />
          <span>{{ item.label }}</span>
        </component>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-separator {
  display: flex;
  align-items: center;
  color: #9ca3af;
  font-size: 0.875rem;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link-clickable {
  cursor: pointer;
}

.breadcrumb-link-clickable:hover {
  color: #77F07F;
}

.breadcrumb-link-active {
  color: #111827;
  cursor: default;
}

.breadcrumb-link-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

