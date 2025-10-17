<script setup lang="ts">
import { ref, provide } from 'vue'

interface Tab {
  label: string
  value: string | number
  icon?: string
  disabled?: boolean
  badge?: string | number
}

interface Props {
  /** Tabs à afficher */
  tabs?: Tab[]
  /** Valeur active */
  modelValue?: string | number
  /** Variante */
  variant?: 'default' | 'pills' | 'underline'
  /** Taille */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  tabs: () => [],
  variant: 'default',
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()

const activeTab = ref(props.modelValue || props.tabs[0]?.value)

const selectTab = (tab: Tab) => {
  if (!tab.disabled) {
    activeTab.value = tab.value
    emit('update:modelValue', tab.value)
    emit('change', tab.value)
  }
}

// Provide pour TabPanel
provide('activeTab', activeTab)
</script>

<template>
  <div class="tabs-container">
    <div 
      :class="['tabs-list', `tabs-${variant}`, `tabs-${size}`]"
      role="tablist"
    >
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="[
          'tab',
          {
            'tab-active': activeTab === tab.value,
            'tab-disabled': tab.disabled
          }
        ]"
        :disabled="tab.disabled"
        role="tab"
        :aria-selected="activeTab === tab.value"
        @click="selectTab(tab)"
      >
        <UIcon v-if="tab.icon" :name="tab.icon" class="tab-icon" />
        <span>{{ tab.label }}</span>
        <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>
    
    <div class="tabs-content">
      <slot :active-tab="activeTab" />
    </div>
  </div>
</template>

<style scoped>
.tabs-container {
  width: 100%;
}

.tabs-list {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.tab:hover:not(.tab-disabled) {
  color: #111827;
}

.tab-active {
  color: #77F07F;
  border-bottom-color: #77F07F;
}

.tab-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tab-icon {
  width: 1rem;
  height: 1rem;
}

.tab-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: #e5e7eb;
  color: #374151;
  border-radius: 9999px;
}

.tab-active .tab-badge {
  background: #77F07F;
  color: white;
}

/* Variants */
.tabs-pills .tab {
  border: none;
  border-radius: 0.5rem;
  margin-bottom: 0;
}

.tabs-pills .tab-active {
  background: #77F07F;
  color: white;
  border-bottom-color: transparent;
}

.tabs-underline {
  border-bottom: 1px solid #e5e7eb;
}

/* Sizes */
.tabs-sm .tab {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.tabs-lg .tab {
  padding: 1rem 1.5rem;
  font-size: 1rem;
}

.tabs-content {
  padding-top: 1.5rem;
}
</style>

