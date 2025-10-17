<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  /** Valeur de recherche */
  modelValue?: string
  /** Placeholder */
  placeholder?: string
  /** Délai de debounce (ms) */
  debounce?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Rechercher...',
  debounce: 300
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': [value: string]
}>()

const localValue = ref(props.modelValue)
let timeout: ReturnType<typeof setTimeout> | null = null

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  localValue.value = value
  
  // Debounce
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    emit('update:modelValue', value)
    emit('search', value)
  }, props.debounce)
}

const clear = () => {
  localValue.value = ''
  emit('update:modelValue', '')
  emit('search', '')
}
</script>

<template>
  <div class="table-search">
    <UIcon name="i-heroicons-magnifying-glass" class="search-icon" />
    
    <input
      v-model="localValue"
      type="text"
      :placeholder="placeholder"
      class="search-input"
      @input="handleInput"
    />
    
    <button
      v-if="localValue"
      class="search-clear"
      @click="clear"
      aria-label="Effacer"
    >
      <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
    </button>
  </div>
</template>

<style scoped>
.table-search {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 20rem;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.625rem 2.5rem 0.625rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #111827;
  background: white;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #77F07F;
  box-shadow: 0 0 0 3px rgba(119, 240, 127, 0.1);
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-clear {
  position: absolute;
  right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 0.25rem;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s;
}

.search-clear:hover {
  background: #f3f4f6;
  color: #374151;
}
</style>

